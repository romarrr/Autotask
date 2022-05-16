using ProjectService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace ProjectService.Data 
{
    public class ProjectRepo : IProjectRepo 
    {
        private readonly AppDbContext _context;
        public ProjectRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllProjects() 
        {
            return await _context.project.Find(_ => true).ToListAsync();
        }

        public Task<Project> GetProjectById(string id) 
        {
            return _context.project.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Project>> GetProjectByClientId(string id) 
        {
            return await _context.project.Find(c => c.Clientid == id).ToListAsync();
        }

        public async Task CreateProject(Project Project)
        {
            if(Project != null)
            {
                await _context.project.InsertOneAsync(Project); 
            }
        }

        public async Task<Project> UpdateProjectById(string id, Project project)
        {
            return await _context.project.FindOneAndReplaceAsync(c => c.Id == id,
                new Project { Id = id, Name = project.Name, Startdate = project.Startdate, Enddate = project.Enddate, Type = project.Type, Clientid = project.Clientid, client = project.client, Logo = project.Logo });
        }

        public async Task DeleteProjectById(string id)
        {
            await _context.project.DeleteOneAsync(c => c.Id == id);
        }

        // Client
        // public Task<Client> GetClientById(string id) 
        // {
        //     return _context.client.Find(c => c.Id == id).SingleOrDefaultAsync();
        // }
    }
}