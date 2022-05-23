using ArchiveService.Models;

namespace ArchiveService.Dtos
{
    public class ReadArchiveDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public DateTime Date { get; set; } 

        public string Type { get; set; } = String.Empty;

        public string Logo { get; set; } = String.Empty;
    }
}