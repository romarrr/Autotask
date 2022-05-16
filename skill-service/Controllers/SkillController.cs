using SkillService.Dtos;
using SkillService.Models;
using SkillService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace SkillService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillRepo _repository;
        private readonly IMapper _mapper;

        public SkillController(ISkillRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Skill>> GetAllSkills()
        {
            return await _repository.GetAllSkills();
        }

        [HttpGet("{id}", Name = "GetSkillById")]
        public async Task<Skill> GetSkillById(string id)
        {
            return await _repository.GetSkillById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSkill([FromBody] CreateSkillDto createSkill)
        {
            var skillModel = _mapper.Map<Skill>(createSkill);

            await _repository.CreateSkill(skillModel);
            
            var readSkillDto = _mapper.Map<ReadSkillDto>(skillModel);

            return CreatedAtRoute(nameof(GetSkillById), new { Id = readSkillDto.Id }, readSkillDto);
        } 

        [HttpPut("{id}", Name = "UpdateSkillById")]
        public async Task<IActionResult> UpdateSkillById(string id, [FromBody] Skill skill)
        {
            await _repository.UpdateSkillById(id, skill);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkillById(string id)
        {
            var skill = _repository.GetSkillById(id);
            if(skill != null)
            {
                await _repository.DeleteSkillById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}