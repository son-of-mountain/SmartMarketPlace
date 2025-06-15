using System.ComponentModel.DataAnnotations;

namespace SmartMarketplace.DTO;

public class RegisterRequest
{
  [Required]
  public String FirstName { get; set; } = string.Empty;
  [Required]
  public String LastName { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set;}

  [Required]
  [MinLength(6)]
  public string Password { get; set; }
}
