using ProjectService.Dtos;
using ProjectService.Models;
using ProjectService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ProjectService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepo _repository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public ProjectController(IProjectRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _repository.GetAllProjects();
        }

        [HttpGet("{id}", Name = "GetProjectById")]
        public async Task<Project> GetProjectById(string id)
        {
            return await _repository.GetProjectById(id);
        }

        [HttpGet("client/{id}", Name = "GetProjectByClientId")]
        public async Task<IEnumerable<Project>> GetProjectByClientId(string id)
        {
            return await _repository.GetProjectByClientId(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto createProject)
        {
            var projectModel = _mapper.Map<Project>(createProject);

            var getClient = await _httpClient.GetAsync("http://localhost:1000/client/" + projectModel.Clientid); 
    
            var clientReadDto = JsonConvert.DeserializeObject<ReadClientDto>(
                await getClient.Content.ReadAsStringAsync()
                );
      
            var clientMap = _mapper.Map<Client>(clientReadDto);

            projectModel.client = clientMap;

            if(projectModel.Logo == "")
            {
                projectModel.Logo = "https://iconarchive.com/download/i18420/iconshock/free-folder/folder-images.ico";
            }

            await _repository.CreateProject(projectModel);

            var readProjectDto = _mapper.Map<ReadProjectDto>(projectModel);

            return CreatedAtRoute(nameof(GetProjectById), new { Id = readProjectDto.Id }, readProjectDto);
        } 

        [HttpPut("{id}", Name = "UpdateProjectById")]
        public async Task<IActionResult> UpdateProjectById(string id, [FromBody] Project project)
        {
            var projectModel = _mapper.Map<Project>(project);

            var getClient = await _httpClient.GetAsync("http://localhost:1000/client/" + projectModel.Clientid); 
       
            // deserialisation de l'objet client
            var clientReadDto = JsonConvert.DeserializeObject<ReadClientDto>
            (
                await getClient.Content.ReadAsStringAsync()
            );
  
            // mapping des données deserialisés 
            var clientMap = _mapper.Map<Client>(clientReadDto);

            projectModel.client = clientMap;

            await _repository.UpdateProjectById(id, project);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectById(string id)
        {
            var project = _repository.GetProjectById(id);
            if(project != null)
            {
                await _repository.DeleteProjectById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}