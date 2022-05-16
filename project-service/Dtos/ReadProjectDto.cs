using ProjectService.Models;

namespace ProjectService.Dtos
{
    public class ReadProjectDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public DateTime StartDate { get; set; } 

        public DateTime EndDate { get; set; }

        public string Type { get; set; } = String.Empty;

        public string ClientId { get; set; } = String.Empty;

        public Client? client { get; set; }

        public string Logo { get; set; } = String.Empty;
    }
}