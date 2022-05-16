using System.Collections.Generic;
using QuoteService.Models;

namespace QuoteService.Data 
{
    public interface IQuoteRepo 
    {
        Task<IEnumerable<Quote>> GetAllQuotes();
        Task<Quote> GetQuoteById(string id);
        Task<IEnumerable<Quote>> GetQuotesAccepted();
        Task CreateQuote(Quote quote);
        Task<Quote> UpdateQuoteById(string id, Quote quote);
        Task DeleteQuoteById(string id);
    }
}