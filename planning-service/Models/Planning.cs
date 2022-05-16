using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlanningService.Models
{
    public class Planning
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        public ICollection<Todo> todos { get; set; } = new List<Todo>();

        public ICollection<User> users { get; set; } = new List<User>();
    }
}