// DTO/UserEditRequest.cs
using SmartMarketplace.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartMarketplace.DTO
{
  public class UserEditRequest
  {
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    // The frontend sends 0 for Admin, 1 for User
    [Required]
    public Roles Role { get; set; }
  }
}
