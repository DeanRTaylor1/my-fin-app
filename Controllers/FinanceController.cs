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
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<FinanceUserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FinanceController>

        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UserLoginModel data)
        {
            var user = _context.Find(data.email);
            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }

        // PUT api/<FinanceUserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value) { }

        // DELETE api/<FinanceUserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id) { }
    }
}

public interface IFinanceService
{
    UserDto Find(String email);
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
        UserDto user = new UserDto
        {
            Email = userData!.Email,
            MonthlySalary = userData.MonthlySalary,
            Username = userData.Username,
            Currency = userData.Currency,
            Phone = userData.Phone,
            SavingsTarget = userData.SavingsTarget,
            SavingsRate = userData.SavingsRate,
            CurrentSavings = userData.CurrentSavings
        };
        return user;
    }
}
