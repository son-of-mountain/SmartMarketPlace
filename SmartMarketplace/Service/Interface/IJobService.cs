using SmartMarketplace.DTO;
using SmartMarketplace.Models;

namespace SmartMarketplace.Service.Interface;

public interface IJobService
{
  Task<Job> AddJobAsync(CreateJobRequest request);
  Task<bool> DeleteJobAsync(int jobId);
  Task<Job?> GetJobByIdAsync(int id);

  Task<IEnumerable<Job>> GetAll();
}
