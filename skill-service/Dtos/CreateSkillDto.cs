using System.ComponentModel.DataAnnotations;

namespace SkillService.Dtos
{
    public class CreateSkillDto
    {
        [Required]
        public string Specializationname { get; set; } = String.Empty;

        [Required]
        public string Experiencename { get; set; } = String.Empty;
    }
}