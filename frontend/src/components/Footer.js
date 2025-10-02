import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Courses', href: '#courses' },
    { name: 'College Finder', href: '/college-finder' },
    { name: 'Success Stories', href: '#testimonials' }
  ];

  const services = [
    { name: 'Career Counselling', href: '#services' },
    { name: 'College Admission', href: '#services' },
    { name: 'Bihar Student Credit Card', href: '#services' },
    { name: 'Scholarship Guidance', href: '#services' },
    { name: 'Application Support', href: '#services' },
    { name: 'Document Assistance', href: '#services' }
  ];

  const courses = [
    { name: 'B.Tech Engineering', href: '#courses' },
    { name: 'B.Pharma', href: '#courses' },
    { name: 'BPT Physiotherapy', href: '#courses' },
    { name: 'BHMS Homeopathy', href: '#courses' },
    { name: 'BAMS Ayurveda', href: '#courses' },
    { name: 'Diploma Engineering', href: '#courses' }
  ];

  const contactInfo = [
    { icon: '📞', text: '6203803252', href: 'tel:6203803252' },
    { icon: '📞', text: '6202198223', href: 'tel:6202198223' },
    { icon: '📧', text: 'info@edumentor.com', href: 'mailto:info@edumentor.com' },
    { icon: '📍', text: 'Patna, Bihar, India', href: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 gradient-orange-red rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-white">Edu-Mentor Services</h1>
                <p className="text-xs text-gray-400">15+ Years of Excellence</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in educational success. We've helped over 10,000 students 
              achieve their dreams with expert counselling and comprehensive admission support.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-orange-400">✨</span>
                <span className="text-gray-300 text-sm">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-orange-400">🎯</span>
                <span className="text-gray-300 text-sm">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-orange-400">🏆</span>
                <span className="text-gray-300 text-sm">10,000+ Students Helped</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
                📸
              </a>
              <a href="https://wa.me/916203803252" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
                💬
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2"
                    data-testid={`quick-link-${index}`}
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2"
                    data-testid={`service-link-${index}`}
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Courses */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6">Contact Info</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-lg">{contact.icon}</span>
                  <a
                    href={contact.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                    data-testid={`contact-info-${index}`}
                  >
                    {contact.text}
                  </a>
                </div>
              ))}
            </div>

            <h4 className="text-md font-display font-bold mb-4">Popular Courses</h4>
            <ul className="space-y-2">
              {courses.slice(0, 4).map((course, index) => (
                <li key={index}>
                  <a
                    href={course.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-xs flex items-center gap-2"
                    data-testid={`course-link-${index}`}
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates about admission notifications, scholarships, and career guidance.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                data-testid="newsletter-input"
              />
              <button className="btn-primary px-6" data-testid="newsletter-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>© {currentYear} Edu-Mentor Services. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-orange-400 transition-colors">Refund Policy</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span>Online Support Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕒</span>
                <span>Mon-Sat: 9AM-7PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a
          href="https://wa.me/916203803252?text=Hi, I want to know about admission counselling services"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-all"
          data-testid="whatsapp-float"
          title="Chat on WhatsApp"
        >
          💬
        </a>
        <a
          href="tel:6203803252"
          className="w-14 h-14 gradient-orange-red hover:opacity-90 rounded-full flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-all"
          data-testid="call-float"
          title="Call Now"
        >
          📞
        </a>
      </div>
    </footer>
  );
};

export default Footer;