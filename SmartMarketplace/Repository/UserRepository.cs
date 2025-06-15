using Microsoft.EntityFrameworkCore;
using SmartMarketplace.Data;
using SmartMarketplace.Models;
using SmartMarketplace.Repository.Interface;

namespace SmartMarketplace.Repository;

public class UserRepository : IUserRepository
{
  private readonly AppDbContext context;

  public UserRepository(AppDbContext context)
  {
    this.context = context;
  }

  public async Task<User?> GetByEmailAsync(string email)
  {
    return await context.Users.FirstOrDefaultAsync(u => u.Email == email);

  }

  public  async Task<User?> GetByIdAsync(int id)
  {
    return await context.Users.FirstOrDefaultAsync(u => u.Id == id);
  }

  public async Task<IEnumerable<User>> GetAllAsync()
  {
    return await context.Users.ToListAsync();
  }

  public async Task<User> CreateAsync(User user)
  {
    context.Users.Add(user);
    await context.SaveChangesAsync();
    return user;
  }

  public async Task<User> UpdateAsync(User user)
  {
    context.Users.Update(user);
    await context.SaveChangesAsync();
    return user;
  }

  public async Task<User> delete(User user)
  {
    context.Users.Remove(user);
    await context.SaveChangesAsync();
    return user;
  }
}
