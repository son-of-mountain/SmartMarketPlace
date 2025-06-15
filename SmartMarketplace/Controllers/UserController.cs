using Microsoft.AspNetCore.Mvc;
using SmartMarketplace.DTO;
using SmartMarketplace.Models;
using SmartMarketplace.Repository.Interface;
using SmartMarketplace.Service.Interface;

namespace SmartMarketplace.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        // GET: api/v1/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetAll();
            return Ok(users);
        }

        // GET: api/v1/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userService.GetById(id);
            if (user == null)
                return NotFound(new { error = "User not found" });

            return Ok(user);
        }

        // PUT: api/v1/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserEditRequest userDto)
        {
          // The service layer will handle the logic of finding and updating the user
          var updatedUser = await _userService.UpdateUserAsync(id, userDto);

          if (updatedUser == null)
          {
            // The service returned null, meaning the user was not found
            return NotFound(new { error = "User not found" });
          }

          // Return the updated user object, which the frontend can use to update its state
          return Ok(updatedUser);
        }

        // DELETE: api/v1/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = await _userService.GetById(id);
            if (existingUser == null)
                return NotFound(new { error = "User not found" });

            var deletedUser = await _userService.Delete(existingUser);
            return Ok(deletedUser);
        }


    }
}
