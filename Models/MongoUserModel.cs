using MongoDB.Bson;
using MongoDB.Driver;

namespace my_fin_app.Models
{
    public class MongoUserModel
    {
        private static readonly MongoUserModel _instance = new MongoUserModel();

        private static readonly MongoClient _client;
        private static readonly IMongoDatabase _database;
        private static readonly IMongoCollection<UserModel> _users;

        static MongoUserModel()
        {
            var settings = MongoClientSettings.FromConnectionString();
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            _client = new MongoClient(settings);
            _database = _client.GetDatabase("financeapp");
        }

        public static List<UserModel> findAll()
        {
            var collection = _database.GetCollection<UserModel>("users");

            return collection.FindSync(new BsonDocument()).ToList();
        }

        public static List<UserModel> findUser(String email)
        {
            var collection = _database.GetCollection<UserModel>("users");

            return collection.FindSync((x => x.email == email)).ToList();
        }

        public static UserModel Add(UserModel user)
        {
            var collection = _database.GetCollection<UserModel>("users");

            collection.InsertOne(user);

            return user;
        }
    }
}
