import React, { useState } from 'react';
import { useAuth } from '../App';

const AppointmentBooking = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    purpose: '',
    notes: ''
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Appointment booked successfully! We will confirm your appointment soon.');
        setFormData({
          appointment_date: '',
          appointment_time: '',
          purpose: '',
          notes: ''
        });
      } else {
        const errorData = await response.json();
        setSubmitMessage(errorData.detail || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setSubmitMessage('An error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const purposeOptions = [
    'Career Counselling',
    'College Selection',
    'Application Assistance',
    'Bihar Student Credit Card Guidance',
    'Scholarship Information',
    'Document Verification',
    'General Inquiry'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
              Book Your Free
              <span className="gradient-text-orange block">Counselling Session</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule a one-on-one consultation with our expert counsellors. 
              Get personalized guidance for your educational journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Booking Form */}
            <div className="card">
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">
                Schedule Your Appointment
              </h3>

              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 ${submitMessage.includes('successfully') ? 'success-message' : 'error-message'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="appointment-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="appointment_date" className="form-label">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="appointment_date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={handleInputChange}
                      min={minDate}
                      max={maxDateStr}
                      required
                      className="form-input"
                      data-testid="date-input"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Available: Tomorrow to {maxDate.toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="appointment_time" className="form-label">
                      Preferred Time *
                    </label>
                    <select
                      id="appointment_time"
                      name="appointment_time"
                      value={formData.appointment_time}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      data-testid="time-input"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="purpose" className="form-label">
                    Purpose of Consultation *
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    data-testid="purpose-input"
                  >
                    <option value="">Select consultation purpose</option>
                    {purposeOptions.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="form-label">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input resize-vertical"
                    placeholder="Tell us about your specific requirements, questions, or any information that would help us prepare for your consultation..."
                    data-testid="notes-input"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Before Your Appointment:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Keep your academic documents ready</li>
                    <li>• Prepare questions about courses and colleges</li>
                    <li>• Have your career preferences in mind</li>
                    <li>• Note down your budget constraints</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="book-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <span>📅</span>
                      Book Free Appointment
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm text-center">
                  Need immediate assistance? 
                  <a href="tel:6203803252" className="text-orange-600 hover:text-orange-700 font-semibold ml-1">
                    Call us at 6203803252
                  </a>
                </p>
              </div>
            </div>

            {/* Information Section */}
            <div className="space-y-6">
              
              {/* Counsellor Info */}
              <div className="card">
                <h4 className="text-xl font-display font-bold text-gray-800 mb-4">
                  Meet Our Expert Counsellors
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl">
                      👨‍🎓
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">Mr. Rajesh Kumar</h5>
                      <p className="text-orange-600 text-sm mb-1">Senior Career Counsellor</p>
                      <p className="text-gray-600 text-sm">15+ years experience in education consulting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-2xl">
                      👩‍🏫
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">Ms. Priya Singh</h5>
                      <p className="text-orange-600 text-sm mb-1">Admission Specialist</p>
                      <p className="text-gray-600 text-sm">Expert in medical and engineering admissions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Overview */}
              <div className="card">
                <h4 className="text-xl font-display font-bold text-gray-800 mb-4">
                  What We'll Cover
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500">✓</span>
                    <span className="text-gray-700">Career assessment and guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500">✓</span>
                    <span className="text-gray-700">College and course recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500">✓</span>
                    <span className="text-gray-700">Application process walkthrough</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500">✓</span>
                    <span className="text-gray-700">Scholarship and financial aid options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500">✓</span>
                    <span className="text-gray-700">Document preparation assistance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500">✓</span>
                    <span className="text-gray-700">Timeline and deadline management</span>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="card">
                <h4 className="text-xl font-display font-bold text-gray-800 mb-4">
                  Other Ways to Connect
                </h4>
                <div className="space-y-4">
                  <a
                    href="tel:6203803252"
                    className="flex items-center gap-4 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    data-testid="call-option"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">Call Now</h5>
                      <p className="text-gray-600 text-sm">6203803252 | 6202198223</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/916203803252"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    data-testid="whatsapp-option"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">WhatsApp Chat</h5>
                      <p className="text-gray-600 text-sm">Get instant responses</p>
                    </div>
                  </a>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">⏰</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">Office Hours</h5>
                        <p className="text-gray-600 text-sm">Mon-Sat: 9AM-7PM | Sun: 10AM-4PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Stats */}
              <div className="card bg-gradient-to-r from-orange-50 to-red-50">
                <h4 className="text-xl font-display font-bold text-gray-800 mb-4">
                  Our Success Record
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">95%</div>
                    <div className="text-gray-600 text-sm">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">10,000+</div>
                    <div className="text-gray-600 text-sm">Students Helped</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">500+</div>
                    <div className="text-gray-600 text-sm">Partner Colleges</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">15+</div>
                    <div className="text-gray-600 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;