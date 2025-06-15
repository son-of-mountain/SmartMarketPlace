using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartMarketplace.Models;

public enum JobType
{
  Remote,
  Hybrid,
  OnSite
}

public class Job
{
  [Key]
  public int Id { get; set; }

  [Required]
  [StringLength(100)]
  public string Title { get; set; }

  [Required]
  [StringLength(2000)]
  public string Description { get; set; }

  [Required]
  public JobType Type { get; set; }  // Mostly Remote for Freelance, but allow all.

  [Required]
  [Range(0, double.MaxValue)]
  [Column(TypeName = "decimal(18,2)")]
  public decimal Salary { get; set; }  // Either total project fee or hourly rate

  [Required]
  [StringLength(50)]
  public string Duration { get; set; }  // e.g., "2 weeks", "1 month", "Per task"

  [Required]
  [StringLength(100)]
  public string City { get; set; }  // Client location; can default to "Remote"

  [StringLength(1000)]
  public string? Deliverables { get; set; }  // Optional: e.g., "Landing page, API"

  public DateTime? Deadline { get; set; }  // Optional for fixed-time projects

  public DateTime PostedAt { get; set; } = DateTime.UtcNow;
}
