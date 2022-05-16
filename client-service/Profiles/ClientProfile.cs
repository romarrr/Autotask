using AutoMapper;
using ClientService.Dtos;
using ClientService.Models;

namespace ClientService.Profiles
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<Client, ReadClientDto>();
            CreateMap<CreateClientDto, Client>();
            CreateMap<UpdateClientDto, Client>();
        }
    }
}