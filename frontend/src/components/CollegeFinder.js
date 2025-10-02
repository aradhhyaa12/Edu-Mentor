import React, { useState, useEffect } from 'react';

const CollegeFinder = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: '',
    course_type: '',
    search: ''
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, colleges]);

  const fetchColleges = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/colleges`);
      if (response.ok) {
        const data = await response.json();
        setColleges(data);
        setFilteredColleges(data);
      } else {
        console.error('Failed to fetch colleges');
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = colleges;

    if (filters.state) {
      filtered = filtered.filter(college => 
        college.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.course_type) {
      filtered = filtered.filter(college => 
        college.courses.includes(filters.course_type)
      );
    }

    if (filters.search) {
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        college.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredColleges(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      state: '',
      course_type: '',
      search: ''
    });
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
              Find Your Perfect 
              <span className="gradient-text-orange block">College</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the best colleges and universities for your dream course. 
              Filter by location, course type, and more to find your ideal match.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Filters Section */}
        <div className="card mb-8">
          <h3 className="text-xl font-display font-bold text-gray-800 mb-6">Filter Colleges</h3>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="form-label">Search</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="College name or location..."
                className="form-input"
                data-testid="search-input"
              />
            </div>
            
            <div>
              <label className="form-label">State</label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="form-input"
                data-testid="state-filter"
              >
                <option value="">All States</option>
                <option value="Bihar">Bihar</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Course Type</label>
              <select
                name="course_type"
                value={filters.course_type}
                onChange={handleFilterChange}
                className="form-input"
                data-testid="course-filter"
              >
                <option value="">All Courses</option>
                <option value="B.Tech">B.Tech</option>
                <option value="B.Pharma">B.Pharma</option>
                <option value="BPT">BPT</option>
                <option value="BHMS">BHMS</option>
                <option value="BAMS">BAMS</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="btn-secondary w-full"
                data-testid="clear-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span data-testid="results-count">
              Showing {filteredColleges.length} of {colleges.length} colleges
            </span>
            <div className="flex items-center gap-4">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Name A-Z</option>
                <option>Rating</option>
                <option>Fees (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {filteredColleges.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Colleges Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or contact us for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={clearFilters} className="btn-primary">
                Clear All Filters
              </button>
              <a href="tel:6203803252" className="btn-secondary">
                Call for Help
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredColleges.map((college, index) => (
              <div
                key={college.id}
                className="card hover:shadow-xl transition-all duration-300"
                data-testid={`college-card-${index}`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-32 lg:h-32 w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-4xl text-white font-bold">
                    {college.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-600 mb-2">
                          <div className="flex items-center gap-2">
                            <span>📍</span>
                            <span>{college.location}, {college.state}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📅</span>
                            <span>Est. {college.established_year}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {renderStars(college.rating)}
                          </div>
                          <span className="text-gray-600 text-sm">({college.rating}/5)</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {college.fees_range}
                        </div>
                        <div className="text-gray-500 text-sm">Annual Fees</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {college.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Available Courses:</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.courses.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="btn-primary flex-1 justify-center" data-testid={`apply-btn-${index}`}>
                        <span>📝</span>
                        Apply Now
                      </button>
                      <button className="btn-secondary flex-1 justify-center" data-testid={`info-btn-${index}`}>
                        <span>ℹ️</span>
                        More Info
                      </button>
                      <button className="btn-secondary justify-center" data-testid={`compare-btn-${index}`}>
                        <span>⚖️</span>
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 glass-card p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
            Need Help Choosing the Right College?
          </h3>
          <p className="text-gray-600 mb-6">
            Our expert counsellors can help you find the perfect college based on your preferences, 
            budget, and career goals. Get personalized recommendations today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book-appointment"
              className="btn-primary"
              data-testid="book-counselling-btn"
            >
              <span>📅</span>
              Book Free Counselling
            </a>
            <a
              href="tel:6203803252"
              className="btn-secondary"
              data-testid="call-expert-btn"
            >
              <span>📞</span>
              Call Expert: 6203803252
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeFinder;