using System.ComponentModel.DataAnnotations;
using PlanningService.Models;

namespace PlanningService.Dtos
{
    public class CreatePlanningDto
    {
        [Required]
        public string Name { get; set; } = String.Empty;

        public ICollection<User> users { get; set; } = new List<User>();
    }
}