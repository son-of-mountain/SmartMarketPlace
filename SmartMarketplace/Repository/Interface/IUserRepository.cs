using SmartMarketplace.DTO;
using SmartMarketplace.Models;

namespace SmartMarketplace.Repository.Interface;

public interface IUserRepository
{
   Task<User?> GetByEmailAsync(string email);


   Task<User?> GetByIdAsync(int id);

  Task<IEnumerable<User>> GetAllAsync();

  Task<User> CreateAsync(User user);
  Task<User> UpdateAsync(User user);

   Task<User> delete(User user);


}
