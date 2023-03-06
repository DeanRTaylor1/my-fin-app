using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using my_fin_app.Interfaces;

namespace my_fin_app.Models
{
    public class UserModel : IUser
    {
        public UserModel(string username, string password, string email)
        {
            this.username = username;
            this.password = password;
            this.email = email;
            this.confirmed = false;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }
        public string username { get; set; }

        public string password { get; set; }

        public string email { get; set; }
        public bool confirmed { get; set; }

        [BsonIgnoreIfDefault]
        public int __v { get; set; }
    }
}
