using Microsoft.AspNetCore.Mvc;
using my_fin_app.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace my_fin_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceUserController : ControllerBase
    {
        private readonly DeanrtaylorfinanceContext _context;

        public FinanceUserController(DeanrtaylorfinanceContext context)
        {
            _context = context;
        }

        // GET: api/<FinanceUserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var users = _context.Users.ToList();
            foreach (User user in users)
            {
                Console.WriteLine(user.Email);

            }
            return new string[] { "value1", "value2" };
        }

        // GET api/<FinanceUserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FinanceUserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FinanceUserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FinanceUserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
