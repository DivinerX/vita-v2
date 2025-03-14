"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronLeft, ChevronRight, Utensils, Citrus as Fruit } from "lucide-react";
import Link from "next/link";

interface MealProps {
  type: string;
  title: string;
  time: string;
  foods: {
    name: string;
    description: string;
    nutrients: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    benefits: string[];
    image?: string;
  }[];
}

function Meal({ type, title, time, foods }: MealProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">{time}</div>
        </div>
        <CardDescription>Anti-inflammatory focus</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {foods.map((food, index) => (
          <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex gap-4">
              {food.image && (
                <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-medium">{food.name}</h4>
                <p className="text-sm text-muted-foreground">{food.description}</p>
                
                <div className="flex gap-3 mt-2">
                  <div className="text-xs">
                    <span className="font-semibold">{food.nutrients.calories}</span> cal
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">{food.nutrients.protein}g</span> protein
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">{food.nutrients.carbs}g</span> carbs
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">{food.nutrients.fat}g</span> fat
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {food.benefits.map((benefit, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm">
                Swap
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground italic">
        Recommended for 10 days to reduce inflammation and boost energy
      </CardFooter>
    </Card>
  );
}

export default function DietPlanPage() {
  const meals = {
    breakfast: {
      title: "Breakfast",
      time: "7:00 - 8:30 AM",
      foods: [
        {
          name: "Berry Chia Pudding",
          description: "Chia seeds soaked overnight with almond milk, topped with mixed berries and a drizzle of honey",
          nutrients: { calories: 320, protein: 12, carbs: 45, fat: 14 },
          benefits: ["Anti-inflammatory", "Omega-3", "Fiber"],
          image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=500&auto=format&fit=crop&q=60"
        },
        {
          name: "Green Tea",
          description: "Steeped for 3-5 minutes with a slice of lemon",
          nutrients: { calories: 2, protein: 0, carbs: 0, fat: 0 },
          benefits: ["Antioxidants", "Metabolism"],
        }
      ]
    },
    lunch: {
      title: "Lunch",
      time: "12:00 - 1:30 PM",
      foods: [
        {
          name: "Mediterranean Quinoa Salad",
          description: "Quinoa with cucumbers, tomatoes, olives, feta cheese, and lemon-olive oil dressing",
          nutrients: { calories: 420, protein: 14, carbs: 52, fat: 18 },
          benefits: ["Anti-inflammatory", "Protein", "Healthy Fats"],
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60"
        }
      ]
    },
    dinner: {
      title: "Dinner",
      time: "6:30 - 8:00 PM",
      foods: [
        {
          name: "Baked Salmon with Turmeric Roasted Vegetables",
          description: "Wild-caught salmon with root vegetables roasted with turmeric, garlic, and olive oil",
          nutrients: { calories: 490, protein: 32, carbs: 28, fat: 22 },
          benefits: ["Omega-3", "Anti-inflammatory", "Protein"],
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60"
        }
      ]
    },
    snacks: {
      title: "Snacks",
      time: "Between meals",
      foods: [
        {
          name: "Greek Yogurt with Walnuts",
          description: "Plain Greek yogurt with a handful of walnuts and a drizzle of honey",
          nutrients: { calories: 220, protein: 18, carbs: 12, fat: 10 },
          benefits: ["Protein", "Probiotics", "Healthy Fats"],
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60"
        },
        {
          name: "Carrot and Celery Sticks with Hummus",
          description: "Fresh vegetables with homemade hummus",
          nutrients: { calories: 150, protein: 6, carbs: 18, fat: 8 },
          benefits: ["Fiber", "Antioxidants", "Plant Protein"],
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Diet Plan</h1>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Anti-inflammatory Diet</h2>
            <p className="text-muted-foreground">Personalized for your health goals</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <Utensils className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Diet AI Insights</h3>
                <p className="text-sm text-muted-foreground">
                  This plan focuses on reducing inflammation which should help with your bloating and anxiety symptoms. 
                  It's high in omega-3s, antioxidants, and fiber while avoiding common inflammatory triggers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="day1" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Daily Plan</h3>
            <TabsList>
              <TabsTrigger value="day1">Day 1</TabsTrigger>
              <TabsTrigger value="day2">Day 2</TabsTrigger>
              <TabsTrigger value="day3">Day 3</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="day1" className="space-y-4">
            <Meal type="breakfast" {...meals.breakfast} />
            <Meal type="lunch" {...meals.lunch} />
            <Meal type="dinner" {...meals.dinner} />
            <Meal type="snack" {...meals.snacks} />
          </TabsContent>
          
          <TabsContent value="day2">
            <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
              <p className="text-muted-foreground">Plan for Day 2 is being prepared</p>
            </div>
          </TabsContent>
          
          <TabsContent value="day3">
            <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
              <p className="text-muted-foreground">Plan for Day 3 is being prepared</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Fruit className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">Dietary Guidelines</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Foods to Embrace</h4>
              <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                <li>Leafy greens (spinach, kale, arugula)</li>
                <li>Fatty fish rich in omega-3s (salmon, sardines)</li>
                <li>Berries (blueberries, strawberries, blackberries)</li>
                <li>Nuts and seeds (walnuts, flaxseeds, chia seeds)</li>
                <li>Extra virgin olive oil</li>
                <li>Turmeric and ginger</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Foods to Minimize</h4>
              <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                <li>Processed foods with artificial additives</li>
                <li>Refined carbohydrates and sugars</li>
                <li>Excessive alcohol</li>
                <li>Processed meats (bacon, sausage, deli meats)</li>
                <li>Trans fats and hydrogenated oils</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to My Plan</Button>
          </CardFooter>
        </Card>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          Every bite is a choice—fuel your future self!
        </footer>
      </div>
    </div>
  );
}