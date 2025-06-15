using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace SmartMarketplace.Models;

public class User : IdentityUser
{
  [Key]
  public int Id { get; set; }
  [Required]
  public String FirstName { get; set; } = string.Empty;
  [Required]
  public String LastName { get; set; } = string.Empty;

  [Required]
  [EmailAddress]
  public string Email { get; set;}

  public Roles Role { get; set; } = Roles.User;

  [Required]
  [JsonIgnore]

  [MinLength(8)]
  public string Password { get; set; }
}

public enum Roles
{
  Admin = 0,
  User = 1
}
