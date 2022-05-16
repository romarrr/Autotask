using ProjectService.Models;

namespace ProjectService.Data 
{
    public interface IProjectRepo 
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetProjectById(string id);

        Task<IEnumerable<Project>> GetProjectByClientId(string id);
        Task CreateProject(Project project);
        Task<Project> UpdateProjectById(string id, Project project);
        Task DeleteProjectById(string id);

        // Client
        // Task<Client> GetClientById(string id);
    }
}