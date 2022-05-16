using AutoMapper;
using PlanningService.Dtos;
using PlanningService.Models;

namespace PlanningService.Profiles
{
    public class PlanningProfile : Profile
    {
        public PlanningProfile()
        {
            // Planning
            CreateMap<Planning, ReadPlanningDto>();
            CreateMap<CreatePlanningDto, Planning>();
            CreateMap<UpdatePlanningDto, Planning>();

            // Todo
            CreateMap<CreateTodoDto, Todo>();
        }
    }
}