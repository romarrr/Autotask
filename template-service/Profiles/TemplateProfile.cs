using AutoMapper;
using TemplateService.Dtos;
using TemplateService.Models;

namespace TemplateService.Profiles
{
    public class TemplateProfile : Profile
    {
        public TemplateProfile()
        {
            CreateMap<Template, ReadTemplateDto>();
            CreateMap<CreateTemplateDto, Template>();
            CreateMap<UpdateTemplateDto, Template>();

            // Todo 
            CreateMap<CreateTodoDto, Todo>();
        }
    }
}