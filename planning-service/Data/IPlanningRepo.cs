using System.Collections.Generic;
using PlanningService.Models;

namespace PlanningService.Data 
{
    public interface IPlanningRepo 
    {
        Task<IEnumerable<Planning>> GetAllPlannings();
        Task<Planning> GetPlanningById(string id);
        Task CreatePlanning(Planning planning);
        Task<Planning> UpdatePlanningById(string id, Planning planning);
        Task DeletePlanningById(string id);

        // Todo
        Task<IEnumerable<Todo>> GetTodosByPlanningNameAndByUserId(string name, string id);

        // User 
        Task<IEnumerable<User>> GetAllUsersByRole(string role);
        Task<IEnumerable<User>> GetUsersBySkillId(string id);
    }
}