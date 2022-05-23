using PlanningService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace PlanningService.Data 
{
    public class PlanningRepo : IPlanningRepo 
    {
        private readonly AppDbContext _context;
        public PlanningRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Planning>> GetAllPlannings() 
        {
            return await _context.planning.Find(_ => true).ToListAsync();
        }

        public Task<Planning> GetPlanningById(string id) 
        {
            return _context.planning.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task CreatePlanning(Planning planning)
        {
            if(planning != null)
            {
                await _context.planning.InsertOneAsync(planning); 
            }
        }

        public async Task<Planning> UpdatePlanningById(string id, Planning planning)
        {
            return await _context.planning.FindOneAndReplaceAsync(c => c.Id == id,
                new Planning { Id = id, Name = planning.Name, Role = planning.Role, todos = planning.todos, users = planning.users });
        }

        public async Task DeletePlanningById(string id)
        {
            await _context.planning.DeleteOneAsync(c => c.Id == id);
        }

        // Todo 
        public async Task<Todo> GetTodoById(string planningid, string userid, string todoid) 
        {
            var planning = await _context.planning.Find(c => c.Id == planningid).SingleOrDefaultAsync();
            var getTodo = new Todo();
            foreach(var todo in planning.todos)
            {
                if(todo.Id == todoid && todo.Userid == userid)
                {
                    getTodo = todo;
                }
            }
            return getTodo;
        }

        public async Task<IEnumerable<Todo>> GetTodosByPlanningIdAndByUserId(string planningid, string id) 
        {
            var planning = await _context.planning.Find(c => c.Id == planningid).SingleOrDefaultAsync();
            return planning.todos.Where(todo => todo.Userid == id);
        }

        public async Task<IEnumerable<Todo>> GetStartedTodos(string planningid, string id) 
        {
            var planning = await _context.planning.Find(c => c.Id == planningid).SingleOrDefaultAsync();
            return planning.todos.Where(todo => todo.Status == "En cours");
        }

        // User
        public async Task<IEnumerable<User>> GetAllUsersByRole(string role)
        {
            return await _context.user.Find(user => user.Role == role).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUsersBySkillId(string id)
        {
            var usersSkilled = new List<User>();
            var users = await _context.user.Find(_ => true).ToListAsync();
            foreach(var user in users)
            {
                for(var i=0; i<user.Skillsid.Length; i++)
                {
                    if(user.Skillsid[i] == id)
                    {
                        usersSkilled.Add(user);
                    }
                }
            }
            return usersSkilled;
        }
    }
}