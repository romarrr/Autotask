using TodoService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace TodoService.Data 
{
    public class TodoRepo : ITodoRepo 
    {
        private readonly AppDbContext _context;
        public TodoRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> GetAllTodos() 
        {
            return await _context.todo.Find(_ => true).ToListAsync();
        }

        public Task<Todo> GetTodoById(string id) 
        {
            return _context.todo.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task CreateTodo(Todo todo)
        {
            if(todo != null)
            {
                await _context.todo.InsertOneAsync(todo); 
            }
        }

        public async Task<Todo> UpdateTodoById(string id, Todo todo)
        {
            return await _context.todo.FindOneAndReplaceAsync(c => c.Id == id,
                new Todo { Id = id, Name = todo.Name, Type = todo.Type, Description = todo.Description, Time = todo.Time, Status = todo.Status, Skillid = todo.Skillid, skill = todo.skill, Logo = todo.Logo });
        }

        public async Task DeleteTodoById(string id)
        {
            await _context.todo.DeleteOneAsync(c => c.Id == id);
        }
    }
}