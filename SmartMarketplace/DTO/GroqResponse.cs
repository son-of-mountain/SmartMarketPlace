using System.Text.Json.Serialization;

namespace SmartMarketplace.DTO;

public class GroqResponseDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("object")]
    public string ObjectType { get; set; }

    [JsonPropertyName("created")]
    public long Created { get; set; }

    [JsonPropertyName("model")]
    public string Model { get; set; }

    [JsonPropertyName("choices")]
    public List<GroqChoiceDto> Choices { get; set; }

    [JsonPropertyName("usage")]
    public GroqUsageDto Usage { get; set; }

    [JsonPropertyName("usage_breakdown")]
    public GroqUsageBreakdownDto UsageBreakdown { get; set; }

    [JsonPropertyName("system_fingerprint")]
    public string SystemFingerprint { get; set; }

    [JsonPropertyName("x_groq")]
    public GroqMetaDto GroqMeta { get; set; }
}

public class GroqChoiceDto
{
    [JsonPropertyName("index")]
    public int Index { get; set; }

    [JsonPropertyName("message")]
    public GroqMessageDto Message { get; set; }

    [JsonPropertyName("logprobs")]
    public object Logprobs { get; set; }

    [JsonPropertyName("finish_reason")]
    public string FinishReason { get; set; }
}

public class GroqMessageDto
{
    [JsonPropertyName("role")]
    public string Role { get; set; }

    [JsonPropertyName("content")]
    public string Content { get; set; }
}

public class GroqUsageDto
{
    [JsonPropertyName("queue_time")]
    public double QueueTime { get; set; }

    [JsonPropertyName("prompt_tokens")]
    public int PromptTokens { get; set; }

    [JsonPropertyName("prompt_time")]
    public double PromptTime { get; set; }

    [JsonPropertyName("completion_tokens")]
    public int CompletionTokens { get; set; }

    [JsonPropertyName("completion_time")]
    public double CompletionTime { get; set; }

    [JsonPropertyName("total_tokens")]
    public int TotalTokens { get; set; }

    [JsonPropertyName("total_time")]
    public double TotalTime { get; set; }
}

public class GroqUsageBreakdownDto
{
    [JsonPropertyName("models")]
    public object Models { get; set; }
}

public class GroqMetaDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; }
}
