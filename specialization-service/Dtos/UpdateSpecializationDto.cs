using System.ComponentModel.DataAnnotations;

namespace SpecializationService.Dtos
{
    public class UpdateSpecializationDto
    {     
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}