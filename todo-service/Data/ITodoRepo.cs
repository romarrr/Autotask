using System.Collections.Generic;
using TodoService.Models;

namespace TodoService.Data 
{
    public interface ITodoRepo 
    {
        Task<IEnumerable<Todo>> GetAllTodos();
        Task<Todo> GetTodoById(string id);
        Task CreateTodo(Todo todo);
        Task<Todo> UpdateTodoById(string id, Todo todo);
        Task DeleteTodoById(string id);
    }
}