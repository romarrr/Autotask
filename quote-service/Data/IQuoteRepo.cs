using System.Collections.Generic;
using QuoteService.Models;

namespace QuoteService.Data 
{
    public interface IQuoteRepo 
    {
        Task<IEnumerable<Quote>> GetAllQuotes();
        Task<Quote> GetQuoteById(string id);
        Task<IEnumerable<Quote>> GetQuotesAccepted();
        Task<Quote> GetQuoteAcceptedById(string id);
        Task<IEnumerable<Quote>> GetQuotesInProgress();
        Task<Quote> GetQuoteInProgressById(string id);
        Task<IEnumerable<Quote>> GetQuotesFinished();
        Task<Quote> GetQuoteFinishedById(string id);
        Task CreateQuote(Quote quote);
        Task<Quote> UpdateQuoteById(string id, Quote quote);
        Task DeleteQuoteById(string id);
    }
}