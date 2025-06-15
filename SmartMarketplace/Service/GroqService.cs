using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Options;
using SmartMarketplace.Config;
using SmartMarketplace.DTO;
using SmartMarketplace.Service.Interface;

namespace SmartMarketplace.Service;

public class GroqService : IGroqService
{
    private readonly HttpClient _httpClient;
    private readonly GroqOptions _options;
    private readonly JsonSerializerOptions _jsonSerializerOptions;

    public GroqService(HttpClient httpClient, IOptions<GroqOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
        // Options for deserializing the AI's JSON string content.
        _jsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
    }

    // PUBLIC async method to orchestrate the job creation
    public async Task<JobDto> CreateJobFromPromptAsync(PromtRequest req)
    {
        var requestBody = BuildJobScopingRequest(req.text);
        var jsonString = requestBody.ToJsonString();

        var httpRequest = new HttpRequestMessage(HttpMethod.Post, _options.BaseUrl);
        httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.ApiKey);
        httpRequest.Content = new StringContent(jsonString, Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(httpRequest);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new ApplicationException($"Groq API error: {response.StatusCode}, Content: {errorContent}");
        }

        var responseContent = await response.Content.ReadAsStringAsync();

        // Step 1: Deserialize the main Groq API response
        var parsedResponse = JsonSerializer.Deserialize<GroqResponseDto>(responseContent);
        var aiJsonContent = parsedResponse?.Choices?.FirstOrDefault()?.Message?.Content;

        if (string.IsNullOrWhiteSpace(aiJsonContent))
        {
            throw new ApplicationException("AI returned an empty or invalid content string.");
        }

        // Step 2: Deserialize the JSON *string* from the AI's content field into our JobDto
        var jobDto = JsonSerializer.Deserialize<JobDto>(aiJsonContent, _jsonSerializerOptions);

        return jobDto;
    }

    // PRIVATE method to build the detailed prompt and request body
    private JsonObject BuildJobScopingRequest(string clientPrompt)
    {
        // This is the powerful prompt you created, now integrated as the system message.
        var systemContent = @"You are an expert AI Project Scoping Assistant for a freelance marketplace. Your primary function is to receive a brief, non-technical project request from a client and convert it into a detailed, structured, and technically-specified freelance job posting.

Your output MUST be a single, raw JSON object. Do not include any explanations, conversational filler, or Markdown formatting like ```json ... ``` before or after the JSON object. The structure of the JSON object must strictly adhere to the schema defined below.

JSON Schema Definition:
- Id: Number. Always set this to 0.
- Title: String. A clear, professional job title (max 100 chars).
- Description: String. A detailed, multi-paragraph description. Use \n for new lines. (max 2000 chars).
- Type: String. Must be one of the following values: ""Remote"", ""Hybrid"", ""OnSite"". Default to ""Remote"".
- Salary: Number. The estimated total project fee as a decimal value (e.g., 5000.00).
- Duration: String. The estimated project timeline (e.g., ""4-6 Weeks"", ""2 Months"").
- City: String. The client's location, or ""Remote"" if not specified.
- Deliverables: String or null. A list of concrete, tangible outcomes.
- Deadline: String (in ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ) or null. Calculate based on duration from the current date.
- PostedAt: String (in ISO 8601 format: YYYY-MM-DDTHH:mm:ssZ). Set to the current UTC time.

Instructions for Populating the JSON Object:
1.  **Analyze the client's request** and infer the necessary features, technical requirements, and project scope.
2.  **Description**: Structure it with sections like ""Project Overview,"" ""Key Features Required,"" and ""Ideal Candidate Skills."" Be detailed.
3.  **Salary**: Estimate a reasonable total project fee based on complexity and duration.
4.  **Deadline**: Calculate a realistic deadline by adding the `Duration` to the current UTC time.
5.  **Deliverables**: List specific, tangible outcomes.

Example client request: ""i want to build a website for my store""
Example JSON output you must generate:
{
  ""Id"": 0,
  ""Title"": ""Full-Stack Developer for E-Commerce Website"",
  ""Description"": ""Project Overview:\nWe are looking for a developer to build a modern e-commerce website. The goal is a professional online store to sell our products.\n\nKey Features:\n- Responsive Design\n- Product Catalog\n- Shopping Cart & Checkout\n- Stripe Payment Integration\n- User Accounts & Order History\n- Admin Dashboard to manage products and orders.\n\nIdeal Skills:\n- Experience with e-commerce development.\n- Proficiency in a modern web stack."",
  ""Type"": ""Remote"",
  ""Salary"": 6500.00,
  ""Duration"": ""6-8 Weeks"",
  ""City"": ""Remote"",
  ""Deliverables"": ""Fully deployed e-commerce website, source code repository, admin dashboard guide."",
  ""Deadline"": ""2024-09-15T12:00:00Z"",
  ""PostedAt"": ""2024-07-21T12:00:00Z""
}
(Note: Deadline and PostedAt dates are illustrative. Generate current and calculated dates.)

Now, process the following client request and generate the raw JSON object:";

        var request = new JsonObject
        {
            ["messages"] = new JsonArray
            {
                new JsonObject
                {
                    ["role"] = "system",
                    ["content"] = systemContent
                },
                new JsonObject
                {
                    ["role"] = "user",
                    ["content"] = clientPrompt
                }
            },
            ["model"] = "llama-3.1-8b-instant",
            ["temperature"] = 0.5, // Reduced for more deterministic, structured output
            ["max_tokens"] = 2048, // Increased to accommodate the detailed response
            ["top_p"] = 1,
            ["stream"] = false,
            ["response_format"] = new JsonObject
            {
                ["type"] = "json_object"
            }
        };

        return request;
    }
}
