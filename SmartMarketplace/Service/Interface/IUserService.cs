using SmartMarketplace.Models;
using SmartMarketplace.DTO;
namespace SmartMarketplace.Service.Interface;

public interface IUserService
{
  public Task<IEnumerable<User>> GetAll();

  public Task<User> Delete(User user);

  public Task<User?> GetByEmail(string email);

  public Task<User?> GetById(int id);

  public bool CheckPassword(string hashPassword, string password);
  Task<User?> UpdateUserAsync(int id, UserEditRequest userDto);
  Task<User> CreateUserAsync(RegisterRequest request);


}
