using System.ComponentModel.DataAnnotations;

namespace ProjectService.Dtos
{
    public class CreateProjectDto
    {
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

        public string Logo { get; set; } = String.Empty;
        
    }
}