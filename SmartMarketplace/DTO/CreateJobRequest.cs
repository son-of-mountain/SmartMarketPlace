using SmartMarketplace.Models;

namespace SmartMarketplace.DTO;

public class CreateJobRequest
{
  public string Title { get; set; }
  public string Description { get; set; }
  public JobType Type { get; set; }
  public decimal Salary { get; set; }
  public string Duration { get; set; }
  public string City { get; set; }
  public string? Deliverables { get; set; }
  public DateTime? Deadline { get; set; }
}
