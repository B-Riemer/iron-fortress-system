export interface Workout {
  id: string;
  title: string;
  difficulty: "recruit" | "soldier" | "spec-ops";
  duration_minutes: number;
  description: string | null;
  is_global?: boolean;
  user_id?: string;
  required_tier?: "recruit" | "operator" | "shadow" | null;
  created_at?: string;
  updated_at?: string;
}

