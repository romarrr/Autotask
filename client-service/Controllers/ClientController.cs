using ClientService.Dtos;
using ClientService.Models;
using ClientService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace ClientService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepo _repository;
        private readonly IMapper _mapper;

        public ClientController(IClientRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Client>> GetAllClients()
        {
            return await _repository.GetAllClients();
        }

        [HttpGet("{id}", Name = "GetClientById")]
        public async Task<Client> GetClientById(string id)
        {
            return await _repository.GetClientById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] CreateClientDto createClient)
        {
            var clientModel = _mapper.Map<Client>(createClient);
            if(clientModel.Logo == "")
            {
                clientModel.Logo = "https://iconarchive.com/download/i18421/iconshock/free-folder/folder-customer.ico";
            }
            await _repository.CreateClient(clientModel);
            var readClientDto = _mapper.Map<ReadClientDto>(clientModel);

            return CreatedAtRoute(nameof(GetClientById), new { Id = readClientDto.Id }, readClientDto);
        } 

        [HttpPut("{id}", Name = "UpdateClientById")]
        public async Task<IActionResult> UpdateClientById(string id, [FromBody] Client client)
        {
            await _repository.UpdateClientById(id, client);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientById(string id)
        {
            var Client = _repository.GetClientById(id);
            if(Client != null)
            {
                await _repository.DeleteClientById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}