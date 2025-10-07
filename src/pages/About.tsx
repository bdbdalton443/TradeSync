import { Users, Target, Award, TrendingUp } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Emily Watson',
      role: 'Head of Trading',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'David Kim',
      role: 'Lead Data Scientist',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'To democratize access to professional-grade trading technology and empower traders worldwide.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in security, performance, and customer satisfaction.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously pushing boundaries with cutting-edge AI and machine learning technologies.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive ecosystem where traders can learn, grow, and succeed together.',
    },
  ];

  const milestones = [
    { year: '2019', event: 'TradeSync founded with a vision to revolutionize automated trading' },
    { year: '2020', event: 'Launched beta platform with 500 early adopters' },
    { year: '2021', event: 'Reached $500M in trading volume and expanded to 50 countries' },
    { year: '2022', event: 'Introduced AI-powered predictive analytics engine' },
    { year: '2023', event: 'Surpassed 10,000 active traders and $1B in volume' },
    { year: '2024', event: 'Achieved $2.4B+ total volume and 99.9% uptime' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="text-teal-400">TradeSync</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We're on a mission to make sophisticated trading technology accessible to everyone.
            Founded in 2019 by a team of trading veterans and AI researchers, TradeSync combines
            decades of market expertise with cutting-edge artificial intelligence.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-400">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-teal-500/40 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">Key milestones in our growth</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-500 to-blue-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 inline-block hover:border-teal-500/40 transition-all">
                      <div className="text-2xl font-bold text-teal-400 mb-2">{milestone.year}</div>
                      <p className="text-gray-300">{milestone.event}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-4 h-4 bg-teal-500 rounded-full border-4 border-gray-950"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-400">The team behind TradeSync</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-teal-500/40 transition-all group"
              >
                <div className="aspect-square overflow-hidden bg-gray-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-teal-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">5+</div>
              <div className="text-gray-400">Years in Business</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">15K+</div>
              <div className="text-gray-400">Active Traders</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">$2.4B+</div>
              <div className="text-gray-400">Total Volume</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">150+</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
