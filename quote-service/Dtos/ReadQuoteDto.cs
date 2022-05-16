using QuoteService.Models;

namespace QuoteService.Dtos
{
    public class ReadQuoteDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public string Clientid { get; set; } = String.Empty;

        public Client? client { get; set; }

        public string Templateid { get; set; } = String.Empty;

        public string Templatename { get; set; } = String.Empty;

        public string[] Templatetodoid { get; set; } = new string[100];

        public string[] Todosidoutoftemplate { get; set; } = new string[100];
        
        public ICollection<Todo> todos { get; set; } = new List<Todo>();

        public string Status { get; set; } = String.Empty;

        public string Logo { get; set; } = String.Empty;
    }
}