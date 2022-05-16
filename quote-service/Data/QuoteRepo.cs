using QuoteService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace QuoteService.Data 
{
    public class QuoteRepo : IQuoteRepo 
    {
        private readonly AppDbContext _context;
        public QuoteRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Quote>> GetAllQuotes() 
        {
            return await _context.quote.Find(_ => true).ToListAsync();
        }

        public Task<Quote> GetQuoteById(string id) 
        {
            return _context.quote.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Quote>> GetQuotesAccepted() 
        {
            return await _context.quote.Find(c => c.Status == "Accepté").ToListAsync();
        }

        public async Task CreateQuote(Quote Quote)
        {
            if(Quote != null)
            {
                await _context.quote.InsertOneAsync(Quote); 
            }
        }

        public async Task<Quote> UpdateQuoteById(string id, Quote Quote)
        {
            return await _context.quote.FindOneAndReplaceAsync(c => c.Id == id,
                new Quote { Id = id, Name = Quote.Name, Clientid = Quote.Clientid, client = Quote.client, Templateid = Quote.Templateid, Templatename = Quote.Templatename, Templatetodoid = Quote.Templatetodoid, Todosidoutoftemplate = Quote.Todosidoutoftemplate, todos = Quote.todos, Status = Quote.Status, Logo = Quote.Logo });
        }

        public async Task DeleteQuoteById(string id)
        {
            await _context.quote.DeleteOneAsync(c => c.Id == id);
        }
    }
}