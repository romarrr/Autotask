using TodoService.Dtos;
using TodoService.Models;
using TodoService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace TodoService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepo _repository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public TodoController(ITodoRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Todo>> GetAllTodos()
        {
            return await _repository.GetAllTodos();
        }

        [HttpGet("{id}", Name = "GetTodoById")]
        public async Task<Todo> GetTodoById(string id)
        {
            return await _repository.GetTodoById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] CreateTodoDto createTodo)
        {
            var todoModel = _mapper.Map<Todo>(createTodo);
            if(todoModel.Logo == "")
            {
                todoModel.Logo = "https://iconarchive.com/download/i18422/iconshock/free-folder/folder-documents.ico";
            }

            var getSkill = await _httpClient.GetAsync("http://localhost:9000/skill/" + todoModel.Skillid); 
    
            var deserializedSkill = JsonConvert.DeserializeObject<Skill>(
                await getSkill.Content.ReadAsStringAsync()
                );
      
            var skillMap = _mapper.Map<Skill>(deserializedSkill);

            todoModel.skill = skillMap;

            await _repository.CreateTodo(todoModel);

            var readTodoDto = _mapper.Map<ReadTodoDto>(todoModel);

            return CreatedAtRoute(nameof(GetTodoById), new { Id = readTodoDto.Id }, readTodoDto);
        } 

        [HttpPut("{id}", Name = "UpdateTodoById")]
        public async Task<IActionResult> UpdateTodoById(string id, [FromBody] Todo todo)
        {
            var getSkill = await _httpClient.GetAsync("http://localhost:9000/skill/" + todo.Skillid); 
    
            var deserializedSkill = JsonConvert.DeserializeObject<Skill>(
                await getSkill.Content.ReadAsStringAsync()
                );
      
            var skillMap = _mapper.Map<Skill>(deserializedSkill);

            todo.skill = skillMap;

            await _repository.UpdateTodoById(id, todo);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoById(string id)
        {
            var Todo = _repository.GetTodoById(id);
            if(Todo != null)
            {
                await _repository.DeleteTodoById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}