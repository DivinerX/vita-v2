import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Utensils, Clock, Info, Plus, Check, Loader2, 
  Sparkles, Apple, Salad, Coffee, UtensilsCrossed, 
  Flame, Dumbbell, Brain, Heart
} from "lucide-react";
import Image from "next/image";
import api from "@/config/axios";
import { DEFAULT_DIET_IMAGES } from "@/constant";
type TDietFood = {
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
};

type TDietMeal = {
  type: string;
  title: string;
  time: string;
  foods: TDietFood[];
};

interface DietCardsProps {
  diets: TDietMeal[];
  suggestedGroups: { name: string; existing: boolean }[];
}

export function DietCards({ diets, suggestedGroups }: DietCardsProps) {
  const [selectedTab, setSelectedTab] = useState(diets[0]?.type || "breakfast");
  const [savingGroup, setSavingGroup] = useState<{ name: string, existing: boolean } | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<{ name: string, existing: boolean } | null>(null);

  const handleSaveDiet = async () => {
    if (!selectedGroup) return;
    
    try {
      await api.post("/diet", {
        group: selectedGroup,
        diets: diets
      });
      // Success message or notification could be added here
    } catch (error) {
      console.error("Failed to save diet group:", error);
    } finally {
      setSavingGroup(null);
      setSelectedGroup(null); // Reset selection after saving
    }
  };

  const handleChangeMeal = () => {
    console.log("Change Meal");
  };

  const getFallbackImage = (mealType: string) => {
    return DEFAULT_DIET_IMAGES[mealType.toUpperCase() as keyof typeof DEFAULT_DIET_IMAGES] || 
           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"; // Default food image
  };

  // Function to get icon based on meal type
  const getMealIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Salad className="h-4 w-4" />;
      case 'dinner': return <UtensilsCrossed className="h-4 w-4" />;
      case 'snack': return <Apple className="h-4 w-4" />;
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  // Function to get icon based on benefit keyword
  const getBenefitIcon = (benefit: string) => {
    const lowerBenefit = benefit.toLowerCase();
    if (lowerBenefit.includes('protein') || lowerBenefit.includes('muscle')) 
      return <Dumbbell className="h-2.5 w-2.5 mr-0.5" />;
    if (lowerBenefit.includes('energy') || lowerBenefit.includes('calories')) 
      return <Flame className="h-2.5 w-2.5 mr-0.5" />;
    if (lowerBenefit.includes('brain') || lowerBenefit.includes('cognitive')) 
      return <Brain className="h-2.5 w-2.5 mr-0.5" />;
    if (lowerBenefit.includes('heart') || lowerBenefit.includes('cardio')) 
      return <Heart className="h-2.5 w-2.5 mr-0.5" />;
    return null;
  };

  return (
    <div className="space-y-3 mt-3 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/20 dark:to-pink-900/5 p-4 border border-pink-200 dark:border-pink-900/30 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-pink-600 dark:text-pink-400" />
          </div>
          <h2 className="text-lg font-medium text-pink-600 dark:text-pink-400">Personalized Diet Plan</h2>
        </div>
        <span className="text-xs text-pink-500 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded-full">
          Nutritionist Recommended
        </span>
      </div>
      
      <hr className="border-pink-200 dark:border-pink-800/30" />
      
      <div className="mb-3">
        <p className="text-xs text-pink-700 dark:text-pink-300 mb-2">Select a collection to save this plan to:</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex flex-wrap gap-1.5">
            {suggestedGroups.map((group) => (
              <Button
                key={group.name}
                variant={selectedGroup?.name === group.name ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-1 text-xs h-7 px-2 ${
                  selectedGroup?.name === group.name
                    ? "bg-pink-500 text-white dark:bg-pink-700"
                    : "border-pink-300 text-pink-700 hover:bg-pink-100 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-900/20"
                } relative`}
                onClick={() => setSelectedGroup(group)}
                disabled={savingGroup !== null}
              >
                {selectedGroup?.name === group.name && (
                  <Check className="h-3 w-3 mr-1" />
                )}
                {group.name}
                {!group.existing && (
                  <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-[9px] px-1.5 rounded-full shadow-sm border border-pink-200 overflow-hidden">
                    New
                  </span>
                )}
              </Button>
            ))}
          </div>
          
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1 bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-700 dark:hover:bg-pink-800 shrink-0 whitespace-nowrap"
            onClick={handleSaveDiet}
            disabled={!selectedGroup || savingGroup !== null}
          >
            {savingGroup ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                {selectedGroup ? `Save to "${selectedGroup}"` : "Save to..."}
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-3 h-8 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
          {diets.map((diet) => (
            <TabsTrigger 
              key={diet.type} 
              value={diet.type} 
              className="text-xs py-1 text-pink-700 dark:text-pink-300 data-[state=active]:bg-pink-500 data-[state=active]:text-white dark:data-[state=active]:bg-pink-600 rounded-md flex items-center gap-1 justify-center"
            >
              {getMealIcon(diet.type)}
              {diet.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {diets.map((diet) => (
          <TabsContent key={diet.type} value={diet.type} className="space-y-3">
            {diet.foods.map((food, index) => (
              <Card key={index} className="overflow-hidden shadow-md border-pink-200 dark:border-pink-800/30 bg-white dark:bg-gray-950 hover:shadow-lg transition-shadow duration-200">
                <div className="grid md:grid-cols-5 gap-3">
                  {food.image && (
                    <div className="relative h-28 md:h-auto md:col-span-1">
                      <Image
                        src={food.image}
                        alt={food.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = getFallbackImage(diet.type);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent"></div>
                      <div className="absolute top-2 left-2 bg-pink-500/80 text-white text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        {getMealIcon(diet.type)}
                        <span className="truncate max-w-[40px]">{diet.title}</span>
                      </div>
                    </div>
                  )}
                  <div className={`p-3 ${food.image ? 'md:col-span-4' : 'md:col-span-5'}`}>
                    <CardHeader className="p-0 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-pink-700 dark:text-pink-400 flex items-center gap-1.5">
                          {food.name}
                          {food.nutrients.protein > 20 && (
                            <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-[10px] px-1.5 py-0.5 rounded-full flex items-center">
                              <Dumbbell className="h-2.5 w-2.5 mr-0.5" /> High Protein
                            </span>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-1 bg-pink-50 dark:bg-pink-900/10 px-2 py-0.5 rounded-full">
                          <Clock className="h-3 w-3 text-pink-500 dark:text-pink-400" />
                          <span className="text-xs text-pink-500 dark:text-pink-400">{diet.time}</span>
                        </div>
                      </div>
                      <CardDescription className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {food.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pb-2">
                      <div className="grid grid-cols-4 gap-1.5 mb-3">
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100/70 dark:from-pink-900/20 dark:to-pink-800/10 rounded-md p-1.5 text-center shadow-sm">
                          <div className="text-xs font-medium text-pink-700 dark:text-pink-400 flex items-center justify-center gap-1">
                            <Flame className="h-3 w-3" /> {food.nutrients.calories}
                          </div>
                          <div className="text-[10px] text-pink-500 dark:text-pink-500">Calories</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100/70 dark:from-pink-900/20 dark:to-pink-800/10 rounded-md p-1.5 text-center shadow-sm">
                          <div className="text-xs font-medium text-pink-700 dark:text-pink-400 flex items-center justify-center gap-1">
                            <Dumbbell className="h-3 w-3" /> {food.nutrients.protein}g
                          </div>
                          <div className="text-[10px] text-pink-500 dark:text-pink-500">Protein</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100/70 dark:from-pink-900/20 dark:to-pink-800/10 rounded-md p-1.5 text-center shadow-sm">
                          <div className="text-xs font-medium text-pink-700 dark:text-pink-400">{food.nutrients.carbs}g</div>
                          <div className="text-[10px] text-pink-500 dark:text-pink-500">Carbs</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100/70 dark:from-pink-900/20 dark:to-pink-800/10 rounded-md p-1.5 text-center shadow-sm">
                          <div className="text-xs font-medium text-pink-700 dark:text-pink-400">{food.nutrients.fat}g</div>
                          <div className="text-[10px] text-pink-500 dark:text-pink-500">Fat</div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <Info className="h-3 w-3 text-pink-500 dark:text-pink-400" />
                          <span className="text-xs font-medium text-pink-700 dark:text-pink-400">Health Benefits</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {food.benefits.map((benefit, i) => (
                            <Badge 
                              key={i} 
                              variant="secondary" 
                              className="text-[10px] px-1.5 py-0.5 bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50 flex items-center"
                            >
                              {getBenefitIcon(benefit)}
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-1.5 flex justify-end">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex items-center gap-1 h-7 text-xs bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-700 dark:hover:bg-pink-600"
                        onClick={handleChangeMeal}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Change Meal
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
