using System.ComponentModel.DataAnnotations;
using ProjectService.Models;

namespace ProjectService.Dtos
{
    public class UpdateProjectDto
    {     
        [Required]
        public string Id { get; set; } = String.Empty;

        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public DateTime StartDate { get; set; } 

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string Type { get; set; } = String.Empty;

        [Required]
        public string ClientId { get; set; } = String.Empty;

        [Required]
        public Client? client { get; set; }

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}