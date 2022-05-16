using AutoMapper;
using QuoteService.Dtos;
using QuoteService.Models;

namespace QuoteService.Profiles
{
    public class QuoteProfile : Profile
    {
        public QuoteProfile()
        {
            CreateMap<Quote, ReadQuoteDto>();
            CreateMap<CreateQuoteDto, Quote>();
            CreateMap<UpdateQuoteDto, Quote>();

            // Clients
            CreateMap<Client, ReadClientDto>();

            // Todo 
            CreateMap<CreateTodoDto, Todo>();
        }
    }
}