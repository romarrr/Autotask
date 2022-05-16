using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateService.Models
{
    public class Template
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;

        [BsonElement("time")]
        public string Time { get; set; } = String.Empty;

        [BsonElement("logo")]
        public string Logo { get; set; } = String.Empty;

        public string[] Templatetodoid { get; set; } = new string[100];
        
        public ICollection<Todo> todos { get; set; } = new List<Todo>();
    }
}