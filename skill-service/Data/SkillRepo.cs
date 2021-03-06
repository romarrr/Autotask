using SkillService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace SkillService.Data 
{
    public class SkillRepo : ISkillRepo 
    {
        private readonly AppDbContext _context;
        public SkillRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Skill>> GetAllSkills() 
        {
            return await _context.skill.Find(_ => true).ToListAsync();
        }

        public Task<Skill> GetSkillById(string id) 
        {
            return _context.skill.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public Task<Skill> GetSkillBySpecializationAndByExperience(string specializationname, string experiencename) 
        {
            return _context.skill.Find(c => c.Specializationname == specializationname && c.Experiencename == experiencename).SingleOrDefaultAsync();
        }

        public async Task CreateSkill(Skill skill)
        {
            if(skill != null)
            {
                await _context.skill.InsertOneAsync(skill); 
            }
        }

        public async Task<Skill> UpdateSkillById(string id, Skill skill)
        {
            return await _context.skill.FindOneAndReplaceAsync(c => c.Id == id,
                new Skill { Id = id, Specializationname = skill.Specializationname, Experiencename = skill.Experiencename });
        }

        public async Task<Skill> UpdateSkillBySpecializationAndByExperience(string specializationname, string experiencename, Skill skill)
        {
            return await _context.skill.FindOneAndReplaceAsync(c => c.Specializationname == specializationname && c.Experiencename == experiencename,
                new Skill { Id = skill.Id, Specializationname = skill.Specializationname, Experiencename = skill.Experiencename });
        }

        public async Task DeleteSkillById(string id)
        {
            await _context.skill.DeleteOneAsync(c => c.Id == id);
        }

        public async Task DeleteSkillBySpecializationAndByExperience(string specializationname, string experiencename)
        {
            await _context.skill.DeleteOneAsync(c => c.Specializationname == specializationname && c.Experiencename == experiencename);
        }

    }
}