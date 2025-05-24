/*
  # Add has_card column to users table

  1. Changes
    - Add has_card column to users table with default value of false
    - This column tracks whether a user has purchased a card

  2. Security
    - No changes to existing RLS policies
*/

ALTER TABLE users ADD COLUMN IF NOT EXISTS has_card boolean DEFAULT false;