using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SmartMarketplace.DTO;
using SmartMarketplace.Models;
using SmartMarketplace.Service.Interface;

namespace SmartMarketplace.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _config;

    public AuthController(IUserService userService, IConfiguration config)
    {
        _userService = userService;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var checkUser = await _userService.GetByEmail(request.Email);
        if (checkUser == null)
        {
            return Unauthorized(new { error = "Invalid email or password" });
        }

        if (!_userService.CheckPassword(checkUser.Password, request.Password))
        {
            return Unauthorized(new { error = "Invalid email or password" });
        }

        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, checkUser.Email),
            new Claim(ClaimTypes.Role, checkUser.Role.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

        var response = new LoginResponse
        {
            User = checkUser,
            token = jwtToken,
            ErrorMessage = string.Empty
        };

        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
      try
      {
        // The service now handles all the logic. The controller just calls it.
        var createdUser = await _userService.CreateUserAsync(request);

        // On success, return a 201 Created status with the new user's location and data.
        // The user object returned here will NOT have the password hash due to the [JsonIgnore] attribute.
        return CreatedAtAction(nameof(Register), new { id = createdUser.Id }, createdUser);
      }
      catch (ArgumentException ex)
      {
        // Catch the specific exception thrown by the service for duplicate emails.
        return BadRequest(new { error = ex.Message });
      }
      catch (Exception ex)
      {
        // Catch any other unexpected errors
        return StatusCode(500, new { error = "An internal server error occurred." });
      }
    }

}
