using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SpecializationService.Models
{
    public class Specialization
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;

        [BsonElement("logo")]
        public string Logo { get; set; } = String.Empty;
    }
}