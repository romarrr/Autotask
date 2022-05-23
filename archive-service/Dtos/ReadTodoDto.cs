using ArchiveService.Models;

namespace ArchiveService.Dtos
{
    public class ReadTodoDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public string Type { get; set; } = String.Empty;

        public string Description { get; set; } = String.Empty;

        public string Time { get; set; } = String.Empty;

        public string SkillId { get; set; } = String.Empty;

        public Skill? skill { get; set; }

        public string Status { get; set; } = String.Empty;
    }
}