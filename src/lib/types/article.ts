export interface Article {
  id: string;
  title: string;
  slug: string;
  category: "tactics" | "nutrition" | "mindset" | "gear";
  summary: string | null;
  content: string;
  security_level?: "public" | "member" | "operator";
  author_id?: string;
  created_at?: string;
  updated_at?: string;
}

