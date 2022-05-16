using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QuoteService.Models
{
    public class Client
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("firstname")]
        public string Firstname { get; set; } = String.Empty;

        [BsonElement("lastname")]
        public string Lastname { get; set; } = String.Empty;

        [BsonElement("company")]
        public string Company { get; set; } = String.Empty;
    }
}