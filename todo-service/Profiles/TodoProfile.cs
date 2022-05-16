using AutoMapper;
using TodoService.Dtos;
using TodoService.Models;

namespace TodoService.Profiles
{
    public class TodoProfile : Profile
    {
        public TodoProfile()
        {
            CreateMap<Todo, ReadTodoDto>();
            CreateMap<CreateTodoDto, Todo>();
            CreateMap<UpdateTodoDto, Todo>();
        }
    }
}