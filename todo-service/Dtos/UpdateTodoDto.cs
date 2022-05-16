using System.ComponentModel.DataAnnotations;
using TodoService.Models;

namespace TodoService.Dtos
{
    public class UpdateTodoDto
    {     
        [Required]
        public string Id { get; set; } = String.Empty;

        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Required]
        public string Time { get; set; } = String.Empty;

        [Required]
        public string SkillId { get; set; } = String.Empty;

        [Required]
        public Skill? skill { get; set; }

        [Required]
        public string Status { get; set; } = "A Faire";

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}