import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const ApplicationForm = () => {
  const { user } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    college_id: '',
    course_id: '',
    documents: [],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetchCollegesAndCourses();
  }, []);

  const fetchCollegesAndCourses = async () => {
    try {
      const [collegesRes, coursesRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/colleges`),
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courses`)
      ]);

      if (collegesRes.ok) {
        const collegesData = await collegesRes.json();
        setColleges(collegesData);
      }

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...fileNames]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Application submitted successfully! We will review your application and contact you soon.');
        setFormData({
          college_id: '',
          course_id: '',
          documents: [],
          notes: ''
        });
        setStep(4); // Success step
      } else {
        const errorData = await response.json();
        setSubmitMessage(errorData.detail || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitMessage('An error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const selectedCollege = colleges.find(c => c.id === formData.college_id);
  const selectedCourse = courses.find(c => c.id === formData.course_id);
  const availableCourses = courses.filter(course => 
    selectedCollege?.courses.includes(course.course_type)
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= stepNumber
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < 3 && (
            <div
              className={`w-16 h-1 mx-2 ${
                step > stepNumber ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
          Select College & Course
        </h3>
        <p className="text-gray-600">Choose your preferred college and course for admission</p>
      </div>

      <div>
        <label className="form-label">Select College *</label>
        <select
          name="college_id"
          value={formData.college_id}
          onChange={handleInputChange}
          required
          className="form-input"
          data-testid="college-select"
        >
          <option value="">Choose a college</option>
          {colleges.map(college => (
            <option key={college.id} value={college.id}>
              {college.name} - {college.location}
            </option>
          ))}
        </select>
      </div>

      {selectedCollege && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">College Information</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Location:</strong> {selectedCollege.location}, {selectedCollege.state}</p>
            <p><strong>Fees Range:</strong> {selectedCollege.fees_range}</p>
            <p><strong>Rating:</strong> {selectedCollege.rating}/5</p>
            <p><strong>Established:</strong> {selectedCollege.established_year}</p>
          </div>
        </div>
      )}

      <div>
        <label className="form-label">Select Course *</label>
        <select
          name="course_id"
          value={formData.course_id}
          onChange={handleInputChange}
          required
          disabled={!selectedCollege}
          className="form-input disabled:bg-gray-100"
          data-testid="course-select"
        >
          <option value="">
            {selectedCollege ? 'Choose a course' : 'Select college first'}
          </option>
          {availableCourses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.course_type}) - {course.duration}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Course Information</h4>
          <div className="text-sm text-green-700 space-y-1">
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Eligibility:</strong> {selectedCourse.eligibility}</p>
            <p><strong>Description:</strong> {selectedCourse.description}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={nextStep}
          disabled={!formData.college_id || !formData.course_id}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="next-step-btn"
        >
          Next Step
          <span>→</span>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
          Upload Documents
        </h3>
        <p className="text-gray-600">Upload required documents for your application</p>
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 mb-2">Required Documents:</h4>
        <div className="text-sm text-orange-700 grid md:grid-cols-2 gap-2">
          <div>• 10th Mark Sheet</div>
          <div>• 12th Mark Sheet</div>
          <div>• Transfer Certificate</div>
          <div>• Character Certificate</div>
          <div>• Passport Size Photos</div>
          <div>• Caste Certificate (if applicable)</div>
        </div>
      </div>

      <div>
        <label className="form-label">Upload Documents</label>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleDocumentUpload}
          className="form-input"
          data-testid="document-upload"
        />
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: PDF, JPG, PNG (Max 5MB each)
        </p>
      </div>

      {formData.documents.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Uploaded Documents:</h4>
          <div className="space-y-2">
            {formData.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <span className="text-gray-700">{doc}</span>
                </div>
                <button
                  onClick={() => removeDocument(index)}
                  className="text-red-600 hover:text-red-700 font-medium text-sm"
                  data-testid={`remove-doc-${index}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="form-label">Additional Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          className="form-input"
          placeholder="Any additional information, special requirements, or questions..."
          data-testid="notes-input"
        />
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary" data-testid="prev-step-btn">
          <span>←</span>
          Previous
        </button>
        <button onClick={nextStep} className="btn-primary" data-testid="review-btn">
          Review Application
          <span>→</span>
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
          Review & Submit
        </h3>
        <p className="text-gray-600">Please review your application details before submitting</p>
      </div>

      <div className="card bg-gray-50">
        <h4 className="font-semibold text-gray-800 mb-4">Application Summary</h4>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-700">Selected College:</h5>
              <p className="text-gray-600">{selectedCollege?.name}</p>
              <p className="text-gray-500 text-sm">{selectedCollege?.location}, {selectedCollege?.state}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-700">Selected Course:</h5>
              <p className="text-gray-600">{selectedCourse?.name}</p>
              <p className="text-gray-500 text-sm">{selectedCourse?.course_type} - {selectedCourse?.duration}</p>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700">Documents Uploaded:</h5>
            <p className="text-gray-600">{formData.documents.length} files</p>
            {formData.documents.length > 0 && (
              <div className="mt-2">
                {formData.documents.map((doc, index) => (
                  <span key={index} className="inline-block bg-white px-2 py-1 rounded text-xs text-gray-600 mr-2 mb-1">
                    {doc}
                  </span>
                ))}
              </div>
            )}
          </div>

          {formData.notes && (
            <div>
              <h5 className="font-medium text-gray-700">Additional Notes:</h5>
              <p className="text-gray-600">{formData.notes}</p>
            </div>
          )}
        </div>
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-lg ${submitMessage.includes('successfully') ? 'success-message' : 'error-message'}`}>
          {submitMessage}
        </div>
      )}

      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 mb-2">What happens next?</h4>
        <div className="text-sm text-orange-700 space-y-1">
          <p>• We'll review your application within 2-3 business days</p>
          <p>• You'll receive confirmation via email and SMS</p>
          <p>• Our counsellor will contact you for further guidance</p>
          <p>• We'll assist with the college admission process</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary" data-testid="prev-review-btn">
          <span>←</span>
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="submit-application-btn"
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              Submitting...
            </>
          ) : (
            <>
              <span>📝</span>
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="text-6xl mb-4">✅</div>
      <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">
        Application Submitted Successfully!
      </h3>
      <p className="text-xl text-gray-600 mb-6">
        Thank you for choosing Edu-Mentor Services. We've received your application and will process it soon.
      </p>
      
      <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto">
        <h4 className="font-semibold text-green-800 mb-3">Next Steps:</h4>
        <div className="text-sm text-green-700 space-y-2 text-left">
          <p>1. Check your email for confirmation</p>
          <p>2. Our counsellor will call you within 24 hours</p>
          <p>3. We'll guide you through the admission process</p>
          <p>4. Track your application in the dashboard</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/dashboard" className="btn-primary">
          <span>📊</span>
          View Dashboard
        </a>
        <a href="/" className="btn-secondary">
          <span>🏠</span>
          Back to Home
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
              College Admission
              <span className="gradient-text-orange block">Application Form</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey towards your dream college. Fill out this application 
              and our expert counsellors will guide you through the entire process.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            {step < 4 && renderStepIndicator()}
            
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;