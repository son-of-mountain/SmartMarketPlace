using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using SmartMarketplace.DTO;
using SmartMarketplace.Service;
using SmartMarketplace.Service.Interface;

namespace SmartMarketplace.Controllers;


[ApiController]
[Route("api/v1/jobs")]
public class JobController : ControllerBase
{
  readonly IGroqService _groqService;
  readonly IJobService _jobService;
  public JobController(IGroqService groqService , IJobService jobService)
  {
    _groqService = groqService;
    _jobService = jobService;
  }

  [HttpPost("create-from-prompt")]
  [ProducesResponseType(typeof(JobDto), 200)]
  [ProducesResponseType(500)]
  public async Task<ActionResult<JobDto>> CreateJobFromPrompt([FromBody] PromtRequest req)
  {
    if (string.IsNullOrWhiteSpace(req?.text))
    {
      return BadRequest("The request text cannot be empty.");
    }

    try
    {
      var jobDto = await _groqService.CreateJobFromPromptAsync(req);
      return Ok(jobDto);
    }
    catch (Exception ex)
    {
      // Log the exception ex
      return StatusCode(500, "An error occurred while processing your request.");
    }
  }

  [HttpGet()]
  public async Task<IActionResult> GetJobAll()
  {
    var jobs = await _jobService.GetAll();
    return Ok(jobs);
  }


  [HttpPost]
  public async Task<IActionResult> AddJob([FromBody] CreateJobRequest request)
  {
    var job = await _jobService.AddJobAsync(request);
    return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetJob(int id)
  {
    var job = await _jobService.GetJobByIdAsync(id);
    if (job == null) return NotFound();
    return Ok(job);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteJob(int id)
  {
    var result = await _jobService.DeleteJobAsync(id);
    if (!result) return NotFound();
    return NoContent();
  }


}
