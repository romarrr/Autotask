using ArchiveService.Dtos;
using ArchiveService.Models;
using ArchiveService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ArchiveService.Controllers 
{
    [Route("[controller]")] 
    [ApiController] 
    public class ArchiveController : ControllerBase
    { 
        private readonly IArchiveRepo _repository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public ArchiveController(IArchiveRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Archive>> GetAllArchives()
        {
            return await _repository.GetAllArchives();
        }

        [HttpGet("{id}", Name = "GetArchiveById")]
        public async Task<Archive> GetArchiveById(string id)
        {
            return await _repository.GetArchiveById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateArchive([FromBody] CreateArchiveDto createArchive)
        {
            var archiveModel = _mapper.Map<Archive>(createArchive);

            await _repository.CreateArchive(archiveModel);

            var readArchiveDto = _mapper.Map<ReadArchiveDto>(archiveModel);

            return CreatedAtRoute(nameof(GetArchiveById), new { Id = readArchiveDto.Id }, readArchiveDto);
        } 

        [HttpPut("{id}", Name = "UpdateArchiveById")]
        public async Task<IActionResult> UpdateArchiveById(string id, [FromBody] Archive archive)
        {
            var archiveModel = _mapper.Map<Archive>(archive);

            await _repository.UpdateArchiveById(id, archive);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArchiveById(string id)
        {
            var archive = _repository.GetArchiveById(id);
            if(archive != null)
            {
                await _repository.DeleteArchiveById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}