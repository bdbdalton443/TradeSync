/*
  # Trading Platform Schema

  1. New Tables
    - `user_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `binance_api_key_encrypted` (text, encrypted API key)
      - `binance_api_secret_encrypted` (text, encrypted API secret)
      - `min_profit_percentage` (numeric, default 0.5)
      - `max_profit_percentage` (numeric, default 2.5)
      - `min_usdt_per_order` (numeric, default 10)
      - `max_usdt_per_order` (numeric, default 500)
      - `wallet_split_levels` (integer, default 4)
      - `account_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `trading_assets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `asset_symbol` (text)
      - `is_active` (boolean, default true)
      - `current_profit_percent` (numeric, default 0)
      - `engine_decision` (text, default 'HOLD')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `manual_orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `asset_symbol` (text)
      - `order_type` (text)
      - `order_side` (text)
      - `amount_usdt` (numeric)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)

    - `engine_status`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `is_running` (boolean, default false)
      - `last_started_at` (timestamptz)
      - `last_stopped_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  binance_api_key_encrypted text,
  binance_api_secret_encrypted text,
  min_profit_percentage numeric DEFAULT 0.5,
  max_profit_percentage numeric DEFAULT 2.5,
  min_usdt_per_order numeric DEFAULT 10,
  max_usdt_per_order numeric DEFAULT 500,
  wallet_split_levels integer DEFAULT 4,
  account_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create trading_assets table
CREATE TABLE IF NOT EXISTS trading_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  asset_symbol text NOT NULL,
  is_active boolean DEFAULT true,
  current_profit_percent numeric DEFAULT 0,
  engine_decision text DEFAULT 'HOLD',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, asset_symbol)
);

ALTER TABLE trading_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assets"
  ON trading_assets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assets"
  ON trading_assets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assets"
  ON trading_assets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own assets"
  ON trading_assets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create manual_orders table
CREATE TABLE IF NOT EXISTS manual_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  asset_symbol text NOT NULL,
  order_type text NOT NULL,
  order_side text NOT NULL,
  amount_usdt numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE manual_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON manual_orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON manual_orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create engine_status table
CREATE TABLE IF NOT EXISTS engine_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_running boolean DEFAULT false,
  last_started_at timestamptz,
  last_stopped_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE engine_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own engine status"
  ON engine_status FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own engine status"
  ON engine_status FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own engine status"
  ON engine_status FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_trading_assets_user_id ON trading_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_manual_orders_user_id ON manual_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_engine_status_user_id ON engine_status(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_trading_assets_updated_at ON trading_assets;
CREATE TRIGGER update_trading_assets_updated_at
  BEFORE UPDATE ON trading_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_engine_status_updated_at ON engine_status;
CREATE TRIGGER update_engine_status_updated_at
  BEFORE UPDATE ON engine_status
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
