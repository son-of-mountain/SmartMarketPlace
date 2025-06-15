using System.Text.Json.Nodes;
using SmartMarketplace.DTO;

namespace SmartMarketplace.Service.Interface;

public interface IGroqService
{

  public Task<JobDto> CreateJobFromPromptAsync(PromtRequest req);


}
