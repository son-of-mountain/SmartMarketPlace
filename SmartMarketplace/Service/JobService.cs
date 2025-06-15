using SmartMarketplace.DTO;
using SmartMarketplace.Models;
using SmartMarketplace.Repository.Interface;
using SmartMarketplace.Service.Interface;

namespace SmartMarketplace.Service;

public class JobService : IJobService
{
  private readonly IJobRepository _repository;

  public JobService(IJobRepository repository)
  {
    _repository = repository;
  }

  public async Task<Job> AddJobAsync(CreateJobRequest request)
  {
    var job = new Job
    {
      Title = request.Title,
      Description = request.Description,
      Type = request.Type,
      Salary = request.Salary,
      Duration = request.Duration,
      City = request.City,
      Deliverables = request.Deliverables,
      Deadline = request.Deadline,
      PostedAt = DateTime.UtcNow
    };

    return await _repository.AddJobAsync(job);
  }

  public async Task<bool> DeleteJobAsync(int jobId)
  {
    return await _repository.DeleteJobAsync(jobId);
  }


  public async Task<Job?> GetJobByIdAsync(int id)
  {
    return await _repository.GetJobByIdAsync(id);
  }

  public async Task<IEnumerable<Job>> GetAll()
  {
    return await _repository.GetAll();
  }
}
