using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClientService.Models
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

        [BsonElement("address")]
        public string Address { get; set; } = String.Empty;

        [BsonElement("postalcode")]
        public string Postalcode { get; set; } = String.Empty;

        [BsonElement("town")]
        public string Town { get; set; } = String.Empty;

        [BsonElement("phone")]
        public string Phone { get; set; } = String.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = String.Empty;

        [BsonElement("company")]
        public string Company { get; set; } = String.Empty;

        [BsonElement("logo")]
        public string Logo { get; set; } = String.Empty;
    }
}