using Microsoft.EntityFrameworkCore;
using TemplateService.Models;
using MongoDB.Driver;

namespace TemplateService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Template> template => _db.GetCollection<Template>("template");

        public IMongoCollection<Todo> todo => _db.GetCollection<Todo>("todo");
    }
}