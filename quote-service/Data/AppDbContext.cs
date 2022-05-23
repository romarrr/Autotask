using Microsoft.EntityFrameworkCore;
using QuoteService.Models;
using MongoDB.Driver;

namespace QuoteService.Data 
{
    public class AppDbContext : DbContext 
    {
        private readonly IMongoDatabase _db;
        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<Quote> quote => _db.GetCollection<Quote>("quote");

        public IMongoCollection<Template> template => _db.GetCollection<Template>("template");

        public IMongoCollection<Todo> todo => _db.GetCollection<Todo>("todo");

        public IMongoCollection<Planning> planning => _db.GetCollection<Planning>("planning");
        
    }
}