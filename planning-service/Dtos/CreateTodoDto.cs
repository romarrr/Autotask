using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using PlanningService.Models;

namespace PlanningService.Dtos
{
    public class CreateTodoDto
    {   
        [Required]
        public string Originalid { get; set; } = String.Empty;

        [Required]
        public string Quoteid { get; set; } = String.Empty;

        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Type { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Required]
        public int Time { get; set; }

        [Required]
        public string Status { get; set; } = String.Empty;

        [Required]
        public string Skillid { get; set; } = String.Empty;

        public Skill? skill { get; set; }

        [Required]
        public string Userid { get; set; } = String.Empty;

        public User? user { get; set; }
    }
}