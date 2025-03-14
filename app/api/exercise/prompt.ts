import { TExercise } from "@/types/exercise";

export const generateExerciseGroupPrompt = ({ exerciseGroupName, exercises }: { exerciseGroupName: string, exercises: TExercise[] }) => `
You are a personal exercise content generator. Your task is to create engaging and informative content for an exercise group.

Exercise Group Name:
---------------------------------------
${exerciseGroupName}
---------------------------------------

Exercises in this group:
---------------------------------------
${JSON.stringify(exercises)}
---------------------------------------

Based on the exercise group name and the exercises provided, generate a descriptive name, a concise description, and an insightful explanation about the benefits and purpose of this exercise group.

Output must be in the following JSON format:
---------------------------------------
{
  "name": "string", // A catchy, descriptive name for the exercise group
  "description": "string", // A brief 1-2 sentence description
  "insight": "string" // A paragraph explaining the benefits and purpose of this exercise group
}
---------------------------------------

Examples:
---------------------------------------
Example 1:
{
  "name": "Build Strength & Energy",
  "description": "Customized for your fitness level",
  "insight": "This plan focuses on building functional strength and increasing your energy levels. The exercises are designed to be gentle on your joints while still providing an effective workout."
}

Example 2:
{
  "name": "Core & Flexibility Focus",
  "description": "Strengthen your center and improve mobility",
  "insight": "This carefully selected set of exercises targets your core muscles while enhancing overall flexibility. Regular practice will improve posture, reduce back pain, and create a strong foundation for other physical activities."
}
---------------------------------------

Ensure your response contains only valid JSON that matches the required format.
`