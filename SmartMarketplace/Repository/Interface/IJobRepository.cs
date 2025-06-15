using SmartMarketplace.Models;

namespace SmartMarketplace.Repository.Interface;

public interface IJobRepository
{
  Task<Job> AddJobAsync(Job job);
  Task<bool> DeleteJobAsync(int jobId);
  Task<Job?> GetJobByIdAsync(int jobId);
  Task<IEnumerable<Job>> GetAll();
}
