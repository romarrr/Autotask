using UserService.Dtos;
using UserService.Models;
using UserService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace UserService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;

        private readonly HttpClient _httpClient;

        public UserController(IUserRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _repository.GetAllUsers();
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<User> GetUserById(string id)
        {
            return await _repository.GetUserById(id);
        }

        [HttpGet("email/{email}", Name = "GetUserByEmail")]
        public async Task<User> GetUserByEmail(string email)
        {
            return await _repository.GetUserByEmail(email);
        }

        [HttpGet("specialization/{specialization}", Name = "GetUsersBySpecialization")]
        public async Task<IEnumerable<User>> GetUserBySpecialization(string specialization)
        {
            return await _repository.GetUsersBySpecialization(specialization);
        }

        [HttpGet("specialization/{specialization}/experience/{experience}", Name = "GetUsersBySpecializationAndByExperience")]
        public async Task<IEnumerable<User>> GetUsersBySpecializationAndByExperience(string specialization, string experience)
        {
            return await _repository.GetUsersBySpecializationAndByExperience(specialization, experience);
        }

        [HttpGet("skill/{id}", Name = "GetUsersBySkillId")]
        public async Task<IEnumerable<User>> GetUsersBySkillId(string id)
        {
            return await _repository.GetUsersBySkillId(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUser)
        {
            var userModel = _mapper.Map<User>(createUser);

            // var mail = _repository.VerifyUserByEmail(userModel.Email);

            // if (mail == true)
            // {
            //     Console.WriteLine("Un compte utilisant cet e-mail est déjà existant.");
            //     return NotFound("E-mail déjà existant.");
            // }
            // else
            // {

            var skillList = new List<Skill>();

            for(var i=0; i < userModel.Skillsid.Length; i++)
            {
                var getSkill = await _httpClient.GetAsync("http://localhost:9000/skill/" + userModel.Skillsid[i]);

                var deserializedSkill = JsonConvert.DeserializeObject<Skill>(
                    await getSkill.Content.ReadAsStringAsync());

                var skillModel = _mapper.Map<Skill>(deserializedSkill);

                var newSkill = new Skill();
                newSkill.Id = userModel.Skillsid[i];
                newSkill.Specializationname = skillModel.Specializationname;
                newSkill.Experiencename = skillModel.Experiencename;
                skillList.Add(newSkill);
            }
            userModel.skills = skillList;

            if(userModel.Photo == "")
            {
                userModel.Photo = "https://i.goopics.net/71ddmo.png";
            }

            await _repository.CreateUser(userModel);

            var readUserDto = _mapper.Map<ReadUserDto>(userModel);

            return CreatedAtRoute(nameof(GetUserById), new { Id = readUserDto.Id }, readUserDto);
            // }
        } 

        [HttpPut("{id}", Name = "UpdateUserById")]
        public async Task<IActionResult> UpdateUserById(string id, [FromBody] User user)
        {
            var skillList = new List<Skill>();

            for(var i=0; i < user.Skillsid.Length; i++)
            {
                var getSkill = await _httpClient.GetAsync("http://localhost:9000/skill/" + user.Skillsid[i]);

                var deserializedSkill = JsonConvert.DeserializeObject<Skill>(
                    await getSkill.Content.ReadAsStringAsync());

                var skillModel = _mapper.Map<Skill>(deserializedSkill);

                var newSkill = new Skill();
                newSkill.Id = user.Skillsid[i];
                newSkill.Specializationname = skillModel.Specializationname;
                newSkill.Experiencename = skillModel.Experiencename;
                skillList.Add(newSkill);
            }
            user.skills = skillList;

            await _repository.UpdateUserById(id, user);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserById(string id)
        {
            var User = _repository.GetUserById(id);
            if(User != null)
            {
                await _repository.DeleteUserById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}