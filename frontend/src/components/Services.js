import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "🎯",
      title: "Career Counselling",
      description: "Expert guidance to choose the right career path based on your interests and aptitude.",
      features: ["One-on-one sessions", "Career assessment", "Industry insights", "Future scope analysis"]
    },
    {
      icon: "🏛️",
      title: "College Selection",
      description: "Find the perfect college that matches your academic goals and budget requirements.",
      features: ["College comparison", "Fee structure analysis", "Location preferences", "Placement records"]
    },
    {
      icon: "📋",
      title: "Application Support",
      description: "Complete assistance with application forms, documentation, and submission process.",
      features: ["Form filling", "Document verification", "Application tracking", "Deadline management"]
    },
    {
      icon: "💳",
      title: "Bihar Student Credit Card",
      description: "Special guidance for Bihar Student Credit Card scheme with simplified documentation.",
      features: ["Eligibility check", "Documentation help", "Application process", "Loan guidance"]
    },
    {
      icon: "🎓",
      title: "Scholarship Guidance",
      description: "Help you find and apply for various scholarships to reduce your education cost.",
      features: ["Scholarship search", "Merit-based options", "Need-based assistance", "Application support"]
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Round-the-clock support for all your admission related queries and concerns.",
      features: ["Phone support", "WhatsApp assistance", "Email support", "Emergency help"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Comprehensive Education 
            <span className="gradient-text-orange block">Consulting Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From career counselling to college admission - we provide end-to-end support 
            to make your educational journey smooth and successful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="card group hover:shadow-2xl"
              style={{animationDelay: `${index * 0.1}s`}}
              data-testid={`service-card-${index}`}
            >
              <div className="mb-6">
                <div className="w-16 h-16 gradient-orange-red rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center gap-2 group">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Book a free consultation session with our expert counsellors and get personalized guidance for your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book-appointment"
                className="btn-primary"
                data-testid="book-consultation-btn"
              >
                <span>📅</span>
                Book Free Consultation
              </a>
              <a
                href="tel:6203803252"
                className="btn-secondary"
                data-testid="call-now-btn"
              >
                <span>📞</span>
                Call Now: 6203803252
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;