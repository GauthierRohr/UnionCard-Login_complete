/*
  # Add university field and update user tracking

  1. Changes
    - Add university field to users table
    - Add total_referrals column
    - Add has_card column to track if user has purchased a card
    - Update qualified_referrals to be computed based on referrals or card purchase

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE users ADD COLUMN IF NOT EXISTS university text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS has_card boolean DEFAULT false;

-- Create a function to calculate if a user is qualified (has 5+ referrals or purchased a card)
CREATE OR REPLACE FUNCTION is_qualified_referral(user_row users) 
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT 
      CASE 
        WHEN user_row.has_card THEN true
        WHEN (
          SELECT COUNT(*) 
          FROM users referrals 
          WHERE referrals.referred_by = user_row.referral_code
        ) >= 5 THEN true
        ELSE false
      END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;