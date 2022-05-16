using Microsoft.EntityFrameworkCore;
using SpecializationService.Models;
using MongoDB.Driver;

namespace SpecializationService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Specialization> specialization => _db.GetCollection<Specialization>("specialization");
    }
}