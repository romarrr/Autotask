using PlanningService.Models;

namespace PlanningService.Dtos
{
    public class ReadPlanningDto
    {
        public string Id { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public string Role { get; set; } = String.Empty;
        public ICollection<Todo> todos { get; set; } = new List<Todo>();
        public ICollection<User> users { get; set; } = new List<User>();
    }
}