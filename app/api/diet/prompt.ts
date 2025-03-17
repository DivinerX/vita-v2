import { TDiet } from "@/types/diet";

export const generateDietGroupPrompt = ({ dietGroupName, diets }: { dietGroupName: string, diets: TDiet[] }) => `
You are a personal diet content generator. Your task is to create engaging and informative content for a diet group.

Diet Group Name:
---------------------------------------
${dietGroupName}
---------------------------------------

Diets in this group:
---------------------------------------
${JSON.stringify(diets)}
---------------------------------------

Based on the diet group name and the diets provided, generate a descriptive name, a concise description, and an insightful explanation about the benefits and purpose of this diet group.

Output must be in the following JSON format:
---------------------------------------
{
  "name": "string", // A catchy, descriptive name for the diet group
  "description": "string", // A brief 1-2 sentence description
  "insight": "string" // A paragraph explaining the benefits and purpose of this diet group
}
---------------------------------------

Examples:
---------------------------------------
Example 1:
{
  "name": "Balanced Diet",
  "description": "A balanced diet that provides all the nutrients your body needs",
  "insight": "This diet is designed to provide all the nutrients your body needs to function at its best. The carefully selected foods optimize your metabolism while maintaining muscle mass through adequate protein intake. By combining nutrient-dense whole foods with strategic meal timing, this plan helps control hunger, stabilize blood sugar levels, and promote sustainable fat loss without sacrificing energy or satisfaction."
}

Example 2:
{
  "name": "Weight Loss Diet",
  "description": "A diet that helps you lose weight",
  "insight": "This diet is designed to help you lose weight by providing a balanced diet that is low in calories and high in nutrients. The carefully selected foods optimize your metabolism while maintaining muscle mass through adequate protein intake. By combining nutrient-dense whole foods with strategic meal timing, this plan helps control hunger, stabilize blood sugar levels, and promote sustainable fat loss without sacrificing energy or satisfaction."
}
---------------------------------------

Ensure your response contains only valid JSON that matches the required format.
`