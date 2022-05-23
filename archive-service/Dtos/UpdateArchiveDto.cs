using System.ComponentModel.DataAnnotations;
using ArchiveService.Models;

namespace ArchiveService.Dtos
{
    public class UpdateArchiveDto
    {     
        [Required]
        public string Id { get; set; } = String.Empty;

        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public DateTime Date { get; set; } 

        [Required]
        public string Type { get; set; } = String.Empty;

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}