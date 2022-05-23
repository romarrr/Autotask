using Microsoft.EntityFrameworkCore;
using PlanningService.Models;
using MongoDB.Driver;

namespace PlanningService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Planning> planning => _db.GetCollection<Planning>("planning");

        public IMongoCollection<User> user => _db.GetCollection<User>("user");

        public IMongoCollection<Quote> quote => _db.GetCollection<Quote>("quote");
    }
}