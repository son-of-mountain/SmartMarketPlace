using System.Text.Json.Serialization;

namespace SmartMarketplace.DTO;

// This DTO matches the JSON structure we expect from the AI.
// We use JsonPropertyName to handle potential case mismatches (e.g., "id" vs "Id").
public class JobDto
{
  [JsonPropertyName("Id")]
  public int Id { get; set; }

  [JsonPropertyName("Title")]
  public string Title { get; set; }

  [JsonPropertyName("Description")]
  public string Description { get; set; }

  [JsonPropertyName("Type")]
  public string Type { get; set; } // AI returns a string like "Remote"

  [JsonPropertyName("Salary")]
  public decimal Salary { get; set; }

  [JsonPropertyName("Duration")]
  public string Duration { get; set; }

  [JsonPropertyName("City")]
  public string City { get; set; }

  [JsonPropertyName("Deliverables")]
  public string? Deliverables { get; set; }

  [JsonPropertyName("Deadline")]
  public DateTime? Deadline { get; set; }

  [JsonPropertyName("PostedAt")]
  public DateTime PostedAt { get; set; }
}
