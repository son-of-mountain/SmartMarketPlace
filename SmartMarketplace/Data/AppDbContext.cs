using Microsoft.EntityFrameworkCore;
using SmartMarketplace.Models;
namespace SmartMarketplace.Data;

public class AppDbContext:DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
  {
  }

  public DbSet<User> Users { get; set; }
  public DbSet<Job> Jobs { get; set; }


}
