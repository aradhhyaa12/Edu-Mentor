import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch admin stats
      const statsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/stats`, { headers });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch applications
      const appsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/applications`, { headers });
      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        setApplications(appsData);
      }

      // Fetch enquiries
      const enquiriesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/enquiries`, { headers });
      if (enquiriesResponse.ok) {
        const enquiriesData = await enquiriesResponse.json();
        setEnquiries(enquiriesData);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'applications', label: 'Applications', icon: '📝' },
    { id: 'enquiries', label: 'Enquiries', icon: '💬' },
    { id: 'colleges', label: 'Colleges', icon: '🏛️' },
    { id: 'users', label: 'Users', icon: '👥' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'submitted': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-purple-100 text-purple-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2" data-testid="total-students">
                {stats.total_students || 0}
              </div>
              <div className="text-gray-600 text-sm">Total Students</div>
            </div>
            <div className="text-4xl text-blue-500">👥</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2" data-testid="total-applications">
                {stats.total_applications || 0}
              </div>
              <div className="text-gray-600 text-sm">Applications</div>
            </div>
            <div className="text-4xl text-green-500">📝</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2" data-testid="total-colleges">
                {stats.total_colleges || 0}
              </div>
              <div className="text-gray-600 text-sm">Partner Colleges</div>
            </div>
            <div className="text-4xl text-orange-500">🏛️</div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2" data-testid="pending-enquiries">
                {stats.pending_enquiries || 0}
              </div>
              <div className="text-gray-600 text-sm">Pending Enquiries</div>
            </div>
            <div className="text-4xl text-red-500">❗</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Recent Applications</h3>
          <div className="space-y-3">
            {applications.slice(0, 5).map((app, index) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Application #{app.id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">{app.applied_date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                  {app.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Recent Enquiries</h3>
          <div className="space-y-3">
            {enquiries.slice(0, 5).map((enquiry, index) => (
              <div key={enquiry.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800">{enquiry.name}</p>
                  <span className={`px-2 py-1 rounded text-xs ${enquiry.is_resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {enquiry.is_resolved ? 'Resolved' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{enquiry.subject}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(enquiry.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-display font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('applications')}
            className="btn-primary text-center justify-center p-4"
            data-testid="view-applications-btn"
          >
            <span className="text-xl mb-2 block">📝</span>
            Manage Applications
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className="btn-secondary text-center justify-center p-4"
            data-testid="view-enquiries-btn"
          >
            <span className="text-xl mb-2 block">💬</span>
            Handle Enquiries
          </button>
          <button
            onClick={() => setActiveTab('colleges')}
            className="btn-secondary text-center justify-center p-4"
            data-testid="manage-colleges-btn"
          >
            <span className="text-xl mb-2 block">🏛️</span>
            Manage Colleges
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className="btn-secondary text-center justify-center p-4"
            data-testid="manage-users-btn"
          >
            <span className="text-xl mb-2 block">👥</span>
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-gray-800">All Applications</h3>
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="btn-primary">
            Export Data
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Application ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50" data-testid={`application-row-${index}`}>
                  <td className="py-3 px-4">#{app.id.slice(-6)}</td>
                  <td className="py-3 px-4">{app.student_id.slice(-6)}</td>
                  <td className="py-3 px-4">{app.course_id.slice(-6)}</td>
                  <td className="py-3 px-4">{app.applied_date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Approve
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEnquiries = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-gray-800">All Enquiries</h3>
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
          </select>
          <button className="btn-primary">
            Mark All Read
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {enquiries.map((enquiry, index) => (
          <div key={enquiry.id} className="card" data-testid={`enquiry-card-${index}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{enquiry.name}</h4>
                <p className="text-gray-600">{enquiry.email} | {enquiry.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${enquiry.is_resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {enquiry.is_resolved ? 'Resolved' : 'Pending'}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(enquiry.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-1">Subject: {enquiry.subject}</h5>
              <p className="text-gray-600">{enquiry.message}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Reply
              </button>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Mark Resolved
              </button>
              <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                Call Student
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderColleges = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-gray-800">Manage Colleges</h3>
        <button className="btn-primary" data-testid="add-college-btn">
          <span>➕</span>
          Add New College
        </button>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏛️</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">College Management</h4>
          <p className="text-gray-600 mb-6">
            Add, edit, and manage partner colleges and their course offerings.
          </p>
          <button className="btn-primary">
            Add First College
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold text-gray-800">User Management</h3>
        <button className="btn-primary" data-testid="add-user-btn">
          <span>➕</span>
          Add New User
        </button>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">User Management</h4>
          <p className="text-gray-600 mb-6">
            Manage student accounts, counsellor access, and user permissions.
          </p>
          <button className="btn-primary">
            Manage Users
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
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
                <span className="font-display text-xl font-bold text-gray-800">Edu-Mentor Admin</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.first_name}!</span>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
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
                    data-testid={`admin-nav-${item.id}`}
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
            {activeTab === 'enquiries' && renderEnquiries()}
            {activeTab === 'colleges' && renderColleges()}
            {activeTab === 'users' && renderUsers()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;