
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

export type TDiet = {
  type: string;
  title: string;
  time: string;
  foods: TFood[];
};
