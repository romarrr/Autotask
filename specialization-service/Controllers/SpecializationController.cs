using SpecializationService.Dtos;
using SpecializationService.Models;
using SpecializationService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace SpecializationService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SpecializationController : ControllerBase
    {
        private readonly ISpecializationRepo _repository;
        private readonly IMapper _mapper;

        private readonly HttpClient _httpClient;

        public SpecializationController(ISpecializationRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Specialization>> GetAllSpecializations()
        {
            return await _repository.GetAllSpecializations();
        }

        [HttpGet("{id}", Name = "GetSpecializationById")]
        public async Task<Specialization> GetSpecializationById(string id)
        {
            return await _repository.GetSpecializationById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSpecialization([FromBody] CreateSpecializationDto createSpecialization)
        {
            var SpecializationModel = _mapper.Map<Specialization>(createSpecialization);
            if(SpecializationModel.Logo == "")
            {
                SpecializationModel.Logo = "https://www.cnoa.dz/inscription/includes/img/profile.png";
            }
            await _repository.CreateSpecialization(SpecializationModel);
            var readSpecializationDto = _mapper.Map<ReadSpecializationDto>(SpecializationModel);

            for(var i=0; i<=2; i++)
            {
                var skillJunior = new Skill();
                if(i==0)
                {
                    skillJunior.Experiencename = "Junior";
                }
                else if(i==1)
                {
                    skillJunior.Experiencename = "Confirmé";
                }
                else if(i==2)
                {
                    skillJunior.Experiencename = "Sénior";
                }
                
                skillJunior.Specializationname = readSpecializationDto.Name;

                var skillJuniorContent = new StringContent(
                    Newtonsoft.Json.JsonConvert.SerializeObject(skillJunior),
                    Encoding.UTF8,
                    "application/json");
            
                var postSkillJunior = await _httpClient.PostAsync("http://localhost:9000/skill/", skillJuniorContent); 

                if(postSkillJunior.IsSuccessStatusCode)
                {
                    // Si la réponse http est un succés on envoie un message 
                    Console.WriteLine("Le skill a été posté vers SkillService.");
                }
                else 
                {
                    // Si la réponse http est un échec on envoie un message
                    Console.WriteLine("ERROR : Le skill n'a pas été posté vers SkillService.");
                }
            }   

            return CreatedAtRoute(nameof(GetSpecializationById), new { Id = readSpecializationDto.Id }, readSpecializationDto);
        } 

        [HttpPut("{id}", Name = "UpdateSpecializationById")]
        public async Task<IActionResult> UpdateSpecializationById(string id, [FromBody] Specialization specialization)
        {
            await _repository.UpdateSpecializationById(id, specialization);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecializationById(string id)
        {
            var Specialization = _repository.GetSpecializationById(id);
            if(Specialization != null)
            {
                await _repository.DeleteSpecializationById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}