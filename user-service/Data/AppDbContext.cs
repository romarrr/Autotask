using Microsoft.EntityFrameworkCore;
using UserService.Models;
using MongoDB.Driver;

namespace UserService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<User> user => _db.GetCollection<User>("user");
    }
}