using AutoMapper;
using ProjectService.Dtos;
using ProjectService.Models;

namespace ProjectService.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<Project, ReadProjectDto>();
            CreateMap<CreateProjectDto, Project>();
            CreateMap<UpdateProjectDto, Project>();

            CreateMap<Client, ReadClientDto>();
            CreateMap<CreateClientDto, Client>();
            CreateMap<ReadClientDto, Client>();
        }
    }
}