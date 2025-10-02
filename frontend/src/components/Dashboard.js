import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch applications
      const appsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/applications`, { headers });
      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        setApplications(appsData);
      }

      // Fetch appointments
      const appointmentsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/appointments`, { headers });
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'submitted': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-purple-100 text-purple-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'applications', label: 'Applications', icon: '📝' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card">
          <div className="text-3xl font-bold text-blue-600 mb-2" data-testid="total-applications">
            {applications.length}
          </div>
          <div className="text-gray-600 text-sm">Total Applications</div>
        </div>
        <div className="stats-card">
          <div className="text-3xl font-bold text-green-600 mb-2" data-testid="approved-applications">
            {applications.filter(app => app.status === 'approved').length}
          </div>
          <div className="text-gray-600 text-sm">Approved</div>
        </div>
        <div className="stats-card">
          <div className="text-3xl font-bold text-purple-600 mb-2" data-testid="upcoming-appointments">
            {appointments.filter(apt => apt.status === 'scheduled').length}
          </div>
          <div className="text-gray-600 text-sm">Upcoming Appointments</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Recent Applications</h3>
          {applications.slice(0, 3).map((app, index) => (
            <div key={app.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-800">Application #{app.id.slice(-6)}</p>
                <p className="text-sm text-gray-600">{app.applied_date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                {app.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          ))}
          {applications.length === 0 && (
            <p className="text-gray-500 text-center py-4">No applications yet</p>
          )}
        </div>

        <div className="card">
          <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Upcoming Appointments</h3>
          {appointments.filter(apt => apt.status === 'scheduled').slice(0, 3).map((apt, index) => (
            <div key={apt.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-800">{apt.purpose}</p>
                <p className="text-sm text-gray-600">{apt.appointment_date} at {apt.appointment_time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                {apt.status.toUpperCase()}
              </span>
            </div>
          ))}
          {appointments.filter(apt => apt.status === 'scheduled').length === 0 && (
            <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/apply"
            className="btn-primary text-center justify-center p-4"
            data-testid="quick-apply-btn"
          >
            <span className="text-xl mb-2 block">📝</span>
            New Application
          </a>
          <a
            href="/book-appointment"
            className="btn-secondary text-center justify-center p-4"
            data-testid="quick-appointment-btn"
          >
            <span className="text-xl mb-2 block">📅</span>
            Book Appointment
          </a>
          <a
            href="/college-finder"
            className="btn-secondary text-center justify-center p-4"
            data-testid="quick-college-finder-btn"
          >
            <span className="text-xl mb-2 block">🔍</span>
            Find Colleges
          </a>
          <a
            href="tel:6203803252"
            className="btn-secondary text-center justify-center p-4"
            data-testid="quick-call-btn"
          >
            <span className="text-xl mb-2 block">📞</span>
            Call Support
          </a>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-gray-800">My Applications</h3>
        <a
          href="/apply"
          className="btn-primary"
          data-testid="new-application-btn"
        >
          <span>➕</span>
          New Application
        </a>
      </div>

      {applications.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">No Applications Yet</h4>
          <p className="text-gray-600 mb-6">Start your journey by submitting your first application</p>
          <a href="/apply" className="btn-primary">
            Submit First Application
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={app.id} className="card" data-testid={`application-card-${index}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Application #{app.id.slice(-6)}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Applied Date:</strong> {app.applied_date}</p>
                      <p><strong>College:</strong> {app.college_id}</p>
                    </div>
                    <div>
                      <p><strong>Course:</strong> {app.course_id}</p>
                      <p><strong>Documents:</strong> {app.documents.length} files</p>
                    </div>
                  </div>
                  {app.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700"><strong>Notes:</strong> {app.notes}</p>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-gray-800">My Appointments</h3>
        <a
          href="/book-appointment"
          className="btn-primary"
          data-testid="book-appointment-btn"
        >
          <span>📅</span>
          Book Appointment
        </a>
      </div>

      {appointments.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Scheduled</h4>
          <p className="text-gray-600 mb-6">Book a consultation with our expert counsellors</p>
          <a href="/book-appointment" className="btn-primary">
            Book First Appointment
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt, index) => (
            <div key={apt.id} className="card" data-testid={`appointment-card-${index}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {apt.purpose}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Date:</strong> {apt.appointment_date}</p>
                      <p><strong>Time:</strong> {apt.appointment_time}</p>
                    </div>
                    <div>
                      <p><strong>Created:</strong> {new Date(apt.created_at).toLocaleDateString()}</p>
                      {apt.counsellor_id && (
                        <p><strong>Counsellor:</strong> Assigned</p>
                      )}
                    </div>
                  </div>
                  {apt.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700"><strong>Notes:</strong> {apt.notes}</p>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  {apt.status === 'scheduled' && (
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display font-bold text-gray-800">Profile Settings</h3>
      
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">First Name</label>
            <input
              type="text"
              defaultValue={user?.first_name}
              className="form-input"
              data-testid="profile-first-name"
            />
          </div>
          <div>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              defaultValue={user?.last_name}
              className="form-input"
              data-testid="profile-last-name"
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="form-input"
              data-testid="profile-email"
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="form-input"
              data-testid="profile-phone"
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-primary">
            Update Profile
          </button>
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h5 className="font-medium text-gray-800">Email Notifications</h5>
              <p className="text-sm text-gray-600">Receive updates about your applications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h5 className="font-medium text-gray-800">SMS Notifications</h5>
              <p className="text-sm text-gray-600">Get appointment reminders via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="card border-red-200">
        <h4 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h4>
        <div className="space-y-4">
          <button
            onClick={logout}
            className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"
            data-testid="logout-btn"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 gradient-orange-red rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="font-display text-xl font-bold text-gray-800">Edu-Mentor</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.first_name}!</span>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.first_name?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-orange-100 text-orange-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    data-testid={`nav-${item.id}`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'applications' && renderApplications()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;