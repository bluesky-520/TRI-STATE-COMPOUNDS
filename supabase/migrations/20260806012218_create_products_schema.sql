/*
# Tri-State Compounds — Products Schema

## Tables
- `products`: Each research peptide/product sold on the site.
  - id, name, slug, description, image_url, category, featured, sort_order, created_at
- `product_variants`: Dosage/size options and pricing per product.
  - id, product_id, dose_label, price, is_default

## Security
- RLS enabled on both tables.
- Public read access (anon + authenticated) — product catalog is public.
- No write access from the client (data managed via migrations/admin).
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  category text NOT NULL DEFAULT 'peptide',
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  dose_label text NOT NULL,
  price numeric(10,2) NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_variants" ON product_variants;
CREATE POLICY "public_read_variants" ON product_variants FOR SELECT
TO anon, authenticated USING (true);
