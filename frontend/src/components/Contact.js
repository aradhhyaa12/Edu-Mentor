import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your enquiry has been submitted successfully. We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitMessage('Sorry, there was an error submitting your enquiry. Please try again or call us directly.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitMessage('Sorry, there was an error submitting your enquiry. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Ready to Start Your 
            <span className="gradient-text-orange block">Educational Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact our expert counsellors today for personalized guidance and free consultation. 
            We're here to help you achieve your dreams.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-orange-red rounded-xl flex items-center justify-center text-xl">
                    📞
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Phone Numbers</h4>
                    <p className="text-gray-600 mb-1">
                      <a href="tel:6203803252" className="hover:text-orange-600 transition-colors" data-testid="phone-1">
                        6203803252
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:6202198223" className="hover:text-orange-600 transition-colors" data-testid="phone-2">
                        6202198223
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-teal-blue rounded-xl flex items-center justify-center text-xl">
                    📧
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@edumentor.com" className="hover:text-orange-600 transition-colors" data-testid="email">
                        info@edumentor.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-xl">
                    💬
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">WhatsApp</h4>
                    <p className="text-gray-600">
                      <a 
                        href="https://wa.me/916203803252" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
                        data-testid="whatsapp"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
                    📍
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Office Location</h4>
                    <p className="text-gray-600">
                      Patna, Bihar, India<br />
                      (Visit by appointment only)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
                    ⏰
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Working Hours</h4>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-4">
              <a
                href="tel:6203803252"
                className="btn-primary w-full justify-center py-4 text-lg"
                data-testid="call-now-btn"
              >
                <span>📞</span>
                Call Now for Free Consultation
              </a>
              <a
                href="https://wa.me/916203803252?text=Hi, I want to know about admission counselling services"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center py-4 text-lg"
                data-testid="whatsapp-btn"
              >
                <span>💬</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">
              Send us a Message
            </h3>

            {submitMessage && (
              <div className={`p-4 rounded-lg mb-6 ${submitMessage.includes('Thank you') ? 'success-message' : 'error-message'}`}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                    data-testid="name-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your phone number"
                    data-testid="phone-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your email address"
                  data-testid="email-input"
                />
              </div>

              <div>
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  data-testid="subject-input"
                >
                  <option value="">Select a subject</option>
                  <option value="Career Counselling">Career Counselling</option>
                  <option value="College Admission">College Admission</option>
                  <option value="Bihar Student Credit Card">Bihar Student Credit Card</option>
                  <option value="Scholarship Information">Scholarship Information</option>
                  <option value="Course Information">Course Information</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="form-input resize-vertical"
                  placeholder="Tell us about your requirements, preferred courses, or any specific questions you have..."
                  data-testid="message-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <span>📨</span>
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm text-center">
                By submitting this form, you agree to our terms and conditions. 
                We will contact you within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 glass-card p-8">
          <h3 className="text-2xl font-display font-bold text-gray-800 text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">How much do your services cost?</h4>
                <p className="text-gray-600 text-sm">
                  Our initial consultation is completely FREE. Other services are priced affordably 
                  based on the level of assistance required.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Do you guarantee admission?</h4>
                <p className="text-gray-600 text-sm">
                  While we can't guarantee admission, our 95% success rate speaks for our expertise 
                  in guiding students to the right colleges and courses.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">What is the Bihar Student Credit Card scheme?</h4>
                <p className="text-gray-600 text-sm">
                  It's a government initiative providing up to ₹4 lakhs education loan at 4% interest 
                  for Bihar students. We provide complete guidance for this scheme.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">How long does the admission process take?</h4>
                <p className="text-gray-600 text-sm">
                  The process varies by course and college, typically ranging from 2-8 weeks. 
                  We guide you through each step to ensure timely completion.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Do you help with scholarships?</h4>
                <p className="text-gray-600 text-sm">
                  Yes! We help identify and apply for various merit-based and need-based scholarships 
                  to reduce your education costs significantly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Can you help with out-of-state admissions?</h4>
                <p className="text-gray-600 text-sm">
                  Absolutely! We have partnerships with colleges across India and can guide you 
                  for admissions in any state based on your preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;