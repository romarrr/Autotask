using System.ComponentModel.DataAnnotations;
using UserService.Models;

namespace UserService.Dtos
{
    public class CreateUserDto
    {
        [Required]
        public string Role { get; set; } = String.Empty;

        [Required]
        public string FirstName { get; set; } = String.Empty;

        [Required]
        public string LastName { get; set; } = String.Empty;

        [Required]
        public string Address { get; set; } = String.Empty;

        [Required]
        public string PostalCode { get; set; } = String.Empty;

        [Required]
        public string Town { get; set; } = String.Empty;

        [Required]
        public string Phone { get; set; } = String.Empty;

        [Required]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string[] Skillsid { get; set; } = new string[100];

        [Required]
        public ICollection<Skill> skills { get; set; } = new List<Skill>();

        [Required]
        public string Password { get; set; } = String.Empty;

        public string Photo { get; set; } = String.Empty;
    }
}