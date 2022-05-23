using PlanningService.Dtos;
using PlanningService.Models;
using PlanningService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.IdGenerators;

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
        
        [HttpPost("{role}", Name = "CreatePlanning")]
        public async Task<IActionResult> CreatePlanning(string role, [FromBody] CreatePlanningDto createPlanning)
        {
            // --- ETAPE ---
            // Créer un planning récupèrera tous les utilisateurs qui ont le rôle choisi (développeurs, commerciaux...)
            // et les ajoutera au planning crée
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
        public async Task<IActionResult> UpdatePlanningById(string id, Planning planning)
        {
            var planningModel = _mapper.Map<Planning>(planning);

            // --- ETAPE ---
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

            // --- ETAPE ---
            // Récupération des informations des tâches

            // Création d'une liste contenant les tâches provenant des devis qui ont été acceptés
            var quoteAcceptedTodosList = new List<Todo>();

            // Récupération des devis acceptés
            var getQuoteAccepted = await _httpClient.GetAsync("http://localhost:4000/quote/accepted"); 
    
            // Désérialisation des devis acceptés en liste de devis
            var deserializedQuote = JsonConvert.DeserializeObject<List<Quote>>(await getQuoteAccepted.Content.ReadAsStringAsync());

            // Modification du statut des devis "Accepté" qui deviennent "Accepté - En cours de développement"
            for(var i=0; i<deserializedQuote.Count; i++)
            {
                var quoteUpdate = new Quote();
                quoteUpdate.Id = deserializedQuote[i].Id;
           
                var quoteContent = new StringContent(
                    JsonConvert.SerializeObject(quoteUpdate),
                    Encoding.UTF8,
                    "application/json");
               
                var updateQuoteAccepted = await _httpClient.PutAsync("http://localhost:4000/quote/accepted/" + quoteUpdate.Id, quoteContent); 

                if(updateQuoteAccepted.IsSuccessStatusCode)
                {
                    Console.WriteLine("Le status du devis : " + quoteUpdate.Id + " a été modifié en \"Accepté - En cours de développement\".");
                }
                else 
                {
                    Console.WriteLine("ERREUR : Le status du devis : " + quoteUpdate.Id + " n'a pas été modifié en \"Accepté - En cours de développement\".");
                }
            }
            // Modification effectuée

            // Boucles pour atteindre les tâches présentes dans les devis récupérés
            foreach(var quoteModel in deserializedQuote) 
            { 

                // Assignation des tâches à l'User qualifié
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
                    
                    newTodo.Id = ObjectId.GenerateNewId().ToString(); // Génère un nouvel id unique pour chaque nouvelle tâche
                    newTodo.Originalid = quoteTodo.Id;
                    newTodo.Quoteid = quoteModel.Id;
                    newTodo.Name = quoteTodo.Name;
                    newTodo.Type = quoteTodo.Type;
                    newTodo.Description = quoteTodo.Description;
                    newTodo.Skillid = quoteTodo.Skillid;
                    newTodo.skill = quoteTodo.skill;
                    newTodo.Status = "A Faire";
                    newTodo.Time = quoteTodo.Time;
                    quoteAcceptedTodosList.Add(newTodo);
                }           
            }  
            foreach(var todo in quoteAcceptedTodosList)
            {
                planningModel.todos.Add(todo);
            }
            planningModel.users = usersList;
            // Données des tâches récupérées

            // --- ETAPE ---
            // Vérification que les devis en cours sont terminés ou pas
            // S'ils sont terminés, on passe leur status à "Terminé", sinon on ne fait rien
            // Récupération des devis en cours de développement
            var getQuoteInProgress = await _httpClient.GetAsync("http://localhost:4000/quote/inprogress"); 

            // Désérialisation des devis en cours de développement en liste de devis
            var deserializedQuoteInProgress = JsonConvert.DeserializeObject<List<Quote>>(await getQuoteInProgress.Content.ReadAsStringAsync());

            for(var i = 0; i < deserializedQuoteInProgress.Count; i++)
            {
                var quoteInProgress = _mapper.Map<Quote>(deserializedQuoteInProgress[i]);
                var quoteInProgressId = quoteInProgress.Id;
                var todosOfQuoteInProgress = quoteInProgress.todos;
                var todosOfQuoteInProgressMap = _mapper.Map<List<Todo>>(todosOfQuoteInProgress);
                var todosInQuoteList = new List<Todo>();
                foreach(var todoFinish in todosOfQuoteInProgressMap)
                {
                    todosInQuoteList.Add(todoFinish);
                }
                var todosFinishedInPlanningList = new List<Todo>();
                var todosInPlanning = planningModel.todos;
                foreach(var todoVerif in todosInPlanning)
                {
                    if(todoVerif.Status == "Terminé" && todoVerif.Quoteid == quoteInProgressId)
                    {
                        todosFinishedInPlanningList.Add(todoVerif);
                    }
                }
                if(todosFinishedInPlanningList.Count == todosInQuoteList.Count)
                {
                    // Modification du statut des devis "Accepté - En cours de développement" qui deviennent "Terminé"
                    var quoteUpdate = new Quote();
                    quoteUpdate.Id = quoteInProgress.Id;
            
                    var quoteContent = new StringContent(
                        JsonConvert.SerializeObject(quoteUpdate),
                        Encoding.UTF8,
                        "application/json");
                
                    var updateQuoteFinished = await _httpClient.PutAsync("http://localhost:4000/quote/finished/" + quoteUpdate.Id, quoteContent); 

                    if(updateQuoteFinished.IsSuccessStatusCode)
                    {
                        Console.WriteLine("Le status du devis : " + quoteUpdate.Id + " a été modifié en \"Terminé\".");
                    }
                    else 
                    {
                        Console.WriteLine("ERREUR : Le status du devis : " + quoteUpdate.Id + " n'a pas été modifié en \"Terminé\".");
                    }

                    // Supression du planning et envoi des tâches terminées dans le service Archive
                    var planningTodosModel = planningModel.todos;
                    var planningTodosModelMap = _mapper.Map<List<Todo>>(planningTodosModel);
                    foreach(var finishedTodo in todosFinishedInPlanningList)
                    {
                        var index = planningTodosModelMap.FindIndex(c => c.Id == finishedTodo.Id && c.Quoteid == quoteUpdate.Id);
                        planningTodosModelMap.RemoveAt(index);
                    }
                    planningModel.todos = planningTodosModelMap;
                }
            }

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


        // Gestion des tâches dans les plannings
        [HttpGet("{planningid}/todos/user/{id}", Name = "GetTodosByPlanningIdAndByUserId")]
        public async Task<IEnumerable<Todo>> GetTodosByPlanningIdAndByUserId(string planningid, string id)
        {
            return await _repository.GetTodosByPlanningIdAndByUserId(planningid, id);
        }

        [HttpGet("{planningid}/todo/user/{userid}/{todoid}", Name = "GetTodoById")]
        public async Task<Todo> GetTodoById(string planningid, string userid, string todoid)
        {
            return await _repository.GetTodoById(planningid, userid, todoid);
        }


        // User
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

        [HttpPut("{planningid}/user/{userid}/start/todo/{todoid}", Name = "StartTodoById")]
        public async Task<IActionResult> StartTodoById(string planningid, string userid, string todoid, [FromBody] Planning planning)
        {
            var planningMap = _mapper.Map<Planning>(planning);

            var getPlanning = await _repository.GetPlanningById(planningid);
            var getPlanningMap = _mapper.Map<Planning>(getPlanning);

            var todos = _mapper.Map<List<Todo>>(getPlanningMap.todos);

            var todo = await _repository.GetTodoById(getPlanningMap.Id, userid, todoid);
            var todoMap = _mapper.Map<Todo>(todo);

            var upTodo = new Todo();
            upTodo.Id = todoMap.Id;
            upTodo.Originalid = todoMap.Originalid;
            upTodo.Name = todoMap.Name;
            upTodo.Type = todoMap.Type;
            upTodo.Description = todoMap.Description;
            upTodo.Time = todoMap.Time;
            upTodo.Skillid = todoMap.Skillid;
            upTodo.skill = todoMap.skill;
            upTodo.Userid = todoMap.Userid;
            upTodo.user = todoMap.user;
            upTodo.Status = "En cours";

            var index = todos.FindIndex(t => t.Id == todoid);
            todos[index] = upTodo;

            planning.todos = todos;

            await _repository.UpdatePlanningById(planningid, planning);
            
            return Ok();
        }

        [HttpPut("{planningid}/user/{userid}/finish/todo/{todoid}", Name = "FinishTodoById")]
        public async Task<IActionResult> FinishTodoById(string planningid, string userid, string todoid, [FromBody] Planning planning)
        {
            var planningMap = _mapper.Map<Planning>(planning);

            var getPlanning = await _repository.GetPlanningById(planningid);
            var getPlanningMap = _mapper.Map<Planning>(getPlanning);

            var todos = _mapper.Map<List<Todo>>(getPlanningMap.todos);

            var todo = await _repository.GetTodoById(getPlanningMap.Id, userid, todoid);
            var todoMap = _mapper.Map<Todo>(todo);

            var upTodo = new Todo();
            upTodo.Id = todoMap.Id;
            upTodo.Originalid = todoMap.Originalid;
            upTodo.Name = todoMap.Name;
            upTodo.Type = todoMap.Type;
            upTodo.Description = todoMap.Description;
            upTodo.Time = todoMap.Time;
            upTodo.Skillid = todoMap.Skillid;
            upTodo.skill = todoMap.skill;
            upTodo.Userid = todoMap.Userid;
            upTodo.user = todoMap.user;
            upTodo.Status = "Terminé";

            var index = todos.FindIndex(t => t.Id == todoid);
            todos[index] = upTodo;

            planning.todos = todos;

            await _repository.UpdatePlanningById(planningid, planning);
            
            return Ok();
        }
    }
}