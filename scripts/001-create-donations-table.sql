-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  amount DECIMAL(10, 2) NOT NULL,
  donation_type VARCHAR(50) DEFAULT 'general',
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert donations (public donations)
CREATE POLICY "Anyone can insert donations" ON donations
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read donations (for showing on the website)
CREATE POLICY "Anyone can view donations" ON donations
  FOR SELECT USING (true);
