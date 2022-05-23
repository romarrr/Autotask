using QuoteService.Dtos;
using QuoteService.Models;
using QuoteService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace QuoteService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly IQuoteRepo _repository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public QuoteController(IQuoteRepo repository, IMapper mapper, HttpClient httpClient)
        {
            _repository = repository;
            _mapper = mapper;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Quote>> GetAllQuotes()
        {
            return await _repository.GetAllQuotes();
        }

        [HttpGet("{id}", Name = "GetQuoteById")]
        public async Task<Quote> GetQuoteById(string id)
        {
            return await _repository.GetQuoteById(id);
        }

        [HttpGet("accepted", Name = "GetQuotesAccepted")]
        public async Task<IEnumerable<Quote>> GetQuotesAccepted()
        {
            return await _repository.GetQuotesAccepted();
        }

        [HttpGet("accepted/{id}", Name = "GetQuoteAcceptedById")]
        public async Task<Quote> GetQuoteAcceptedById(string id)
        {
            return await _repository.GetQuoteAcceptedById(id);
        }

        [HttpGet("inprogress", Name = "GetQuotesInProgress")]
        public async Task<IEnumerable<Quote>> GetQuotesInProgress()
        {
            return await _repository.GetQuotesInProgress();
        }

        [HttpGet("inprogress/{id}", Name = "GetQuoteInProgressById")]
        public async Task<Quote> GetQuoteInProgressById(string id)
        {
            return await _repository.GetQuoteInProgressById(id);
        }

        [HttpGet("finished", Name = "GetQuotesFinished")]
        public async Task<IEnumerable<Quote>> GetQuotesFinished()
        {
            return await _repository.GetQuotesFinished();
        }

        [HttpGet("finished/{id}", Name = "GetQuoteFinishedById")]
        public async Task<Quote> GetQuoteFinishedById(string id)
        {
            return await _repository.GetQuoteFinishedById(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuote([FromBody] CreateQuoteDto createQuote)
        {
            var quoteModel = _mapper.Map<Quote>(createQuote);

            // Récupérer les infos du client
            var getClient = await _httpClient.GetAsync("http://localhost:1000/client/" + quoteModel.Clientid); 

            var clientReadDto = JsonConvert.DeserializeObject<ReadClientDto>(
                await getClient.Content.ReadAsStringAsync()
                );
  
            var clientMap = _mapper.Map<Client>(clientReadDto);

            quoteModel.client = clientMap;
            // Données du client récupérées

            // Création d'une nouvelle liste de tâches qui va contenir les tâches du template + les tâches choisies par le client
            var todos = new List<Todo>();

            // Création d'une nouvelle liste de tâches qui va contenir les tâches du template
            var templateTodos = new List<Todo>();

            // Récupérer les tâches du template 
            var newTemplateTodo = new Todo();

            var getTemplate = await _httpClient.GetAsync("http://localhost:6000/template/" + quoteModel.Templateid);

            var deserializedTemplate = JsonConvert.DeserializeObject<Template>(
                await getTemplate.Content.ReadAsStringAsync());

            var templateModel = _mapper.Map<Template>(deserializedTemplate);

            quoteModel.Templatename = templateModel.Name;

            // Récupérer les tâches du template choisi
            for(var j=0; j < quoteModel.Templatetodoid.Length; j++)
            {
                var newTodo = new Todo();

                var getTodo = await _httpClient.GetAsync("http://localhost:7000/todo/" + quoteModel.Templatetodoid[j]);

                var deserializedTemplateTodo = JsonConvert.DeserializeObject<CreateTodoDto>(
                    await getTodo.Content.ReadAsStringAsync());

                var todoModel = _mapper.Map<Todo>(deserializedTemplateTodo);
                
                newTodo.Id = quoteModel.Templatetodoid[j];
                newTodo.Name = todoModel.Name;
                newTodo.Type = todoModel.Type;
                newTodo.Description = todoModel.Description;    
                newTodo.Skillid = todoModel.Skillid;  
                newTodo.skill = todoModel.skill;  
                newTodo.Time = todoModel.Time;                
           
                templateTodos.Add(newTodo);
            }

            foreach(var todo in templateModel.todos)
            {
                newTemplateTodo = todo;
                         
                todos.Add(newTemplateTodo);
            }
            // Tâches du template récupérées

            // Récupérer les tâches choisie par le client
            for(var j=0; j < quoteModel.Todosidoutoftemplate.Length; j++)
            {
                var newTodo = new Todo();

                var getTodo = await _httpClient.GetAsync("http://localhost:7000/todo/" + quoteModel.Todosidoutoftemplate[j]);

                var deserializedTodo = JsonConvert.DeserializeObject<CreateTodoDto>(
                    await getTodo.Content.ReadAsStringAsync());

                var todoModel = _mapper.Map<Todo>(deserializedTodo);
                
                newTodo.Id = quoteModel.Todosidoutoftemplate[j];
                newTodo.Name = todoModel.Name;
                newTodo.Type = todoModel.Type;
                newTodo.Description = todoModel.Description;    
                newTodo.Skillid = todoModel.Skillid;  
                newTodo.skill = todoModel.skill;  
                newTodo.Time = todoModel.Time;                
           
                todos.Add(newTodo);
            }

            quoteModel.todos = todos;
            // Tâches choisies par le client récupérées

            quoteModel.Status = "En attente";

            if(quoteModel.Logo == "")
            {
                quoteModel.Logo = "https://fr.seaicons.com/wp-content/uploads/2016/05/folder-invoices-icon.png";
            }
            await _repository.CreateQuote(quoteModel);

            var readQuoteDto = _mapper.Map<ReadQuoteDto>(quoteModel);

            return CreatedAtRoute(nameof(GetQuoteById), new { Id = readQuoteDto.Id }, readQuoteDto);
        } 

        [HttpPut("{id}", Name = "UpdateQuoteById")]
        public async Task<IActionResult> UpdateQuoteById(string id, [FromBody] Quote Quote)
        {
            var quoteModel = _mapper.Map<Quote>(Quote);

            // Récupérer les infos du client
            var getClient = await _httpClient.GetAsync("http://localhost:1000/client/" + quoteModel.Clientid); 
       
            var clientReadDto = JsonConvert.DeserializeObject<ReadClientDto>(
                await getClient.Content.ReadAsStringAsync()
                );
  
            var clientMap = _mapper.Map<Client>(clientReadDto);

            quoteModel.client = clientMap;
            // Données du client récupérées

            // Création d'une nouvelle liste de tâches qui va contenir les tâches du template + les tâches choisies par le client
            var todos = new List<Todo>();

            // Création d'une nouvelle liste de tâches qui va contenir les tâches du template
            var templateTodos = new List<Todo>();

            // Récupérer les tâches du template
            var newTemplateTodo = new Todo();

            var getTemplate = await _httpClient.GetAsync("http://localhost:6000/template/" + quoteModel.Templateid);

            var deserializedTemplate = JsonConvert.DeserializeObject<Template>(
                await getTemplate.Content.ReadAsStringAsync());

            var templateModel = _mapper.Map<Template>(deserializedTemplate);

            quoteModel.Templatename = templateModel.Name;

            // Récupérer les tâches du template choisi
            for(var j=0; j < quoteModel.Templatetodoid.Length; j++)
            {
                var newTodo = new Todo();

                var getTodo = await _httpClient.GetAsync("http://localhost:7000/todo/" + quoteModel.Templatetodoid[j]);

                var deserializedTemplateTodo = JsonConvert.DeserializeObject<CreateTodoDto>(
                    await getTodo.Content.ReadAsStringAsync());

                var todoModel = _mapper.Map<Todo>(deserializedTemplateTodo);
                
                newTodo.Id = quoteModel.Templatetodoid[j];
                newTodo.Name = todoModel.Name;
                newTodo.Type = todoModel.Type;
                newTodo.Description = todoModel.Description;    
                newTodo.Skillid = todoModel.Skillid;  
                newTodo.skill = todoModel.skill;  
                newTodo.Time = todoModel.Time;                                
           
                templateTodos.Add(newTodo);
            }

            foreach(var todo in templateModel.todos)
            {
                newTemplateTodo = todo;
                         
                todos.Add(newTemplateTodo);
            }
            // Tâches du template récupérées

            // Récupérer les tâches choisies par le client et non présentes dans le template
            for(var j=0; j < quoteModel.Todosidoutoftemplate.Length; j++)
            {
                var newTodo = new Todo();

                var getTodo = await _httpClient.GetAsync("http://localhost:7000/todo/" + quoteModel.Todosidoutoftemplate[j]);

                var deserializedTodo = JsonConvert.DeserializeObject<CreateTodoDto>(
                    await getTodo.Content.ReadAsStringAsync());

                var todoModel = _mapper.Map<Todo>(deserializedTodo);
                
                newTodo.Id = quoteModel.Todosidoutoftemplate[j];
                newTodo.Name = todoModel.Name;
                newTodo.Type = todoModel.Type;
                newTodo.Description = todoModel.Description;    
                newTodo.Skillid = todoModel.Skillid;  
                newTodo.skill = todoModel.skill;  
                newTodo.Time = todoModel.Time;         
                newTodo.Quoteid = quoteModel.Id;         
           
                todos.Add(newTodo);
            }

            quoteModel.todos = todos;
            // Tâches choisies par le client récupérées

            quoteModel.Status = "En attente";

            await _repository.UpdateQuoteById(id, Quote);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuoteById(string id)
        {
            var quote = _repository.GetQuoteById(id);
            if(quote != null)
            {
                await _repository.DeleteQuoteById(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("valid/{id}", Name = "ValidationQuoteById")]
        public async Task<IActionResult> ValidationQuoteById(string id)
        {
            var quote = await _repository.GetQuoteById(id);
    
            if(quote == null)
            {
                return NotFound("Aucun devis n'a été trouvé.");
            }
            else
            {      
                quote.Status = "Accepté";

                await _repository.UpdateQuoteById(id, quote);
                
                return Ok();
            }
        }

        [HttpPut("accepted/{id}", Name = "UpdateQuoteAcceptedById")]
        public async Task<IActionResult> UpdateQuoteAcceptedById(string id, [FromBody] Quote quote)
        {
            var quoteModel = await _repository.GetQuoteById(id);
    
            if(quoteModel == null)
            {
                return NotFound("Aucun devis n'a été trouvé.");
            }
            else
            {      
                quoteModel.Status = "Accepté - En cours de développement";

                await _repository.UpdateQuoteById(id, quoteModel);
                
                return Ok();
            }
        }

        [HttpPut("finished/{id}", Name = "UpdateQuoteFinishedById")]
        public async Task<IActionResult> UpdateQuoteFinishedById(string id, [FromBody] Quote quote)
        {
            var quoteModel = await _repository.GetQuoteById(id);
    
            if(quoteModel == null)
            {
                return NotFound("Aucun devis n'a été trouvé.");
            }
            else
            {      
                quoteModel.Status = "Terminé";

                await _repository.UpdateQuoteById(id, quoteModel);
                
                return Ok();
            }
        }
    }
}