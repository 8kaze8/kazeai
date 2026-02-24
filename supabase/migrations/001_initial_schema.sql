-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create rarity enum
CREATE TYPE rarity_type AS ENUM ('common', 'rare', 'epic', 'legendary');

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  read_time TEXT NOT NULL DEFAULT '5 min',
  comments INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Kaze',
  content JSONB,
  table_of_contents TEXT[],
  previous_post_slug TEXT,
  next_post_slug TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- EXPERIENCES
-- ============================================
CREATE TABLE experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  period TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  mission_id TEXT NOT NULL,
  clearance_level TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements JSONB NOT NULL DEFAULT '[]',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  completion INTEGER NOT NULL DEFAULT 0,
  demo_image TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- QUESTS
-- ============================================
CREATE TABLE quests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  class TEXT NOT NULL,
  quest_id TEXT NOT NULL,
  completed TEXT NOT NULL,
  briefing TEXT NOT NULL,
  loot JSONB NOT NULL DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_quests_updated_at
  BEFORE UPDATE ON quests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INVENTORY ITEMS
-- ============================================
CREATE TABLE inventory_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  stat TEXT NOT NULL,
  icon TEXT NOT NULL,
  rarity rarity_type NOT NULL DEFAULT 'common',
  description TEXT NOT NULL,
  power INTEGER NOT NULL DEFAULT 0,
  weight TEXT NOT NULL DEFAULT '0 kg',
  durability TEXT NOT NULL DEFAULT 'Normal',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_inventory_items_updated_at
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Public read access (anon)
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access" ON quests FOR SELECT USING (true);
CREATE POLICY "Public read access" ON inventory_items FOR SELECT USING (true);

-- Authenticated full access
CREATE POLICY "Authenticated full access" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access" ON quests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access" ON inventory_items FOR ALL USING (auth.role() = 'authenticated');
