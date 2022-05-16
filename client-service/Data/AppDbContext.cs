using Microsoft.EntityFrameworkCore;
using ClientService.Models;
using MongoDB.Driver;

namespace ClientService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Client> client => _db.GetCollection<Client>("client");
    }
}