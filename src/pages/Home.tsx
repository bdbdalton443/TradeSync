import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Shield, Zap, BarChart3, Target, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };
  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Trading',
      description: 'Advanced algorithms analyze market trends in real-time to maximize your returns',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Bank-level security with 99.9% uptime guarantee for uninterrupted trading',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute trades in milliseconds with our optimized infrastructure',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards with live data and predictive insights',
    },
    {
      icon: Target,
      title: 'Smart Targeting',
      description: 'Automated profit targeting and risk management strategies',
    },
    {
      icon: Clock,
      title: '24/7 Monitoring',
      description: 'Round-the-clock market surveillance and opportunity detection',
    },
  ];

  const stats = [
    { value: '$2.4B+', label: 'Total Volume Traded' },
    { value: '15,000+', label: 'Active Traders' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '24/7', label: 'Support Available' },
  ];

  const benefits = [
    'No hidden fees or commissions',
    'Advanced risk management tools',
    'Multi-asset trading support',
    'Real-time market predictions',
    'Dedicated account manager',
    'API access for custom integrations',
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <span className="text-teal-400 text-sm font-medium">Live Trading Engine Active</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> AI Trading</span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed">
                Leverage cutting-edge artificial intelligence to automate your trading strategy.
                Our platform delivers consistent results with advanced predictive analytics and real-time market insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all group"
                >
                  {user ? 'Go to Dashboard' : 'Get Started Today'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-teal-400 border border-teal-500/40 rounded-lg font-semibold hover:bg-gray-700 transition-all"
                >
                  View Dashboard
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-400">{stat.value}</span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Current P/L</span>
                    <span className="text-2xl font-bold text-green-400">+$1,547.32</span>
                  </div>
                  <div className="h-48 bg-gray-800/50 rounded-lg flex items-end gap-2 p-4">
                    {[65, 72, 68, 85, 78, 92, 88, 95, 90, 98, 94, 100].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-1">Win Rate</p>
                      <p className="text-lg font-bold text-green-400">87.3%</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-1">Trades</p>
                      <p className="text-lg font-bold text-teal-400">1,249</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-1">ROI</p>
                      <p className="text-lg font-bold text-blue-400">34.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Professional Traders
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed in modern cryptocurrency trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-teal-500/40 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Why Choose TradeSync?
              </h2>
              <p className="text-lg text-gray-400">
                Our platform combines institutional-grade technology with user-friendly interfaces,
                making advanced trading accessible to everyone.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                >
                  Explore Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-400 mb-2">5+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-400 mb-2">50+</div>
                  <div className="text-gray-400">Trading Pairs</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-400 mb-2">98%</div>
                  <div className="text-gray-400">Customer Satisfaction</div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-teal-400 mb-2">150+</div>
                  <div className="text-gray-400">Countries Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Trading Smarter?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of traders who trust TradeSync for their automated trading needs
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all text-lg"
          >
            {user ? 'Go to Dashboard' : 'Get Started Now'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
