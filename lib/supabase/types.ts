export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BlogPostContent = {
  introduction?: string;
  sections: {
    title: string;
    icon?: string;
    content: string[];
    codeBlock?: { filename: string; code: string };
    quote?: string;
  }[];
};

export type QuestLoot = Record<string, string>;

export type ExperienceAchievement = {
  title: string;
  description: string;
};

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          date: string;
          category: string;
          excerpt: string;
          tags: string[];
          read_time: string;
          comments: number;
          featured: boolean;
          image_url: string | null;
          author: string;
          content: BlogPostContent | null;
          table_of_contents: string[] | null;
          previous_post_slug: string | null;
          next_post_slug: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          date: string;
          category: string;
          excerpt: string;
          tags: string[];
          read_time: string;
          comments?: number;
          featured?: boolean;
          image_url?: string | null;
          author?: string;
          content?: BlogPostContent | null;
          table_of_contents?: string[] | null;
          previous_post_slug?: string | null;
          next_post_slug?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["blog_posts"]["Insert"]
        >;
      };
      experiences: {
        Row: {
          id: string;
          slug: string;
          type: "work" | "education";
          period: string;
          title: string;
          company: string;
          mission_id: string;
          clearance_level: string;
          description: string;
          achievements: ExperienceAchievement[];
          tech_stack: string[];
          start_date: string;
          end_date: string;
          completion: number;
          demo_image: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          type?: "work" | "education";
          period: string;
          title: string;
          company: string;
          mission_id: string;
          clearance_level: string;
          description: string;
          achievements: ExperienceAchievement[];
          tech_stack: string[];
          start_date: string;
          end_date: string;
          completion: number;
          demo_image?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["experiences"]["Insert"]
        >;
      };
      quests: {
        Row: {
          id: string;
          slug: string;
          title: string;
          client: string;
          class: string;
          quest_id: string;
          completed: string;
          briefing: string;
          loot: QuestLoot;
          tech_stack: string[];
          images: string[];
          category: "main_quest" | "side_quest";
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          client: string;
          class: string;
          quest_id: string;
          completed: string;
          briefing: string;
          loot: QuestLoot;
          tech_stack: string[];
          images?: string[];
          category?: "main_quest" | "side_quest";
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["quests"]["Insert"]
        >;
      };
      inventory_items: {
        Row: {
          id: string;
          slug: string;
          name: string;
          level: number;
          stat: string;
          icon: string;
          rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
          description: string;
          power: number;
          weight: string;
          durability: string;
          category: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          level: number;
          stat: string;
          icon: string;
          rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
          description: string;
          power: number;
          weight: string;
          durability: string;
          category?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["inventory_items"]["Insert"]
        >;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      rarity_type: "common" | "uncommon" | "rare" | "epic" | "legendary";
    };
    CompositeTypes: Record<string, never>;
  };
}

// Convenience type aliases
export type BlogPost =
  Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogPostInsert =
  Database["public"]["Tables"]["blog_posts"]["Insert"];
export type Experience =
  Database["public"]["Tables"]["experiences"]["Row"];
export type ExperienceInsert =
  Database["public"]["Tables"]["experiences"]["Insert"];
export type Quest =
  Database["public"]["Tables"]["quests"]["Row"];
export type QuestInsert =
  Database["public"]["Tables"]["quests"]["Insert"];
export type InventoryItem =
  Database["public"]["Tables"]["inventory_items"]["Row"];
export type InventoryItemInsert =
  Database["public"]["Tables"]["inventory_items"]["Insert"];
