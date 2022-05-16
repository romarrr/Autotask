using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UserService.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("role")]
        public string Role { get; set; } = String.Empty;

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

        [BsonElement("skillsid")]
        public string[] Skillsid { get; set; } = new string[100];

        [BsonElement("skills")]
        public ICollection<Skill> skills { get; set; } = new List<Skill>();

        [BsonElement("password")]
        public string Password { get; set; } = String.Empty;

        [BsonElement("photo")]
        public string Photo { get; set; } = String.Empty;
    }
}