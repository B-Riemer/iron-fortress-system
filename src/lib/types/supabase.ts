export interface Workout {
  id: string;
  title: string;
  difficulty: "recruit" | "soldier" | "spec-ops";
  duration_minutes: number;
  created_at?: string;
  updated_at?: string;
}

