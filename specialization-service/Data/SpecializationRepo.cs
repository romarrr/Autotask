using SpecializationService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace SpecializationService.Data 
{
    public class SpecializationRepo : ISpecializationRepo 
    {
        private readonly AppDbContext _context;
        public SpecializationRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Specialization>> GetAllSpecializations() 
        {
            return await _context.specialization.Find(_ => true).ToListAsync();
        }

        public Task<Specialization> GetSpecializationById(string id) 
        {
            return _context.specialization.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task CreateSpecialization(Specialization specialization)
        {
            if(specialization != null)
            {
                await _context.specialization.InsertOneAsync(specialization); 
            }
        }

        public async Task<Specialization> UpdateSpecializationById(string id, Specialization specialization)
        {
            return await _context.specialization.FindOneAndReplaceAsync(c => c.Id == id,
                new Specialization { Id = id, Name = specialization.Name, Description = specialization.Description, Logo = specialization.Logo });
        }

        public async Task DeleteSpecializationById(string id)
        {
            await _context.specialization.DeleteOneAsync(c => c.Id == id);
        }
    }
}