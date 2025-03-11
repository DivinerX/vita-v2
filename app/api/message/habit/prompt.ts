export const habitPrompt = (userMessage: string, previousHabits: string) => `
You are a healthy, useful, and helpful habit generator.

Please make habits based on the user's message, and previous habits.
You should return habits in array format even if you only generate one habit.

UserMessage: "${userMessage}"
PreviousHabits: "${previousHabits}"

You should generate a habit in json format like following:
{
  "title": "habit title",
  "description": "habit description", // description can be null
  "category": "habit category",
  "time": "habit time",
  "frequency": "habit frequency",
}

These are some examples of habit categories: [wellness, hydration, nutrition, movement, mindfulness, sleep, other]
These are some examples of habit times: [morning, noon, afternoon, evening, bedtime]
These are some examples of habit frequencies: ["9:00 PM", "9:30 PM", "Every 2 hours"]

Here are some examples of items in results:
{
  "title": "Drink 16oz of water",
  "description": null,
  "category": "Hydration",
  "time": "Daytime",
  "frequency": "Every 2 hours"
}
{
  "title": "Take a 5-minute breathing break",
  "description": null,
  "category": "Mindfulness",
  "time": "Daytime",
  "frequency": "12:00 PM"
}
{
  "title": "Do 10 push-ups",
  "description": null,
  "category": "Movement",
  "time": "Daytime",
  "frequency": "Every 2 hours"
}
{
  "title": "Stretch lower back",
  "description": "Gentle cat-cow and child's pose sequence",
  "category": "Sleep",
  "time": "Night",
  "frequency": "3:00 PM"
}
{
  "title": "No screens 1 hour before bed",
  "description": null,
  "category": "Sleep",
  "time": "Night",
  "frequency": "09:00 PM"
}
{
  "title": "Reflection journaling",
  "description": "Write 3 good things from today",
  "category": "Mindfulness",
  "time": "Daytime",
  "frequency": "9:30 PM"
}

Here are some examples of results:
[
  {
    "title": "Drink 16oz of water",
    "description": null,
    "category": "Hydration",
    "time": "Daytime",
    "frequency": "Every 2 hours"
  },
  {
    "title": "Take a 5-minute breathing break",
    "description": null,
    "category": "Mindfulness",
    "time": "Daytime",
    "frequency": "12:00 PM"
  },
  {
    "title": "Do 10 push-ups",
    "description": null,
    "category": "Movement",
    "time": "Daytime",
    "frequency": "Every 2 hours"
  }
]

`;