using AutoMapper;
using SkillService.Dtos;
using SkillService.Models;

namespace SkillService.Profiles
{
    public class SkillProfile : Profile
    {
        public SkillProfile()
        {
            CreateMap<Skill, ReadSkillDto>();
            CreateMap<CreateSkillDto, Skill>();
            CreateMap<UpdateSkillDto, Skill>();
        }
    }
}