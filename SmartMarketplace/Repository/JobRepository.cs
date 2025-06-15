using Microsoft.EntityFrameworkCore;
using SmartMarketplace.Data;
using SmartMarketplace.Models;
using SmartMarketplace.Repository.Interface;

namespace SmartMarketplace.Repository;

public class JobRepository : IJobRepository
{
  private readonly AppDbContext _context;

  public JobRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<Job> AddJobAsync(Job job)
  {
    _context.Jobs.Add(job);
    await _context.SaveChangesAsync();
    return job;
  }

  public async Task<bool> DeleteJobAsync(int jobId)
  {
    var job = await _context.Jobs.FindAsync(jobId);
    if (job == null) return false;

    _context.Jobs.Remove(job);
    await _context.SaveChangesAsync();
    return true;
  }

  public async Task<Job?> GetJobByIdAsync(int jobId)
  {
    return await _context.Jobs.FindAsync(jobId);
  }

  public async Task<IEnumerable<Job>> GetAll()
  {
    return await _context.Jobs.ToListAsync();
  }
}
