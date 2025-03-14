export type TExerciseGroup = {
  id?: string;
  name: string;
  description: string;
  insight: string;
  exercises: TExercise[];
}

export type TExercise = {
  id?: string;
  name: string;
  guideline: string;
  duration: string;
  difficulty: string;
  calories: number;
  muscleGroups: string[];
  image?: string;
  completed?: boolean;
  videoUrl?: string;
  option: string;
  user_id?: string;
  group_id?: string;
}

