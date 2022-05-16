using System.Collections.Generic;
using SpecializationService.Models;

namespace SpecializationService.Data 
{
    public interface ISpecializationRepo 
    {
        Task<IEnumerable<Specialization>> GetAllSpecializations();
        Task<Specialization> GetSpecializationById(string id);
        Task CreateSpecialization(Specialization specialization);
        Task<Specialization> UpdateSpecializationById(string id, Specialization specialization);
        Task DeleteSpecializationById(string id);
    }
}