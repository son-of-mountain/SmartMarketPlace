// src/interfaces/JobEnums.ts

// This constant object maps string keys to their numeric values.
// This is the structure you requested for JobType definition.
export const JobTypeMap = {
  Remote: 0,
  Hybrid: 1,
  OnSite: 2,
} as const;

// This type represents the string keys ("Remote" | "Hybrid" | "OnSite").
// This is the `JobType` type you specifically requested for frontend use.
export type JobType = keyof typeof JobTypeMap;

// This type represents the numeric values (0 | 1 | 2).
// This is the type that your backend expects for JobType in requests/responses.
export type JobNumericType = typeof JobTypeMap[keyof typeof JobTypeMap];

// Helper to convert JobType string key to display label
export const JobTypeLabels: Record<JobType, string> = {
  Remote: "Remote",
  Hybrid: "Hybrid",
  OnSite: "On-Site",
};

// Helper function to get the string key from a numeric value (useful when displaying data from API)
export function getJobTypeKeyFromValue(value: JobNumericType): JobType {
  // Iterate through the JobTypeMap to find the corresponding string key
  for (const key in JobTypeMap) {
    if (JobTypeMap[key as JobType] === value) {
      return key as JobType;
    }
  }
  // Fallback for unexpected values, though ideally backend ensures valid enum
  console.warn(`Unknown JobNumericType value: ${value}. Defaulting to 'Remote'.`);
  return "Remote"; // Default to a known key
}