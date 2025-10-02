import React from 'react';

const Courses = () => {
  const courseImage = "https://images.unsplash.com/photo-1589104760192-ccab0ce0d90f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxlZHVjYXRpb24lMjBjb3Vuc2VsaW5nfGVufDB8fHx8MTc1OTM4ODU4OHww&ixlib=rb-4.1.0&q=85";

  const courses = [
    {
      title: "B.Tech (Engineering)",
      duration: "4 Years",
      eligibility: "12th PCM (75%+)",
      fees: "₹2-8 Lakhs",
      careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Electronics Engineer"],
      description: "Comprehensive engineering program with specializations in Computer Science, Mechanical, Civil, Electronics, and more.",
      color: "from-blue-500 to-cyan-500",
      icon: "⚙️"
    },
    {
      title: "B.Pharma",
      duration: "4 Years",
      eligibility: "12th PCM/PCB (50%+)",
      fees: "₹1-5 Lakhs",
      careers: ["Pharmacist", "Drug Inspector", "Research Analyst", "Quality Control"],
      description: "Pharmaceutical sciences program focusing on drug development, manufacturing, and healthcare.",
      color: "from-green-500 to-emerald-500",
      icon: "💊"
    },
    {
      title: "BPT (Physiotherapy)",
      duration: "4.5 Years",
      eligibility: "12th PCB (50%+)",
      fees: "₹2-6 Lakhs",
      careers: ["Physiotherapist", "Sports Therapist", "Rehabilitation Specialist", "Health Consultant"],
      description: "Healthcare program focusing on physical rehabilitation and therapeutic treatments.",
      color: "from-orange-500 to-red-500",
      icon: "🏥"
    },
    {
      title: "BHMS (Homeopathy)",
      duration: "5.5 Years",
      eligibility: "12th PCB (50%+)",
      fees: "₹1-4 Lakhs",
      careers: ["Homeopathic Doctor", "Health Consultant", "Researcher", "Hospital Administrator"],
      description: "Alternative medicine program focusing on homeopathic treatment and natural healing.",
      color: "from-purple-500 to-pink-500",
      icon: "🌿"
    },
    {
      title: "BAMS (Ayurveda)",
      duration: "5.5 Years",
      eligibility: "12th PCB (50%+)",
      fees: "₹1-3 Lakhs",
      careers: ["Ayurvedic Doctor", "Wellness Consultant", "Therapist", "Researcher"],
      description: "Traditional Indian medicine program combining ancient Ayurvedic principles with modern healthcare.",
      color: "from-teal-500 to-blue-500",
      icon: "🕉️"
    },
    {
      title: "Diploma Engineering",
      duration: "3 Years",
      eligibility: "10th (50%+)",
      fees: "₹50K-2 Lakhs",
      careers: ["Technical Assistant", "Junior Engineer", "Supervisor", "Technician"],
      description: "Technical diploma program providing practical engineering skills and industry-ready training.",
      color: "from-indigo-500 to-purple-500",
      icon: "🔧"
    }
  ];

  return (
    <section id="courses" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Popular Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Choose Your 
            <span className="gradient-text-orange block">Dream Course</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of courses across engineering, medical, and technical fields. 
            Find the perfect program that aligns with your career aspirations.
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-16">
          <div className="glass-card p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">
                  Bihar Student Credit Card Scheme
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Special assistance for Bihar students to get education loans up to ₹4 lakhs at 4% interest rate. 
                  We provide complete guidance for documentation and application process.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Up to ₹4 Lakhs loan amount</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Only 4% annual interest rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">No collateral required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Complete documentation support</span>
                  </div>
                </div>
                <button className="btn-primary" data-testid="credit-card-info-btn">
                  <span>💳</span>
                  Learn About Credit Card Scheme
                </button>
              </div>
              <div className="relative">
                <img
                  src={courseImage}
                  alt="Students studying together"
                  className="w-full h-auto rounded-2xl shadow-lg"
                  data-testid="course-section-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="course-card group"
              style={{animationDelay: `${index * 0.1}s`}}
              data-testid={`course-card-${index}`}
            >
              <div className={`h-2 bg-gradient-to-r ${course.color} rounded-t-2xl`}></div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{course.duration}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Eligibility:</span>
                    <span className="text-gray-800 font-medium text-sm">{course.eligibility}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Fees Range:</span>
                    <span className="text-green-600 font-bold text-sm">{course.fees}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-gray-800 font-semibold mb-2 text-sm">Career Opportunities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careers.slice(0, 2).map((career, careerIndex) => (
                      <span 
                        key={careerIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                      >
                        {career}
                      </span>
                    ))}
                    {course.careers.length > 2 && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-xs font-medium">
                        +{course.careers.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 btn-primary text-sm py-2">
                    Apply Now
                  </button>
                  <button className="flex-1 btn-secondary text-sm py-2">
                    Get Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
              Can't Find Your Course?
            </h3>
            <p className="text-gray-600 mb-6">
              We cover over 100+ courses across various fields. Contact our counsellors for personalized course recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/college-finder"
                className="btn-primary"
                data-testid="explore-colleges-btn"
              >
                <span>🔍</span>
                Explore All Colleges
              </a>
              <button className="btn-secondary" data-testid="custom-counselling-btn">
                <span>💬</span>
                Get Custom Counselling
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;