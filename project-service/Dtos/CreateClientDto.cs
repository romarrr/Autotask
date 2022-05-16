using System.ComponentModel.DataAnnotations;

namespace ProjectService.Dtos
{
    public class CreateClientDto
    {
        [Required]
        public string Id { get; set; } = String.Empty;

        [Required]
        public string FirstName { get; set; } = String.Empty;

        [Required]
        public string LastName { get; set; } = String.Empty;

        [Required]
        public string Company { get; set; } = String.Empty;
    }
}