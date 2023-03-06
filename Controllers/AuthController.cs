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
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginModel user)
        {
            var exisitingUser = MongoUserModel.findUser(user.email);
            if (exisitingUser == null)
            {
                return BadRequest();
            }
            if (!Password.Compare(exisitingUser[0].password, user.password))
            {
                return BadRequest();
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
            var existingUser = MongoUserModel.findUser(user.email);
            if (existingUser.Count() > 0)
            {
                Console.WriteLine(existingUser.Count());
                return BadRequest();
            }
            var HashedPassword = Password.ToHash(user.password);
            var NewUser = new UserModel(user.username, HashedPassword, user.email);

            MongoUserModel.Add(NewUser);

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
