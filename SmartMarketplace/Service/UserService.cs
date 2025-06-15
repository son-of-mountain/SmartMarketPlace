using SmartMarketplace.Models;
using SmartMarketplace.Repository.Interface;
using SmartMarketplace.Service.Interface;
using BCrypt.Net;
using SmartMarketplace.DTO;

namespace SmartMarketplace.Service;

public class UserService : IUserService
{
  private readonly IUserRepository _repository;

  public UserService(IUserRepository repository)
  {
    _repository = repository;
  }

  public async Task<IEnumerable<User>> GetAll()
  {
    return await _repository.GetAllAsync();
  }

  public async Task<User> CreateUserAsync(RegisterRequest request)
  {
    // 1. Check if user already exists
    var existingUser = await _repository.GetByEmailAsync(request.Email);
    if (existingUser != null)
    {
      // Throwing a specific exception is better for handling in the controller
      throw new ArgumentException("Email is already in use.");
    }

    // 2. Hash the password
    string hashPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

    // 3. Create the user model
    var user = new User
    {
      FirstName = request.FirstName,
      LastName = request.LastName,
      Email = request.Email,
      Password = hashPassword, // Store the HASH, not the plaintext password
      Role = Roles.User // All new registrations are standard users
    };

    // 4. Call the repository to save the new user
    return await _repository.CreateAsync(user);
  }


  public async Task<User?> UpdateUserAsync(int id, UserEditRequest userDto)
  {
    var existingUser = await _repository.GetByIdAsync(id);
    if (existingUser == null)
    {
      return null; // User not found
    }

    // Map properties from the DTO to the existing user entity
    existingUser.FirstName = userDto.FirstName;
    existingUser.LastName = userDto.LastName;
    existingUser.Email = userDto.Email;
    existingUser.Role = userDto.Role;

    return await _repository.UpdateAsync(existingUser);
  }

  public async Task<User> Delete(User user)
  {
    return await _repository.delete(user);
  }

  public async Task<User?> GetByEmail(string email)
  {
    return await _repository.GetByEmailAsync(email);
  }

  public async Task<User?> GetById(int id)
  {
    return await _repository.GetByIdAsync(id);
  }

  public bool CheckPassword(string hashPassword, string password)
  {
    bool isRightPassword = BCrypt.Net.BCrypt.Verify(password, hashPassword);
    return isRightPassword;
  }
}
