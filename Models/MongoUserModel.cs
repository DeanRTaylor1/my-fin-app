using MongoDB.Bson;
using MongoDB.Driver;

namespace my_fin_app.Models
{
    public class MongoUserModel
    {
        private static readonly object _lock = new object();
        private static MongoUserModel _instance = null;
        public static MongoUserModel Instance
        {
            get
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new MongoUserModel();
                    }
                    return _instance;
                }
            }
        }

        private static readonly MongoClient _client;
        private static readonly IMongoDatabase _database;
        private static readonly IMongoCollection<UserModel> _users;
        private static readonly IConfiguration _configuration;
        private static readonly String MONGO_URL;




        static MongoUserModel()
        {
            _configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddUserSecrets<MongoUserModel>()
            .Build();
            MONGO_URL = _configuration["MONGO_URL"];
            var settings = MongoClientSettings.FromConnectionString(
                MONGO_URL
            );
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
