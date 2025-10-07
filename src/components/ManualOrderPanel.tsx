import { useState } from 'react';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function ManualOrderPanel() {
  const { user } = useAuth();
  const [asset, setAsset] = useState('BTC');
  const [orderType, setOrderType] = useState('MARKET');
  const [orderSide, setOrderSide] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const assets = ['BTC', 'ETH', 'BNB', 'USDT', 'XRP', 'SOL'];

  const handlePlaceOrder = async () => {
    if (!user || !amount) return;

    setLoading(true);

    try {
      const { error } = await supabase.from('manual_orders').insert({
        user_id: user.id,
        asset_symbol: asset,
        order_type: orderType,
        order_side: orderSide,
        amount_usdt: parseFloat(amount),
        status: 'pending',
      });

      if (error) throw error;

      setSuccess(true);
      setAmount('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-teal-400" />
        Manual Order Panel
      </h3>

      {success && (
        <div className="mb-4 bg-green-500/10 border border-green-500/40 rounded-lg p-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <p className="text-green-400 text-sm">Order placed successfully!</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Asset</label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              {assets.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order Side</label>
            <select
              value={orderSide}
              onChange={(e) => setOrderSide(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount (USDT)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="100.00"
            />
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading || !amount}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            orderSide === 'BUY'
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50'
              : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/50'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {loading ? 'Placing Order...' : `Place ${orderSide} Order`}
        </button>
      </div>
    </div>
  );
}
