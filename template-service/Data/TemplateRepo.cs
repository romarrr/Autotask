using TemplateService.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using TemplateService.Dtos;

namespace TemplateService.Data 
{
    public class TemplateRepo : ITemplateRepo 
    {
        private readonly AppDbContext _context;
        public TemplateRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Template>> GetAllTemplates() 
        {
            await _context.todo.Find(_ => true).ToListAsync();
            return await _context.template.Find(_ => true).ToListAsync();
        }

        public Task<Template> GetTemplateById(string id) 
        {
            return _context.template.Find(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task CreateTemplate(Template template)
        {
            if(template != null)
            {
                await _context.template.InsertOneAsync(template); 
            }
        }

        public async Task<Template> UpdateTemplateById(string id, Template template)
        {
            return await _context.template.FindOneAndReplaceAsync(c => c.Id == id,
                new Template { Id = id, Name = template.Name, Description = template.Description, Time = template.Time, Templatetodoid = template.Templatetodoid, Logo = template.Logo, todos = template.todos });
        }

        public async Task DeleteTemplateById(string id)
        {
            await _context.template.DeleteOneAsync(c => c.Id == id);
        }
        
    }
}