/*
  # Add avatar URL column to users table

  1. Changes
    - Add `avatar_url` column to `users` table
      - Type: TEXT
      - Nullable: true (allows users without avatars)

  2. Security
    - No changes to RLS policies needed as the column will be protected by existing table-level policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE users ADD COLUMN avatar_url TEXT;
  END IF;
END $$;