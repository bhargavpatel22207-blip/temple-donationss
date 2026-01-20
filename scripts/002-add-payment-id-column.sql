-- Add payment_id column to donations table for Razorpay integration
ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_id TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_donations_payment_id ON donations(payment_id);
