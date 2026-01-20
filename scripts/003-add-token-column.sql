-- Add token column to donations table for inauguration gift tracking
ALTER TABLE donations ADD COLUMN IF NOT EXISTS token VARCHAR(20) UNIQUE;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_donations_token ON donations(token);
