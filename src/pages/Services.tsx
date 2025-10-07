import { Bot, BarChart3, Shield, Bell, Zap, Database, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      icon: Bot,
      title: 'AI Trading Bot',
      description: 'Fully automated trading with advanced machine learning algorithms that adapt to market conditions in real-time.',
      features: [
        'Multi-asset support (BTC, ETH, SOL, XRP, BNB)',
        'Customizable trading strategies',
        '24/7 automated execution',
        'Risk management controls',
      ],
      price: 'Starting at $199/month',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive market analysis tools with predictive insights and real-time data visualization.',
      features: [
        'Real-time market data feeds',
        'Predictive price analysis',
        'Custom indicators and charts',
        'Portfolio performance tracking',
      ],
      price: 'Starting at $99/month',
    },
    {
      icon: Shield,
      title: 'Risk Management Suite',
      description: 'Professional-grade risk controls to protect your capital and optimize position sizing.',
      features: [
        'Stop-loss automation',
        'Position sizing calculator',
        'Drawdown protection',
        'Portfolio diversification tools',
      ],
      price: 'Starting at $149/month',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Intelligent notification system that keeps you informed of critical market movements and trading opportunities.',
      features: [
        'Price action alerts',
        'Pattern recognition notifications',
        'Multi-channel delivery (SMS, Email, Push)',
        'Custom alert conditions',
      ],
      price: 'Starting at $49/month',
    },
    {
      icon: Zap,
      title: 'High-Frequency Trading',
      description: 'Lightning-fast execution with sub-millisecond latency for competitive advantage in volatile markets.',
      features: [
        'Co-located servers',
        'Direct exchange connections',
        'Arbitrage opportunity detection',
        'Ultra-low latency execution',
      ],
      price: 'Custom pricing',
    },
    {
      icon: Database,
      title: 'API Access',
      description: 'Complete API suite for custom integrations and building your own trading applications.',
      features: [
        'RESTful and WebSocket APIs',
        'Real-time market data',
        'Order management',
        'Comprehensive documentation',
      ],
      price: 'Starting at $299/month',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for individual traders getting started',
      features: [
        'AI Trading Bot (1 strategy)',
        'Advanced Analytics',
        'Smart Alerts',
        'Email support',
        'Up to $10K trading capital',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'For serious traders seeking advanced features',
      features: [
        'AI Trading Bot (5 strategies)',
        'Advanced Analytics',
        'Risk Management Suite',
        'Smart Alerts',
        'Priority support',
        'Up to $100K trading capital',
        'API Access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for institutions',
      features: [
        'Unlimited strategies',
        'All premium features',
        'High-Frequency Trading',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited trading capital',
        'White-label options',
        '24/7 phone support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Our <span className="text-teal-400">Services</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Comprehensive trading solutions designed to give you the competitive edge.
            Choose from our suite of professional tools or combine them for maximum impact.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-xl text-gray-400">Professional-grade tools for every trading need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-teal-500/40 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-teal-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-teal-400 font-semibold">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-400">Flexible pricing to match your trading goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-gray-900 rounded-xl p-8 relative ${
                  plan.popular
                    ? 'border-2 border-teal-500 shadow-lg shadow-teal-500/20'
                    : 'border border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-teal-400">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:shadow-lg hover:shadow-teal-500/50'
                      : 'bg-gray-800 text-teal-400 border border-teal-500/40 hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Our enterprise team can build tailored trading systems to meet your specific requirements
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
