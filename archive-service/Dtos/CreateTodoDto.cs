using System.ComponentModel.DataAnnotations;

namespace ArchiveService.Dtos
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
        public string SkillId { get; set; } = String.Empty;

        public string Status { get; set; } = String.Empty;

        public string Logo { get; set; } = String.Empty;
    }
}