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
        Task<Todo> GetTodoById(string planningid, string userid, string id);
        Task<IEnumerable<Todo>> GetTodosByPlanningIdAndByUserId(string planningid, string id);
        Task<IEnumerable<Todo>> GetStartedTodos(string planningid, string id);

        // User 
        Task<IEnumerable<User>> GetAllUsersByRole(string role);
        Task<IEnumerable<User>> GetUsersBySkillId(string id);
    }
}