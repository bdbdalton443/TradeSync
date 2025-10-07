import { useState, useEffect } from 'react';
import { Play, Square, DollarSign, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function EngineControls() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForceSell, setShowForceSell] = useState(false);

  useEffect(() => {
    loadEngineStatus();
  }, [user]);

  const loadEngineStatus = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('engine_status')
        .select('is_running')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setIsRunning(data.is_running);
      }
    } catch (error) {
      console.error('Error loading engine status:', error);
    }
  };

  const handleStartEngine = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('engine_status').upsert({
        user_id: user.id,
        is_running: true,
        last_started_at: new Date().toISOString(),
      });

      if (error) throw error;
      setIsRunning(true);
    } catch (error) {
      console.error('Error starting engine:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopEngine = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('engine_status').upsert({
        user_id: user.id,
        is_running: false,
        last_stopped_at: new Date().toISOString(),
      });

      if (error) throw error;
      setIsRunning(false);
    } catch (error) {
      console.error('Error stopping engine:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForceTakeProfit = () => {
    console.log('Force take batch profit triggered');
  };

  const handleForceSell = (priceType: 'max' | 'min') => {
    console.log(`Force sell at ${priceType} target price triggered`);
    setShowForceSell(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-4">Engine Controls</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}
            ></div>
            <span className="text-gray-300 font-medium">
              Engine Status: {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleStartEngine}
            disabled={loading || isRunning}
            className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Start Engine
          </button>

          <button
            onClick={handleStopEngine}
            disabled={loading || !isRunning}
            className="py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square className="w-5 h-5" />
            Stop Engine
          </button>
        </div>

        <button
          onClick={handleForceTakeProfit}
          disabled={!isRunning}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DollarSign className="w-5 h-5" />
          Force Take Batch Profit
        </button>

        <div className="relative">
          <button
            onClick={() => setShowForceSell(!showForceSell)}
            disabled={!isRunning}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-5 h-5" />
            Force Sell Orders
          </button>

          {showForceSell && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 p-2 space-y-2">
              <button
                onClick={() => handleForceSell('max')}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-all text-left"
              >
                At Maximum Target Sell Price
              </button>
              <button
                onClick={() => handleForceSell('min')}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-all text-left"
              >
                At Minimum Target Sell Price
              </button>
            </div>
          )}
        </div>

        {!isRunning && (
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-400 text-xs">
              Engine is currently stopped. Start the engine to enable automated trading.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
