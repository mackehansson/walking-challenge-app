/*
  # Walking Challenge Schema

  1. New Tables
    - `challenges`
      - `id` (uuid, primary key)
      - `target_steps` (integer) - Number of steps to complete
      - `name` (text) - Challenge name
      - `start_date` (timestamptz) - When challenge starts
      - `end_date` (timestamptz) - When challenge ends
      - `created_at` (timestamptz)
    
    - `participants`
      - `id` (uuid, primary key)
      - `challenge_id` (uuid, foreign key)
      - `name` (text) - Participant name
      - `current_steps` (integer) - Current step count
      - `joined_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow public read/write access (no auth required)
*/

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_steps integer NOT NULL,
  name text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid REFERENCES challenges(id) ON DELETE CASCADE,
  name text NOT NULL,
  current_steps integer DEFAULT 0,
  joined_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access on challenges"
  ON challenges FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on challenges"
  ON challenges FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access on participants"
  ON participants FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on participants"
  ON participants FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access on participants"
  ON participants FOR UPDATE
  TO public
  USING (true);