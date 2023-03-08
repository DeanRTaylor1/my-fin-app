using my_fin_app.Interfaces;

namespace my_fin_app.Models
{
    public class UserLoginModel : IUser
    {
        public string email { get; set; }
        public string? password { get; set; }
    }
}
