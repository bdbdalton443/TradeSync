import { TrendingUp, TrendingDown, Activity, DollarSign, Target, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import EngineControls from '../components/EngineControls';
import ManualOrderPanel from '../components/ManualOrderPanel';
import AssetActivation from '../components/AssetActivation';
import AccountActivation from '../components/AccountActivation';

interface AssetValue {
  symbol: string;
  value: number;
  change: number;
}

interface TradingData {
  entryCount: number;
  currentAsset: string;
  previousPrice: number;
  currentPrice: number;
  cumulativeProfit: number;
  weekProfit: number;
  canWithdraw: number;
  nextCarried: number;
  lastHourPrice: number;
  lastQuickBatch: number;
  currentQuickPL: number;
  targetProfit: number;
  targetBatch: number;
  assets: AssetValue[];
  accountTotal: number;
  accountProfit: number;
  nextBatchTarget: number;
  currentDirection: string;
  nextHourDirection: string;
  availableSellable: number;
  activeLevel: number;
  prevLevel: number;
  tradeAmount: number;
  buyFeeUsdt: number;
  sellFee: number;
  plUSDT: number;
  totalUsdtNow: number;
  targetBuyingPrice: number;
  targetSellingPrice: number;
  freeBTC: number;
  freeSOL: number;
  lastBuy: number;
  lastSell: number;
  resumeBuyAt: number;
  limitTradeMin: number;
  limitTradeMax: number;
}

export default function Dashboard() {
  const [data, setData] = useState<TradingData>({
    entryCount: 49,
    currentAsset: 'SOL',
    previousPrice: 228.11,
    currentPrice: 228.40,
    cumulativeProfit: 1547.32,
    weekProfit: 324.67,
    canWithdraw: 1083.12,
    nextCarried: 464.20,
    lastHourPrice: 227.85,
    lastQuickBatch: 1905.00,
    currentQuickPL: -108.61,
    targetProfit: 7.62,
    targetBatch: 1913.00,
    assets: [
      { symbol: 'BTC', value: 4523.45, change: 2.4 },
      { symbol: 'ETH', value: 2341.23, change: -1.2 },
      { symbol: 'BNB', value: 876.54, change: 0.8 },
      { symbol: 'USDT', value: 12456.78, change: 0.0 },
      { symbol: 'XRP', value: 543.21, change: 3.1 },
      { symbol: 'SOL', value: 3421.87, change: 1.5 },
    ],
    accountTotal: 24163.08,
    accountProfit: 1547.32,
    nextBatchTarget: 1913.00,
    currentDirection: 'BULLISH',
    nextHourDirection: 'NEUTRAL',
    availableSellable: 15.234,
    activeLevel: 3,
    prevLevel: 2,
    tradeAmount: 228.40,
    buyFeeUsdt: 0.23,
    sellFee: 0.34,
    plUSDT: 0.29,
    totalUsdtNow: 12456.78,
    targetBuyingPrice: 227.85,
    targetSellingPrice: 229.12,
    freeBTC: 0.0453,
    freeSOL: 14.987,
    lastBuy: 227.90,
    lastSell: 228.35,
    resumeBuyAt: 227.50,
    limitTradeMin: 10.00,
    limitTradeMax: 500.00,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        currentPrice: prev.currentPrice + (Math.random() - 0.5) * 0.5,
        currentQuickPL: prev.currentQuickPL + (Math.random() - 0.5) * 2,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const priceChange = data.currentPrice - data.previousPrice;
  const priceChangePercent = (priceChange / data.previousPrice) * 100;
  const batchProgress = ((data.lastQuickBatch + Math.abs(data.currentQuickPL)) / data.targetBatch) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Activity className="w-8 h-8 text-teal-400 animate-pulse" />
              <div>
                <h1 className="text-2xl font-bold text-teal-400">Trading Engine Dashboard</h1>
                <p className="text-sm text-gray-400 mt-1">
                  {data.entryCount}……New Entry……{data.currentAsset}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-teal-500/30">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-teal-400 font-semibold">LIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-400" />
              Price & Profit
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Previous Price</p>
                <p className="text-xl font-bold text-gray-300">${data.previousPrice.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-teal-500/40">
                <p className="text-xs text-gray-400 mb-1">Current Price</p>
                <p className="text-xl font-bold text-teal-400">${data.currentPrice.toFixed(2)}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Last Hour Price</p>
                <p className="text-xl font-bold text-gray-300">${data.lastHourPrice.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg p-3 border border-green-500/40">
                <p className="text-xs text-gray-400 mb-1">Cumulative Profit</p>
                <p className="text-xl font-bold text-green-400">${data.cumulativeProfit.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">This Week's Profit</p>
                <p className="text-lg font-semibold text-green-400">${data.weekProfit.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Can Withdraw (70%)</p>
                <p className="text-lg font-semibold text-teal-400">${data.canWithdraw.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Next Carried (30%)</p>
                <p className="text-lg font-semibold text-amber-400">${data.nextCarried.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-400" />
              Quick Batch
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Last Quick Batch</p>
                <p className="text-2xl font-bold text-gray-200">${data.lastQuickBatch.toFixed(2)}</p>
              </div>
              <div className={`rounded-lg p-3 border ${data.currentQuickPL >= 0 ? 'bg-green-900/20 border-green-500/40' : 'bg-red-900/20 border-red-500/40'}`}>
                <p className="text-xs text-gray-400 mb-1">Current Quick P/L</p>
                <p className={`text-2xl font-bold ${data.currentQuickPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${data.currentQuickPL.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Target Profit</p>
                <p className="text-lg font-semibold text-teal-400">${data.targetProfit.toFixed(5)}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-teal-500/40">
                <p className="text-xs text-gray-400 mb-2">Target Batch</p>
                <p className="text-xl font-bold text-teal-400 mb-2">${data.targetBatch.toFixed(2)}</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(batchProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{batchProgress.toFixed(1)}% complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-400" />
              Asset Values (USDT)
            </h2>
            <div className="space-y-2">
              {data.assets.map((asset) => (
                <div key={asset.symbol} className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-lg flex items-center justify-center border border-teal-500/30">
                      <span className="font-bold text-teal-400 text-sm">{asset.symbol}</span>
                    </div>
                    <span className="font-semibold text-gray-300">{asset.symbol}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-200">${asset.value.toFixed(2)}</p>
                    <p className={`text-xs flex items-center justify-end gap-1 ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Account Total:</span>
                  <span className="font-bold text-lg text-teal-400">${data.accountTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Account Profit:</span>
                  <span className="font-bold text-lg text-green-400">${data.accountProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Next Batch Target:</span>
                  <span className="font-bold text-lg text-amber-400">${data.nextBatchTarget.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-teal-400">Current Asset Info</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Free BTC</p>
                  <p className="text-sm font-semibold text-gray-200">{data.freeBTC.toFixed(4)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Free SOL</p>
                  <p className="text-sm font-semibold text-gray-200">{data.freeSOL.toFixed(3)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Last Buy</p>
                  <p className="text-sm font-semibold text-blue-400">${data.lastBuy.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Last Sell</p>
                  <p className="text-sm font-semibold text-orange-400">${data.lastSell.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-teal-500/40">
                  <p className="text-xs text-gray-400 mb-1">Resume Buy At</p>
                  <p className="text-sm font-semibold text-teal-400">${data.resumeBuyAt.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">LimitTrade Min</p>
                  <p className="text-sm font-semibold text-gray-200">${data.limitTradeMin.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 col-span-2">
                  <p className="text-xs text-gray-400 mb-1">LimitTrade Max</p>
                  <p className="text-sm font-semibold text-gray-200">${data.limitTradeMax.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-teal-400">Prediction</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Current Direction:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    data.currentDirection === 'BULLISH' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                    data.currentDirection === 'BEARISH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {data.currentDirection}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Next Hour Direction:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    data.nextHourDirection === 'BULLISH' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                    data.nextHourDirection === 'BEARISH' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {data.nextHourDirection}
                  </span>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Available Sellable</p>
                  <p className="text-lg font-bold text-teal-400">{data.availableSellable.toFixed(3)} {data.currentAsset}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 relative">
                    <p className="text-xs text-gray-400 mb-2">Active Level</p>
                    <div className="flex items-center justify-center">
                      <div className="relative w-16 h-16">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-700" />
                          <circle
                            cx="32" cy="32" r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-teal-400"
                            strokeDasharray={`${(data.activeLevel / 5) * 175.93} 175.93`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold text-teal-400">{data.activeLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 relative">
                    <p className="text-xs text-gray-400 mb-2">Prev Level</p>
                    <div className="flex items-center justify-center">
                      <div className="relative w-16 h-16">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-700" />
                          <circle
                            cx="32" cy="32" r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-400"
                            strokeDasharray={`${(data.prevLevel / 5) * 175.93} 175.93`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-400">{data.prevLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            Trade Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Trade Amount</p>
              <p className="text-sm font-bold text-gray-200">${data.tradeAmount.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Buy Fee (USDT)</p>
              <p className="text-sm font-bold text-red-400">${data.buyFeeUsdt.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Sell Fee</p>
              <p className="text-sm font-bold text-red-400">${data.sellFee.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">P/L (USDT)</p>
              <p className={`text-sm font-bold ${data.plUSDT >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${data.plUSDT.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Total USDT Now</p>
              <p className="text-sm font-bold text-teal-400">${data.totalUsdtNow.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-blue-500/40">
              <p className="text-xs text-gray-400 mb-1">Target Buy Price</p>
              <p className="text-sm font-bold text-blue-400">${data.targetBuyingPrice.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-orange-500/40">
              <p className="text-xs text-gray-400 mb-1">Target Sell Price</p>
              <p className="text-sm font-bold text-orange-400">${data.targetSellingPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <EngineControls />
          </div>
          <div>
            <AccountActivation />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ManualOrderPanel />
          <AssetActivation />
        </div>
      </div>
    </div>
  );
}
