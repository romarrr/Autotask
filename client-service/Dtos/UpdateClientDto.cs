using System.ComponentModel.DataAnnotations;

namespace ClientService.Dtos
{
    public class UpdateClientDto
    {     
        [Required]
        public string Firstname { get; set; } = String.Empty;

        [Required]
        public string Lastname { get; set; } = String.Empty;

        [Required]
        public string Address { get; set; } = String.Empty;

        [Required]
        public string Postalcode { get; set; } = String.Empty;

        [Required]
        public string Town { get; set; } = String.Empty;

        [Required]
        public string Phone { get; set; } = String.Empty;

        [Required]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string Company { get; set; } = String.Empty;

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}