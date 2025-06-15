using System.ComponentModel.DataAnnotations;
using SmartMarketplace.Models;

namespace SmartMarketplace.DTO;

public class LoginResponse
{
  [Required]
  public User User { get; set; }

  public string token { get; set; }

  public string ErrorMessage { get; set; }

}
