import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, TrendingUp, DollarSign, Layers, Save, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);

  const [settings, setSettings] = useState({
    binanceApiKey: '',
    binanceApiSecret: '',
    minProfitPercentage: 0.5,
    maxProfitPercentage: 2.5,
    minUsdtPerOrder: 10,
    maxUsdtPerOrder: 500,
    walletSplitLevels: 4,
    accountActive: true,
  });

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings({
          binanceApiKey: data.binance_api_key_encrypted || '',
          binanceApiSecret: data.binance_api_secret_encrypted || '',
          minProfitPercentage: data.min_profit_percentage,
          maxProfitPercentage: data.max_profit_percentage,
          minUsdtPerOrder: data.min_usdt_per_order,
          maxUsdtPerOrder: data.max_usdt_per_order,
          walletSplitLevels: data.wallet_split_levels,
          accountActive: data.account_active,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setSaving(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          binance_api_key_encrypted: settings.binanceApiKey,
          binance_api_secret_encrypted: settings.binanceApiSecret,
          min_profit_percentage: settings.minProfitPercentage,
          max_profit_percentage: settings.maxProfitPercentage,
          min_usdt_per_order: settings.minUsdtPerOrder,
          max_usdt_per_order: settings.maxUsdtPerOrder,
          wallet_split_levels: settings.walletSplitLevels,
          account_active: settings.accountActive,
        });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="w-10 h-10 text-teal-400" />
            Settings
          </h1>
          <p className="text-gray-400">Configure your trading parameters and API credentials</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-500/10 border border-green-500/40 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <p className="text-green-400">Settings saved successfully!</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Key className="w-6 h-6 text-teal-400" />
              API Configuration
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Your API credentials are encrypted and stored securely. Never share your API secret with anyone.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Binance API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={settings.binanceApiKey}
                    onChange={(e) => setSettings({ ...settings, binanceApiKey: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors pr-12"
                    placeholder="Enter your Binance API Key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Binance API Secret
                </label>
                <div className="relative">
                  <input
                    type={showApiSecret ? 'text' : 'password'}
                    value={settings.binanceApiSecret}
                    onChange={(e) => setSettings({ ...settings, binanceApiSecret: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors pr-12"
                    placeholder="Enter your Binance API Secret"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiSecret(!showApiSecret)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {showApiSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-teal-400" />
              Trading Preferences
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Profit Percentage (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={settings.minProfitPercentage}
                    onChange={(e) => setSettings({ ...settings, minProfitPercentage: parseFloat(e.target.value) })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maximum Profit Percentage (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={settings.maxProfitPercentage}
                    onChange={(e) => setSettings({ ...settings, maxProfitPercentage: parseFloat(e.target.value) })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-teal-400" />
              USDT Trading Limits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum USDT per Order
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={settings.minUsdtPerOrder}
                  onChange={(e) => setSettings({ ...settings, minUsdtPerOrder: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum USDT per Order
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={settings.maxUsdtPerOrder}
                  onChange={(e) => setSettings({ ...settings, maxUsdtPerOrder: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-teal-400" />
              Wallet Level Splitting
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Number of Levels to Split Wallet Balance
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="10"
                value={settings.walletSplitLevels}
                onChange={(e) => setSettings({ ...settings, walletSplitLevels: parseInt(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <p className="mt-2 text-sm text-gray-400">
                This determines how your wallet balance will be divided for risk management (e.g., 4 levels)
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving Settings...' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
