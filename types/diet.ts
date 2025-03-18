
export type TFood = {
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

export type TMeal = {
  time: string;
  foods: TFood[];
};

export type TDiet = {
  breakfast?: TMeal;
  lunch?: TMeal;
  dinner?: TMeal;
  snack?: TMeal;
};

export type TDietGroup = {
  id?: string;
  name: string;
  description: string;
  insight: string;
  user_id: string;
  diets: TDiet[];
  created_at?: string;
};