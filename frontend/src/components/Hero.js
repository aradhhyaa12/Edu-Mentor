import React from 'react';

const Hero = ({ onGetStarted }) => {
  const heroImage = "https://images.unsplash.com/photo-1606660956148-5291deb68185?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN1Y2Nlc3N8ZW58MHx8fHwxNzU5Mzg4NTk0fDA&ixlib=rb-4.1.0&q=85";
  
  return (
    <section id="home" className="min-h-screen pt-20 hero-gradient hero-pattern overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                ✨ 15+ Years of Excellence in Education
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Your Dream College 
              <span className="block gradient-text-white">
                Admission Guaranteed
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Join 10,000+ successful students who achieved their dreams with our expert counselling. 
              From B.Tech to Medical courses - we make your admission journey seamless.
            </p>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1" data-testid="students-helped">10,000+</div>
                <div className="text-white/80 text-sm">Students Helped</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1" data-testid="success-rate">95%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onGetStarted}
                className="btn-primary bg-white text-orange-500 hover:bg-gray-50 transform hover:scale-105"
                data-testid="get-free-counselling-btn"
              >
                <span>🎯</span>
                Get Free Counselling
              </button>
              <a
                href="#services"
                className="btn-secondary border-white text-white hover:bg-white hover:text-orange-500"
                data-testid="explore-services-btn"
              >
                <span>📚</span>
                Explore Services
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Bihar Student Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Scholarship Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Document Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Students achieving success in university"
                className="w-full h-auto rounded-2xl shadow-2xl animate-float"
                data-testid="hero-image"
              />
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-orange-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">15+ Years</div>
                    <div className="text-gray-600 text-sm">Experience</div>
                  </div>
                </div>
              </div>

              {/* Floating Success Card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl animate-float" style={{animationDelay: '2s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-teal-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">10,000+</div>
                    <div className="text-gray-600 text-sm">Success Stories</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 right-0 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;