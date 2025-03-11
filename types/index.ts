
export type TRelativeCategory = 'diet' | 'exercise' | 'habit';

export type THabit = {
  id?: string;
  title: string;
  description: string | null;
  category: TRelativeCategory;
  time: string;
  frequency: string;
  on_progress?: boolean;
  streak_days?: number;
  created_at?: string;
}