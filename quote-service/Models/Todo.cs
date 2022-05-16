using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QuoteService.Models
{
    public class Todo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("type")]
        public string Type { get; set; } = String.Empty;

        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;

        [BsonElement("time")]
        public string Time { get; set; } = String.Empty;

        [BsonElement("status")]
        public string Status { get; set; } = "A Faire";

        [BsonElement("skillid")]
        public string Skillid { get; set; } = String.Empty;

        [BsonElement("skill")]
        public Skill? skill { get; set; }

        [BsonElement("quoteid")]
        public string Quoteid { get; set; } = String.Empty;

        [BsonElement("logo")]
        public string Logo { get; set; } = String.Empty;
    }
}