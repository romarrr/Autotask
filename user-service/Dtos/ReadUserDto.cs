using UserService.Models;

namespace UserService.Dtos
{
    public class ReadUserDto
    {
        public string Id { get; set; } = String.Empty;

        public string Role { get; set; } = String.Empty;
        
        public string FirstName { get; set; } = String.Empty;

        public string LastName { get; set; } = String.Empty;

        public string Address { get; set; } = String.Empty;

        public string PostalCode { get; set; } = String.Empty;

        public string Town { get; set; } = String.Empty;

        public string Phone { get; set; } = String.Empty;

        public string Email { get; set; } = String.Empty;

        public string[] Skillsid { get; set; } = new string[100];

        public ICollection<Skill> skills { get; set; } = new List<Skill>();
        
        public string Password { get; set; } = String.Empty;

        public string Photo { get; set; } = String.Empty;
    }
}