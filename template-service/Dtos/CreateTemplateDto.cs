using System.ComponentModel.DataAnnotations;
using TemplateService.Models;

namespace TemplateService.Dtos
{
    public class CreateTemplateDto
    {
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Required]
        public string Time { get; set; } = String.Empty;

        public string Logo { get; set; } = String.Empty;

        public string[] Templatetodoid { get; set; } = new string[100];

        public ICollection<Todo> todos { get; set; } = new List<Todo>();
    }
}