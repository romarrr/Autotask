using System.Collections.Generic;
using TemplateService.Dtos;
using TemplateService.Models;

namespace TemplateService.Data 
{
    public interface ITemplateRepo 
    {
        Task<IEnumerable<Template>> GetAllTemplates();
        Task<Template> GetTemplateById(string id);
        Task CreateTemplate(Template template);
        Task<Template> UpdateTemplateById(string id, Template template);
        Task DeleteTemplateById(string id);
    }
}