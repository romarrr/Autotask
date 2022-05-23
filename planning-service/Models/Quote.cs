using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlanningService.Models
{
    public class Quote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("clientid")]
        public string Clientid { get; set; } = String.Empty;

        [BsonElement("client")]
        public Client? client { get; set; }

        [BsonElement("templateid")]
        public string Templateid { get; set; } = String.Empty;

        [BsonElement("templatename")]
        public string Templatename { get; set; } = String.Empty;

        [BsonElement("templatetodoid")]
        public string[] Templatetodoid { get; set; } = new string[100];

        [BsonElement("todosidoutoftemplate")]
        public string[] Todosidoutoftemplate { get; set; } = new string[100];
        
        [BsonElement("todos")]
        public ICollection<Todo> todos { get; set; } = new List<Todo>();

        [BsonElement("status")]
        public string Status { get; set; } = String.Empty;

        [BsonElement("logo")]
        public string Logo { get; set; } = String.Empty;

    }
}