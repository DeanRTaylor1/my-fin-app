using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using my_fin_app.Models;
using System.Linq;
using System.Threading.Tasks;
using my_fin_app.Interfaces;

namespace my_fin_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IFinanceUserService _financeUserService;
        private readonly MongoUserModelValidator _validator;

        //Add the Service which serves as a proxy to the postgres database,
        //This is registered in Program.cs under Addtransient
        public AuthController(
            IFinanceUserService financeUserService,
            MongoUserModelValidator validator
        )
        {
            _validator = validator;
            _financeUserService = financeUserService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel user)
        {
            var exisitingUser = MongoUserModel.findUser(user.email);
            if (exisitingUser == null)
            {
                return BadRequest();
            }
            if (!Password.Compare(exisitingUser[0].password, user.password))
            {
                return BadRequest("Invalid credentials");
            }

            setUserCookie(exisitingUser[0]);
            return Ok(UserToDTO(exisitingUser[0]));
        }

        [Authorize(Policy = "user")]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpGet("current-user")]
        public UserModelDTO CheckUser()
        {
            string username = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value ?? "empty";
            string email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value ?? "empty";
            Console.WriteLine(username, email);
            return new UserModelDTO { UserName = username, Email = email };
        }

        //If you define class params as Required e.g the username field in UserModel, if it's not received in the body
        //of the request then Dotnet will automatically send a BadRequest with the missing value
        [HttpPost("signup")]
        public async Task<ActionResult<UserModelDTO>> Signup(UserModel user)
        {
            var validationResult = await _validator.ValidateAsync(user);
            Console.WriteLine($"validation:  {validationResult}");
            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors
                    .Select(e => new { message = e.ErrorMessage })
                    .ToArray();
                Console.WriteLine(errors);
                return BadRequest(errors);
            }
            var existingUser = MongoUserModel.findUser(user.email);
            if (existingUser.Count() > 0)
            {
                Console.WriteLine(existingUser.Count());
                return BadRequest("User already exists");
            }

            //Hash password before saving to db
            var HashedPassword = Password.ToHash(user.password);
            var NewUser = new UserModel(user.username, HashedPassword, user.email);
            MongoUserModel.Add(NewUser);
            User financeUser = new User { Username = NewUser.username, Email = NewUser.email };
            _financeUserService.Add(financeUser);
            //Assign login cookie on successful signup
            setUserCookie(NewUser);

            return CreatedAtAction(
                nameof(Signup),
                new { Id = NewUser.username },
                UserToDTO(NewUser)
            );
        }

        private static UserModelDTO UserToDTO(UserModel user)
        {
            return new UserModelDTO { UserName = user.username, Email = user.email };
        }

        private async void setUserCookie(UserModel user)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, user.email));
            claims.Add(new Claim(ClaimTypes.Name, user.username));
            var identity = new ClaimsIdentity(claims, "cookie");
            var userSession = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync("cookie", userSession);
            return;
        }
    }
}

public interface IFinanceUserService
{
    void Add(User user);
}

public class FinanceUserService : IFinanceUserService
{
    private readonly DeanrtaylorfinanceContext _context;

    public FinanceUserService(DeanrtaylorfinanceContext context)
    {
        _context = context;
    }

    public void Add(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }
}
