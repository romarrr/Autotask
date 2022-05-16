using Microsoft.EntityFrameworkCore;
using TodoService.Models;
using MongoDB.Driver;

namespace TodoService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Todo> todo => _db.GetCollection<Todo>("todo");
    }
}