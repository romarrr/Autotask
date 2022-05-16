using System.ComponentModel.DataAnnotations;
using QuoteService.Models;

namespace QuoteService.Dtos
{
    public class UpdateQuoteDto
    {     
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Clientid { get; set; } = String.Empty;

        [Required]
        public Client? client { get; set; }

        [Required]
        public string Templateid { get; set; } = String.Empty;

        public string Templatename { get; set; } = String.Empty;

        public string[] Templatetodoid { get; set; } = new string[100];

        public string[] Todosidoutoftemplate { get; set; } = new string[100];
        
        public ICollection<Todo> todos { get; set; } = new List<Todo>();

        public string Status { get; set; } = String.Empty;

        [Required]
        public string Logo { get; set; } = String.Empty;
    }
}