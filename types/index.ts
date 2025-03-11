
export type TRelativeCategory = 'diet' | 'exercise' | 'habit';

export type THabit = {
  title: string;
  description: string | null;
  category: TRelativeCategory;
  time: string;
  frequency: string;
}