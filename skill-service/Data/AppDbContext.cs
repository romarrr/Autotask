using Microsoft.EntityFrameworkCore;
using SkillService.Models;
using MongoDB.Driver;

namespace SkillService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Skill> skill => _db.GetCollection<Skill>("skill");
    }
}