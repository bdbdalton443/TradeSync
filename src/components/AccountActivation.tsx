import { useState, useEffect } from 'react';
import { Power, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function AccountActivation() {
  const { user } = useAuth();
  const [accountActive, setAccountActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccountStatus();
  }, [user]);

  const loadAccountStatus = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_settings')
        .select('account_active')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setAccountActive(data.account_active);
      }
    } catch (error) {
      console.error('Error loading account status:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccount = async () => {
    if (!user) return;

    try {
      const newStatus = !accountActive;

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          account_active: newStatus,
        });

      if (error) throw error;

      setAccountActive(newStatus);
    } catch (error) {
      console.error('Error toggling account:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Power className="w-5 h-5 text-teal-400" />
        Account Activation
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                accountActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}
            ></div>
            <div>
              <p className="text-white font-medium">
                Account Status: {accountActive ? 'Active' : 'Deactivated'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {accountActive
                  ? 'All trading automation is enabled'
                  : 'All trading automation is paused'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleAccount}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              accountActive ? 'bg-green-500' : 'bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                accountActive ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {!accountActive && (
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 text-sm font-medium mb-1">Account Deactivated</p>
              <p className="text-amber-400/80 text-xs">
                Your trading bot is currently paused. Enable your account to resume automated trading.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
