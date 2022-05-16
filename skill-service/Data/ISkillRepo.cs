using System.Collections.Generic;
using SkillService.Models;

namespace SkillService.Data 
{
    public interface ISkillRepo 
    {
        Task<IEnumerable<Skill>> GetAllSkills();
        Task<Skill> GetSkillById(string id);
        Task CreateSkill(Skill skill);
        Task<Skill> UpdateSkillById(string id, Skill skill);
        Task DeleteSkillById(string id);
    }
}