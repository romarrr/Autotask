using System.ComponentModel.DataAnnotations;

namespace ArchiveService.Dtos
{
    public class CreateArchiveDto
    {
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public DateTime Date { get; set; } 

        [Required]
        public string Type { get; set; } = String.Empty;

        public string Logo { get; set; } = String.Empty;
        
    }
}