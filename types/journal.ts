export type TJournal = {
  id: string;
  user_id: string;
  content: string;
  reflection?: string;
  created_at?: string;
};

export type TJournalInput = {
  content: string;
};

export type TJournalOutput = {
  id: string;
  user_id: string;
  content: string;
  reflection: string;
  created_at: string;
};