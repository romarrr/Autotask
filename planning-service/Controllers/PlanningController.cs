using PlanningService.Dtos;
using PlanningService.Models;
using PlanningService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PlanningService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlanningController : ControllerBase
    {
        private readonly IPlanningRepo _repository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public PlanningController(IPlanningRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Planning>> GetAllPlannings()
        {
            return await _repository.GetAllPlannings();
        }

        [HttpGet("{id}", Name = "GetPlanningById")]
        public async Task<Planning> GetPlanningById(string id)
        {
            return await _repository.GetPlanningById(id);
        }

        [HttpGet("{name}/todos/user/{id}", Name = "GetTodosByPlanningNameAndByUserId")]
        public async Task<IEnumerable<Todo>> GetTodosByPlanningNameAndByUserId(string name, string id)
        {
            return await _repository.GetTodosByPlanningNameAndByUserId(name, id);
        }

        [HttpGet("users/role/{role}", Name = "GetAllUsersByRole")]
        public async Task<IEnumerable<User>> GetAllUsersByRole(string role)
        {
            return await _repository.GetAllUsersByRole(role);
        }

        [HttpGet("users/skill/{id}", Name = "GetUsersBySkill")]
        public async Task<IEnumerable<User>> GetUsersBySkillId(string id)
        {
            return await _repository.GetUsersBySkillId(id);
        }

        [HttpPost("{role}", Name = "CreatePlanning")]
        public async Task<IActionResult> CreatePlanning(string role, [FromBody] CreatePlanningDto createPlanning)
        {
            var planningModel = _mapper.Map<Planning>(createPlanning);

            var planningUsers = await _repository.GetAllUsersByRole(role);
            var planningUsersMap = _mapper.Map<List<User>>(planningUsers);
            var usersList = new List<User>();
            foreach(var user in planningUsersMap)
            {
                var newUser = new User();
                newUser.Id = user.Id;
                newUser.Role = user.Role;
                newUser.Lastname = user.Lastname;
                newUser.Firstname = user.Firstname;
                newUser.Phone = user.Phone;
                newUser.Email = user.Email;
                newUser.Skillsid = user.Skillsid;
                newUser.skills = user.skills;
                newUser.Photo = user.Photo;
                usersList.Add(newUser);
            }
            planningModel.users = usersList;

            await _repository.CreatePlanning(planningModel);

            var readPlanningDto = _mapper.Map<ReadPlanningDto>(planningModel);

            return CreatedAtRoute(nameof(GetPlanningById), new { Id = readPlanningDto.Id }, readPlanningDto);
        } 

        [HttpPut("{id}", Name = "UpdatePlanningById")]
        public async Task<IActionResult> UpdatePlanningByRoleAndById(string id, Planning planning)
        {
            var planningModel = _mapper.Map<Planning>(planning);

            // Récupération de la liste des Users contenue dans le planning à modifier
            // Les Users de la liste seront modifiés, en ajoutant le temps de travail (workTime)
            // des tâches qui leur seront confiées
            var usersList = new List<User>();
            foreach(var user in planningModel.users)
            {
                var newUser = new User();
                newUser.Id = user.Id;
                newUser.Role = user.Role;
                newUser.Lastname = user.Lastname;
                newUser.Firstname = user.Firstname;
                newUser.Phone = user.Phone;
                newUser.Email = user.Email;
                newUser.Skillsid = user.Skillsid;
                newUser.skills = user.skills;
                newUser.Worktime = user.Worktime;
                newUser.Photo = user.Photo;
                usersList.Add(newUser);
            }

            // Récupération des informations des tâches

            // Création d'une liste contenant les tâches provenant des devis qui ont été acceptés
            var quoteAcceptedTodosList = new List<Todo>();

            // Récupération des devis acceptés
            var getQuoteAccepted = await _httpClient.GetAsync("http://localhost:4000/quote/accepted"); 
    
            // Désérialisation des devis acceptés en liste de devis
            var deserializedQuote = JsonConvert.DeserializeObject<List<Quote>>(await getQuoteAccepted.Content.ReadAsStringAsync());

            // Boucles pour atteindre les tâches présentes dans les devis récupérés
            foreach(var quoteModel in deserializedQuote) 
            { 
                foreach(var quoteTodo in quoteModel.todos)
                {
                    // Pour châque tâche :

                    // Création d'une liste contenant les Users qualifiés pour cette tâche
                    var qualifiedUserList = new List<User>();

                    // Création d'un objet Todo qui créera la tâche dans le planning 
                    // (avec l'id de l'User à qui cette tâche a été attribuée)
                    var newTodo = new Todo();

                    // Création d'un objet User qui modifiera la valeur workTime
                    var newUser = new User();

                    // Boucles pour récupérer les Users ayant les compétences (skills) nécessaires pour cette tâche
                    foreach(var user in planning.users)
                    {
                        foreach(var skillId in user.Skillsid)
                        {
                            if(skillId == quoteTodo.Skillid)
                            {
                                qualifiedUserList.Add(user);
                            }
                        }
                    }            

                    if(qualifiedUserList.Count == 0)
                    {
                        // Si la liste des Users compétents est vide 
                        // alors aucun User compétent n'a été trouvé pour cette tâche 
                        // donc (pour l'instant) on donne la tâche à l'admin
                        var admin = await _httpClient.GetAsync("http://localhost:8000/user/626ba7948a3dbf7173707e44" ); 
                        var deserializedAdmin = JsonConvert.DeserializeObject<User>(await admin.Content.ReadAsStringAsync());
                        newTodo.Userid = "626ba7948a3dbf7173707e44";
                        newTodo.user = deserializedAdmin;
                    }
                    else if(qualifiedUserList.Count == 1)
                    {
                        // Si la liste des Users compétents ne contient qu'un seul User
                        // alors on lui donne la tâche
                        newTodo.Userid = qualifiedUserList[0].Id;
                        newTodo.user = qualifiedUserList[0];
                        // Ajout du temps de complétion de la tâche
                        qualifiedUserList[0].Worktime += quoteTodo.Time;
                        newUser.Id = qualifiedUserList[0].Id;
                        newUser.Role = qualifiedUserList[0].Role;
                        newUser.Lastname = qualifiedUserList[0].Lastname;
                        newUser.Firstname = qualifiedUserList[0].Firstname;
                        newUser.Phone = qualifiedUserList[0].Phone;
                        newUser.Email = qualifiedUserList[0].Email;
                        newUser.Skillsid = qualifiedUserList[0].Skillsid;
                        newUser.skills = qualifiedUserList[0].skills;
                        newUser.Worktime = qualifiedUserList[0].Worktime;
                        newUser.Photo = qualifiedUserList[0].Photo;
                        // Détermination de la place de l'User à modifier dans la userList
                        var index = usersList.FindIndex(c => c.Id == qualifiedUserList[0].Id);
                        // Remplacement des données d'origine de l'User par les données ci-dessus (dont le worktime)
                        usersList[index] = newUser;
                        planningModel.users = usersList;
                    }
                    else if(qualifiedUserList.Count > 1)
                    {
                        // Si la liste des Users compétents pour cette tâche contient plusieurs Users
                        // Recherche de l'User qui a le plus petit temps de travail
                        // Le tableau workTimes contient les temps de travail de chaque User
                        var workTimes = new int[qualifiedUserList.Count];
                        for(var i=0; i<qualifiedUserList.Count; i++)
                        {
                            workTimes[i] = qualifiedUserList[i].Worktime;
                        }
                        // La variable minWorkTime contient la plus petite valeur de ce tableau
                        // (le plus petit temps de travail)
                        var minWorkTime = workTimes.Min();
                        // La variable verification permettra de donner la tâche à un seul User
                        // dans le cas où deux Users ont le même plus petit temps de travail
                        var verification = 0;
                        for(var i=0; i<qualifiedUserList.Count; i++)
                        {
                            if(qualifiedUserList[i].Worktime == minWorkTime && verification != 1)
                            {
                                newTodo.Userid = qualifiedUserList[i].Id;
                                newTodo.user = qualifiedUserList[i];
                                qualifiedUserList[i].Worktime += quoteTodo.Time;
                                newUser.Id = qualifiedUserList[i].Id;
                                newUser.Role = qualifiedUserList[i].Role;
                                newUser.Lastname = qualifiedUserList[i].Lastname;
                                newUser.Firstname = qualifiedUserList[i].Firstname;
                                newUser.Phone = qualifiedUserList[i].Phone;
                                newUser.Email = qualifiedUserList[i].Email;
                                newUser.Skillsid = qualifiedUserList[i].Skillsid;
                                newUser.skills = qualifiedUserList[i].skills;
                                newUser.Worktime = qualifiedUserList[i].Worktime;
                                newUser.Photo = qualifiedUserList[i].Photo;
                                var index = usersList.FindIndex(c => c.Id == qualifiedUserList[i].Id);
                                usersList[index] = newUser;
                                planningModel.users = usersList;
                                verification = 1;
                            }
                        }
                    }

                    newTodo.Id = quoteTodo.Id;
                    newTodo.Name = quoteTodo.Name;
                    newTodo.Type = quoteTodo.Type;
                    newTodo.Description = quoteTodo.Description;
                    newTodo.Skillid = quoteTodo.Skillid;
                    newTodo.skill = quoteTodo.skill;
                    newTodo.Status = quoteTodo.Status;
                    newTodo.Time = quoteTodo.Time;
                    quoteAcceptedTodosList.Add(newTodo);
                    
                }           
            }  

            planningModel.todos = quoteAcceptedTodosList;
            planningModel.users = usersList;
            // Données des tâches récupérées

            planning = planningModel;

            await _repository.UpdatePlanningById(id, planning);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanningById(string id)
        {
            var planning = _repository.GetPlanningById(id);
            if(planning != null)
            {
                await _repository.DeletePlanningById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}