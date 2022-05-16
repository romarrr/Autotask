using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QuoteService.Models
{
    public class Planning
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        public string[] Todosid { get; set; } = new string[100000];

        public ICollection<Todo> todos { get; set; } = new List<Todo>();
    }
}