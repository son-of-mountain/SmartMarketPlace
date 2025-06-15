using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SmartMarketplace.DTO;

public class LoginRequest
{
  [JsonPropertyName("email")]
  [Required]
  [EmailAddress]
  public string Email { get; set; }


  [JsonPropertyName("password")]
  [Required]
  [MinLength(8)]
  public string Password { get; set; }
}
