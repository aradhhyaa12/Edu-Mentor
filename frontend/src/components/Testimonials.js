import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultTestimonials = [
    {
      id: 1,
      student_name: "Rahul Kumar",
      course: "B.Tech Computer Science",
      college: "IIT Patna",
      message: "Edu-Mentor Services made my dream come true! Their guidance helped me secure admission in IIT Patna with scholarship. The counselling team was incredibly supportive throughout the entire process.",
      rating: 5,
      photo_url: "https://images.unsplash.com/photo-1577036421869-7c8d388d2123?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxzdHVkZW50cyUyMHN1Y2Nlc3N8ZW58MHx8fHwxNzU5Mzg4NTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 2,
      student_name: "Priya Singh",
      course: "B.Pharma",
      college: "BIT Mesra",
      message: "Thanks to Edu-Mentor, I not only got admission but also received a merit scholarship. Their knowledge about the Bihar Student Credit Card scheme was invaluable for my family.",
      rating: 5,
      photo_url: "https://images.unsplash.com/photo-1628887590815-2860da1c2900?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxzdHVkZW50cyUyMHN1Y2Nlc3N8ZW58MHx8fHwxNzU5Mzg4NTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 3,
      student_name: "Amit Sharma",
      course: "BPT (Physiotherapy)",
      college: "Patna Medical College",
      message: "The team at Edu-Mentor provided excellent career counselling. They helped me understand different healthcare career options and choose the best path for my future.",
      rating: 4.8,
      photo_url: "https://images.unsplash.com/photo-1628887590437-940b8e74e43a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxzdHVkZW50cyUyMHN1Y2Nlc3N8ZW58MHx8fHwxNzU5Mzg4NTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 4,
      student_name: "Sneha Kumari",
      course: "BHMS",
      college: "Government Homeopathy College",
      message: "Excellent service! They guided me through the entire admission process for BHMS and helped with all documentation. Highly recommended for medical course aspirants.",
      rating: 4.9,
      photo_url: "https://images.pexels.com/photos/7699527/pexels-photo-7699527.jpeg"
    }
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/testimonials?featured_only=true`);
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.length > 0 ? data : defaultTestimonials);
      } else {
        setTestimonials(defaultTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(defaultTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <section id="testimonials" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading success stories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            What Our Students 
            <span className="gradient-text-orange block">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful students who achieved their educational dreams with our guidance. 
            Here are some of their inspiring journey stories.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="stats-card" data-testid="success-stat-1">
            <div className="text-3xl font-bold text-orange-600 mb-2">10,000+</div>
            <div className="text-gray-600 text-sm">Students Helped</div>
          </div>
          <div className="stats-card" data-testid="success-stat-2">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600 text-sm">Success Rate</div>
          </div>
          <div className="stats-card" data-testid="success-stat-3">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div className="stats-card" data-testid="success-stat-4">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600 text-sm">Partner Colleges</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card animate-fade-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
              data-testid={`testimonial-card-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.photo_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"}
                  alt={testimonial.student_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                  data-testid={`testimonial-photo-${index}`}
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">
                    {testimonial.student_name}
                  </h4>
                  <p className="text-orange-600 font-medium text-sm mb-1">
                    {testimonial.course}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    {testimonial.college}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="text-gray-600 text-sm">({testimonial.rating}/5)</span>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 leading-relaxed italic">
                "{testimonial.message}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students who have achieved their dreams with our expert guidance. 
              Your success story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book-appointment"
                className="btn-primary"
                data-testid="start-journey-btn"
              >
                <span>🚀</span>
                Start Your Journey
              </a>
              <a
                href="tel:6203803252"
                className="btn-secondary"
                data-testid="speak-counsellor-btn"
              >
                <span>💬</span>
                Speak to a Counsellor
              </a>
            </div>
          </div>
        </div>

        {/* Achievement Gallery */}
        <div className="mt-16">
          <h3 className="text-2xl font-display font-bold text-gray-800 text-center mb-8">
            Recent Success Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1577036421869-7c8d388d2123?w=300&h=200&fit=crop"
              alt="Graduation celebration"
              className="w-full h-32 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-testid="achievement-image-1"
            />
            <img
              src="https://images.unsplash.com/photo-1628887590815-2860da1c2900?w=300&h=200&fit=crop"
              alt="Student success"
              className="w-full h-32 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-testid="achievement-image-2"
            />
            <img
              src="https://images.unsplash.com/photo-1628887590437-940b8e74e43a?w=300&h=200&fit=crop"
              alt="Academic achievement"
              className="w-full h-32 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-testid="achievement-image-3"
            />
            <img
              src="https://images.pexels.com/photos/7699527/pexels-photo-7699527.jpeg?w=300&h=200&fit=crop"
              alt="Counselling success"
              className="w-full h-32 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-testid="achievement-image-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;