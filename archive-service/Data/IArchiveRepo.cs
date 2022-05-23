using ArchiveService.Models;

namespace ArchiveService.Data 
{
    public interface IArchiveRepo 
    {
        Task<IEnumerable<Archive>> GetAllArchives();
        Task<Archive> GetArchiveById(string id);
        Task CreateArchive(Archive archive);
        Task<Archive> UpdateArchiveById(string id, Archive archive);
        Task DeleteArchiveById(string id);

        // Todo
        Task<IEnumerable<Todo>> GetAllTodos(string planningId);
        Task<Todo> GetTodoById(string planningId, string todoId);
        Task CreateTodo(Todo todo);
    }
}