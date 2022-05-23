using Microsoft.EntityFrameworkCore;
using ArchiveService.Models;
using MongoDB.Driver;

namespace ArchiveService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Archive> archive => _db.GetCollection<Archive>("archive");
    }
}