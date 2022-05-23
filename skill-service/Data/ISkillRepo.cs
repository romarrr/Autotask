using System.Collections.Generic;
using SkillService.Models;

namespace SkillService.Data 
{
    public interface ISkillRepo 
    {
        Task<IEnumerable<Skill>> GetAllSkills();
        Task<Skill> GetSkillById(string id);
        Task<Skill> GetSkillBySpecializationAndByExperience(string specializationname, string experiencename);
        Task CreateSkill(Skill skill);
        Task<Skill> UpdateSkillById(string id, Skill skill);
        Task<Skill> UpdateSkillBySpecializationAndByExperience(string specializationname, string experiencename, Skill skill);
        Task DeleteSkillById(string id);
        Task DeleteSkillBySpecializationAndByExperience(string specializationname, string experiencename);
    }
}