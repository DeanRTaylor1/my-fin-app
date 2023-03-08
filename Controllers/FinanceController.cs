using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using my_fin_app.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace my_fin_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceController : ControllerBase
    {
        private readonly IFinanceService _context;

        public FinanceController(IFinanceService context)
        {
            _context = context;
        }

        // GET: api/<FinanceUserController>
        [HttpGet("outgoings/{email}/{page}")]
        public List<FixedOutgoingsMonthly> GetAllOutgoings([FromRoute] String email, int page)
        {
            Console.WriteLine(email, page);
            var outgoings = _context.FindAllOutgoings(email, page);
            return outgoings;
        }

        // GET api/<FinanceUserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FinanceController>
        [HttpPost]
        [Authorize(Policy = "user")]
        public ActionResult<UserDto> Post([FromBody] UserLoginModel data)
        {
            var user = _context.Find(data.email);
            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }

        [HttpPost("update")]
        [Authorize(Policy = "user")]
        public ActionResult<UserDto> Post([FromBody] UpdateUserModel data)
        {
            var user = _context.Update(data);
            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }
    }
}

public interface IFinanceService
{
    UserDto Find(String email);
    UserDto Update(UpdateUserModel user);
    UserDto UserToDTO(User user);
    List<FixedOutgoingsMonthly> FindAllOutgoings(String email, int page);
}

public class FinanceService : IFinanceService
{
    private readonly DeanrtaylorfinanceContext _context;

    public FinanceService(DeanrtaylorfinanceContext context)
    {
        _context = context;
    }

    public UserDto Find(String email)
    {
        var userData = _context.Users.Where(u => u.Email == email).FirstOrDefault();
        if (userData == null)
        {
            return null;
        }

        return UserToDTO(userData);
    }

    public UserDto Update(UpdateUserModel user)
    {
        Console.WriteLine(user);
        var userData = _context.Users.Where(u => u.Email == user.email).FirstOrDefault();
        if (userData == null)
        {
            return null;
        }
        userData.MonthlySalary = (int)user.monthlySalary!;
        userData.Currency = user.currency;
        userData.Phone = user.phone;
        userData.SavingsTarget = user.savingsTarget;
        userData.SavingsRate = user.savingsRate;
        userData.CurrentSavings = user.currentSavings;
        _context.SaveChanges();
        return UserToDTO(userData);
    }

    public UserDto UserToDTO(User user)
    {
        return new UserDto
        {
            Email = user.Email,
            MonthlySalary = user.MonthlySalary,
            Username = user.Username,
            Currency = user.Currency,
            Phone = user.Phone,
            SavingsTarget = user.SavingsTarget,
            SavingsRate = user.SavingsRate,
            CurrentSavings = user.CurrentSavings
        };
    }

    public List<FixedOutgoingsMonthly> FindAllOutgoings(String email, int page)
    {
        var userId = _context.Users.Where(u => u.Email == email).First().Id;
        int skip = (page - 1) * 10;
        var outgoings = _context.FixedOutgoingsMonthlies
            .Where(u => u.UserId == userId)
            .OrderByDescending(u => u.CreatedAt)
            .Skip(skip)
            .Take(10)
            .ToList();

        return outgoings;
    }
}
