namespace PlanningService.Dtos
{
    public class ReadTodoDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public string Experience { get; set; } = String.Empty;

        public string Description { get; set; } = String.Empty;

        public string Time { get; set; } = String.Empty;

        public string Status { get; set; } = "A Faire";

        public string Specialization { get; set; } = String.Empty;

        public string Todo { get; set; } = String.Empty;
    }
}