using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using PlanningService.Models;

namespace PlanningService.Dtos
{
    public class CreateTodoDto
    {   
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Experience { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Required]
        public string Time { get; set; } = String.Empty;

        [Required]
        public string Status { get; set; } = "A Faire";

        [Required]
        public string Specialization { get; set; } = String.Empty;

        [Required]
        public string Userid { get; set; } = String.Empty;

        public User? user { get; set; }
    }
}