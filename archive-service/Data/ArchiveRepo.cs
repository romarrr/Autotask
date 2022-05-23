using ArchiveService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace ArchiveService.Data 
{
    public class ArchiveRepo : IArchiveRepo 
    {
        private readonly AppDbContext _context;
        public ArchiveRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Archive>> GetAllArchives() 
        {
            return await _context.archive.Find(_ => true).ToListAsync();
        }

        public Task<Archive> GetArchiveById(string id) 
        {
            return _context.archive.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task CreateArchive(Archive archive)
        {
            if(archive != null)
            {
                await _context.archive.InsertOneAsync(archive); 
            }
        }

        public async Task<Archive> UpdateArchiveById(string id, Archive archive)
        {
            return await _context.archive.FindOneAndReplaceAsync(c => c.Id == id,
                new Archive { Id = id, todos = archive.todos });
        }

        public async Task DeleteArchiveById(string id)
        {
            await _context.archive.DeleteOneAsync(c => c.Id == id);
        }

        // Planning
         public async Task<IEnumerable<Todo>> GetAllTodos(string planningId) 
        {
            var planning = await _context.archive.Find(c => c.Id == planningId).SingleOrDefaultAsync();
            return planning.todos;
        }

        public async Task<Todo> GetTodoById(string planningId, string todoId) 
        {
            var planning = await_context.archive.Find(c => c.Id == planningId).SingleOrDefaultAsync();
            var getTodo = new Todo();
            foreach(var todo in planning.todos)
            {
                if(todo.Id == todoId)
                {
                    getTodo = todo;
                }
            }
            return getTodo;
        }

    }
}