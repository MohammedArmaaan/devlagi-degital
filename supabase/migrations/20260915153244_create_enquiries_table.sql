/*
# Create enquiries table for Devlaji Digital Home Decor

1. New Tables
- `enquiries`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — customer's full name
  - `phone` (text, not null) — contact phone number
  - `email` (text, nullable) — optional email address
  - `service` (text, not null) — which service they're interested in
  - `project_type` (text, nullable) — residential or commercial
  - `message` (text, nullable) — additional project details or design request
  - `status` (text, default 'new') — enquiry status: new, contacted, closed
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `enquiries`.
- This is a no-auth public website: visitors submit enquiries without signing in.
- Allow anon + authenticated to INSERT (anyone can submit an enquiry).
- Only allow authenticated to SELECT/UPDATE/DELETE (business owner reviews enquiries after signing in).
- The INSERT policy uses WITH CHECK (true) because any visitor can submit.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text NOT NULL,
  project_type text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_enquiries" ON enquiries;
CREATE POLICY "auth_select_enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "auth_update_enquiries" ON enquiries;
CREATE POLICY "auth_update_enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_enquiries" ON enquiries;
CREATE POLICY "auth_delete_enquiries"
  ON enquiries FOR DELETE
  TO authenticated
  USING (true);
