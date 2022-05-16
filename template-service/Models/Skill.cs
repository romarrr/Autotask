using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateService.Models
{
    public class Skill
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("specializationname")]
        public string Specializationname { get; set; } = String.Empty;

        [BsonElement("experiencename")]
        public string Experiencename { get; set; } = String.Empty;
    }
}