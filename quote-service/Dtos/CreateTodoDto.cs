using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using QuoteService.Models;

namespace QuoteService.Dtos
{
    public class CreateTodoDto
    {   
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Type { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Required]
        public string Time { get; set; } = String.Empty;

        [Required]
        public string Status { get; set; } = "A Faire";

        [Required]
        public string Skillid { get; set; } = String.Empty;

        [Required]
        public Skill? skill { get; set; }

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}