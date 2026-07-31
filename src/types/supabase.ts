// Supabase Database Types
//
// These are hand-written to mirror the schema this app actually queries.
// They replace an earlier permissive stub whose index signatures made the
// Supabase client resolve every table to `never`, which broke the build.
//
// The schema still lives in the Supabase dashboard rather than in versioned
// migrations, so this file is the closest thing the repo has to a schema of
// record. Once migrations are checked in, regenerate it instead of editing:
//   npx supabase gen types typescript --project-id <id> > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ClearanceTier = "recruit" | "operator" | "shadow";
export type WorkoutDifficulty = "recruit" | "soldier" | "spec-ops";
export type ArticleCategory = "tactics" | "nutrition" | "mindset" | "gear";
export type ArticleSecurityLevel = "public" | "member" | "operator";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          tier: ClearanceTier | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          tier?: ClearanceTier | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          tier?: ClearanceTier | null;
          created_at?: string;
        };
        Relationships: [];
      };
      workouts: {
        Row: {
          id: string;
          title: string;
          difficulty: WorkoutDifficulty;
          duration_minutes: number;
          description: string | null;
          is_global: boolean;
          user_id: string | null;
          required_tier: ClearanceTier | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          difficulty: WorkoutDifficulty;
          duration_minutes: number;
          description?: string | null;
          is_global?: boolean;
          user_id?: string | null;
          required_tier?: ClearanceTier | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          difficulty?: WorkoutDifficulty;
          duration_minutes?: number;
          description?: string | null;
          is_global?: boolean;
          user_id?: string | null;
          required_tier?: ClearanceTier | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      workout_logs: {
        Row: {
          id: string;
          workout_id: string;
          user_id: string;
          // Both are always written by log-action.ts, so they are treated as
          // non-nullable here — matching what the dashboard components assume.
          duration_minutes: number;
          notes: string | null;
          rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          workout_id: string;
          user_id: string;
          duration_minutes?: number | null;
          notes?: string | null;
          rating?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          workout_id?: string;
          user_id?: string;
          duration_minutes?: number | null;
          notes?: string | null;
          rating?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_logs_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          },
        ];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: ArticleCategory;
          summary: string | null;
          content: string;
          security_level: ArticleSecurityLevel;
          author_id: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: ArticleCategory;
          summary?: string | null;
          content: string;
          // Defaulted in Postgres — the member-facing editor omits it.
          security_level?: ArticleSecurityLevel;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: ArticleCategory;
          summary?: string | null;
          content?: string;
          security_level?: ArticleSecurityLevel;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
