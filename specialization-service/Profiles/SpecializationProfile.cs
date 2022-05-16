using AutoMapper;
using SpecializationService.Dtos;
using SpecializationService.Models;

namespace SpecializationService.Profiles
{
    public class SpecializationProfile : Profile
    {
        public SpecializationProfile()
        {
            CreateMap<Specialization, ReadSpecializationDto>();
            CreateMap<CreateSpecializationDto, Specialization>();
            CreateMap<UpdateSpecializationDto, Specialization>();

            // Partie RabbitMQ
            CreateMap<Specialization, SpecializationUpdatedDto>();
            CreateMap<Specialization, SpecializationUpdateAsyncDto>();
        }
    }
}