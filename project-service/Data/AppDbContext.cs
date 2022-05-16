using Microsoft.EntityFrameworkCore;
using ProjectService.Models;
using MongoDB.Driver;

namespace ProjectService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Project> project => _db.GetCollection<Project>("project");
    }
}