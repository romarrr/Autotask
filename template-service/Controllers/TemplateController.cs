using TemplateService.Dtos;
using TemplateService.Models;
using TemplateService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace TemplateService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateRepo _repository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public TemplateController(ITemplateRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Template>> GetAllTemplates()
        {
            return await _repository.GetAllTemplates();
        }

        [HttpGet("{id}", Name = "GetTemplateById")]
        public async Task<Template> GetTemplateById(string id)
        {
            return await _repository.GetTemplateById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTemplate([FromBody] CreateTemplateDto createTemplate)
        {
            var templateModel = _mapper.Map<Template>(createTemplate);

            var todos = new List<Todo>();
            
            for(var i=0; i < templateModel.Templatetodoid.Length; i++)
            {
                var newTodo = new Todo();

                var getTodo = await _httpClient.GetAsync("http://localhost:7000/todo/" + templateModel.Templatetodoid[i]);

                var deserializedTodo = JsonConvert.DeserializeObject<CreateTodoDto>(
                    await getTodo.Content.ReadAsStringAsync());

                var todoModel = _mapper.Map<Todo>(deserializedTodo);
                
                newTodo.Id = templateModel.Templatetodoid[i];
                newTodo.Name = todoModel.Name;
                newTodo.Type = todoModel.Type; 
                newTodo.Description = todoModel.Description;    
                newTodo.Skillid = todoModel.Skillid;  
                newTodo.skill = todoModel.skill;  
                newTodo.Time = todoModel.Time;                
           
                todos.Add(newTodo);
            }

            templateModel.todos = todos;

            if(templateModel.Logo == "")
            {
                templateModel.Logo = "https://icons.iconarchive.com/icons/iconshock/free-folder/256/folder-vectors-icon.png";
            }
            await _repository.CreateTemplate(templateModel);
            var readTemplateDto = _mapper.Map<ReadTemplateDto>(templateModel);

            return CreatedAtRoute(nameof(GetTemplateById), new { Id = readTemplateDto.Id }, readTemplateDto);
        } 

        [HttpPut("{id}", Name = "UpdateTemplateById")]
        public async Task<IActionResult> UpdateTemplateById(string id, [FromBody] Template template)
        {
            var templateModel = _mapper.Map<Template>(template);
            
            var todos = new List<Todo>();
            
            for(var i=0; i < templateModel.Templatetodoid.Length; i++)
            {
                var newTodo = new Todo();

                var getTodo = await _httpClient.GetAsync("http://localhost:7000/todo/" + templateModel.Templatetodoid[i]);

                var deserializedTodo = JsonConvert.DeserializeObject<CreateTodoDto>(
                    await getTodo.Content.ReadAsStringAsync());

                var todoModel = _mapper.Map<Todo>(deserializedTodo);
                
                newTodo.Id = templateModel.Templatetodoid[i];
                newTodo.Name = todoModel.Name;
                newTodo.Type = todoModel.Type; 
                newTodo.Description = todoModel.Description;    
                newTodo.Skillid = todoModel.Skillid;  
                newTodo.skill = todoModel.skill;  
                newTodo.Time = todoModel.Time;                
           
                todos.Add(newTodo);
            }

            templateModel.todos = todos;

            if(templateModel.Logo == "")
            {
                templateModel.Logo = "https://mayotte.fff.fr/wp-content/uploads/sites/117/2018/12/dossiers.png";
            }
            await _repository.UpdateTemplateById(id, template);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateById(string id)
        {
            var template = _repository.GetTemplateById(id);
            if(template != null)
            {
                await _repository.DeleteTemplateById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}