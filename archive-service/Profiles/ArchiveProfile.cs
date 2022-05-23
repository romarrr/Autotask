using AutoMapper;
using ArchiveService.Dtos;
using ArchiveService.Models;

namespace ArchiveService.Profiles
{
    public class ArchiveProfile : Profile
    {
        public ArchiveProfile()
        {
            CreateMap<Archive, ReadArchiveDto>();
            CreateMap<CreateArchiveDto, Archive>();
            CreateMap<UpdateArchiveDto, Archive>();
        }
    }
}