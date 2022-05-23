using System.ComponentModel.DataAnnotations;
using PlanningService.Models;

namespace PlanningService.Dtos
{
    public class UpdatePlanningDto
    {     
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Role { get; set; } = String.Empty;

        [Required]
        public ICollection<Todo> todos { get; set; } = new List<Todo>();

        [Required]
        public ICollection<User> users { get; set; } = new List<User>();
    }
}