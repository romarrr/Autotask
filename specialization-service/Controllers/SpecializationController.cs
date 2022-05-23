using SpecializationService.Dtos;
using SpecializationService.Models;
using SpecializationService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;

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

            // En plus de créer la spécialisation, création de 3 compétences avec un niveau différent dans le service Skill
            for(var i=0; i<=2; i++)
            {
                var skill = new Skill();
                if(i==0)
                {
                    skill.Experiencename = "Junior";
                }
                else if(i==1)
                {
                    skill.Experiencename = "Confirmé";
                }
                else if(i==2)
                {
                    skill.Experiencename = "Sénior";
                }
                
                skill.Specializationname = readSpecializationDto.Name;

                var skillContent = new StringContent(
                    Newtonsoft.Json.JsonConvert.SerializeObject(skill),
                    Encoding.UTF8,
                    "application/json");

                var postSkill = await _httpClient.PostAsync("http://localhost:9000/skill/", skillContent); 

                if(postSkill.IsSuccessStatusCode)
                {
                    // Si la réponse http est un succés on envoie un message 
                    Console.WriteLine("Le skill a été posté vers SkillService.");
                }
                else 
                {
                    // Si la réponse http est un échec on envoie un message
                    Console.WriteLine("ERREUR : Le skill n'a pas été posté vers SkillService.");
                }
            }   

            return CreatedAtRoute(nameof(GetSpecializationById), new { Id = readSpecializationDto.Id }, readSpecializationDto);
        } 

        [HttpPut("{id}", Name = "UpdateSpecializationById")]
        public async Task<IActionResult> UpdateSpecializationById(string id, [FromBody] Specialization specialization)
        {
            var spec = _mapper.Map<Specialization>(specialization);
            
            var specializationModel = await _repository.GetSpecializationById(id);
            var specializationMap = _mapper.Map<Specialization>(specializationModel);

            for(var i=0; i<=2; i++)
            {
                var skill = new Skill();
                
                skill.Specializationname = specializationMap.Name;

                if(i==0)
                {
                    skill.Experiencename = "Junior";
                }
                else if(i==1)
                {
                    skill.Experiencename = "Confirmé";
                }
                else if(i==2)
                {
                    skill.Experiencename = "Sénior";
                }

                var getSkill = await _httpClient.GetAsync("http://localhost:9000/skill/" + skill.Specializationname + "/" + skill.Experiencename); 
                
                var deserializedSkill = JsonConvert.DeserializeObject<Skill>(
                    await getSkill.Content.ReadAsStringAsync());
                
                var getSkillMap = _mapper.Map<Skill>(deserializedSkill);

                var updateSkill = new Skill();
                updateSkill.Id = getSkillMap.Id;
                updateSkill.Specializationname = spec.Name;
                updateSkill.Experiencename = skill.Experiencename;

                var skillContent = new StringContent(
                    Newtonsoft.Json.JsonConvert.SerializeObject(updateSkill),
                    Encoding.UTF8,
                    "application/json");

                var putSkill = await _httpClient.PutAsync("http://localhost:9000/skill/" + skill.Specializationname + "/" + skill.Experiencename, skillContent); 

                if(putSkill.IsSuccessStatusCode)
                {
                    // Si la réponse http est un succés on envoie un message 
                    Console.WriteLine("Le skill a été modifié dans SkillService.");
                }
                else 
                {
                    // Si la réponse http est un échec on envoie un message
                    Console.WriteLine("ERREUR : Le skill n'a pas été modifié dans SkillService.");
                }
            }   

            await _repository.UpdateSpecializationById(id, specialization);
            return Ok();
        }

        [HttpDelete("{id}", Name = "DeleteSpecializationById")]
        public async Task<IActionResult> DeleteSpecializationById(string id)
        {
            var specialization = await _repository.GetSpecializationById(id);
            var specializationMap = _mapper.Map<Specialization>(specialization);
        
            if(specialization != null)
            {
                // Permet de supprimer les Skills correspondant dans le service Skill
                for(var i=0; i<=2; i++)
                {
                    var skill = new Skill();
                    if(i==0)
                    {
                        skill.Experiencename = "Junior";
                    }
                    else if(i==1)
                    {
                        skill.Experiencename = "Confirmé";
                    }
                    else if(i==2)
                    {
                        skill.Experiencename = "Sénior";
                    }

                    var deleteSkill = await _httpClient.DeleteAsync("http://localhost:9000/skill/" + specializationMap.Name + "/" + skill.Experiencename); 

                    if(deleteSkill.IsSuccessStatusCode)
                    {
                        Console.WriteLine("Le skill a été supprimé de SkillService.");
                    }
                    else 
                    {
                        Console.WriteLine("ERREUR : Le skill n'a pas été supprimé de SkillService.");
                    }
                }
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