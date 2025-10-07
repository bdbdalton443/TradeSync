import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Asset {
  id: string;
  asset_symbol: string;
  is_active: boolean;
  current_profit_percent: number;
  engine_decision: string;
}

export default function AssetActivation() {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  const assetSymbols = ['BTC', 'ETH', 'BNB', 'USDT', 'XRP', 'SOL'];

  useEffect(() => {
    loadAssets();
  }, [user]);

  const loadAssets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('trading_assets')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const existingSymbols = data?.map((a) => a.asset_symbol) || [];
      const missingSymbols = assetSymbols.filter((s) => !existingSymbols.includes(s));

      if (missingSymbols.length > 0) {
        const newAssets = missingSymbols.map((symbol) => ({
          user_id: user.id,
          asset_symbol: symbol,
          is_active: true,
          current_profit_percent: 0,
          engine_decision: 'HOLD',
        }));

        await supabase.from('trading_assets').insert(newAssets);

        const { data: allData } = await supabase
          .from('trading_assets')
          .select('*')
          .eq('user_id', user.id);

        setAssets(allData || []);
      } else {
        setAssets(data || []);
      }
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAsset = async (assetId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('trading_assets')
        .update({ is_active: !currentState })
        .eq('id', assetId);

      if (error) throw error;

      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === assetId ? { ...asset, is_active: !currentState } : asset
        )
      );
    } catch (error) {
      console.error('Error toggling asset:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Asset Activation</h3>
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Asset Activation</h3>

      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-lg flex items-center justify-center border border-teal-500/30">
                  <span className="font-bold text-teal-400 text-sm">{asset.asset_symbol}</span>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Profit %</p>
                    <p
                      className={`text-sm font-bold flex items-center gap-1 ${
                        asset.current_profit_percent > 0
                          ? 'text-green-400'
                          : asset.current_profit_percent < 0
                          ? 'text-red-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {asset.current_profit_percent > 0 && <TrendingUp className="w-3 h-3" />}
                      {asset.current_profit_percent < 0 && <TrendingDown className="w-3 h-3" />}
                      {asset.current_profit_percent === 0 && <Minus className="w-3 h-3" />}
                      {asset.current_profit_percent.toFixed(2)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        asset.is_active
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {asset.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-1">Decision</p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        asset.engine_decision === 'BUY'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : asset.engine_decision === 'SELL'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {asset.engine_decision}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleAsset(asset.id, asset.is_active)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  asset.is_active ? 'bg-teal-500' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    asset.is_active ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
