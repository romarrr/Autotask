using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectService.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("startdate")]
        public DateTime Startdate { get; set; } 

        [BsonElement("enddate")]
        public DateTime Enddate { get; set; }

        [BsonElement("type")]
        public string Type { get; set; } = String.Empty;

        [BsonElement("clientid")]
        public string Clientid { get; set; } = String.Empty;

        [BsonElement("client")]
        public Client? client { get; set; }

        [BsonElement("logo")]
        public string Logo { get; set; } = String.Empty;
    }
}