// pages/CrowdSourced.jsx
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Filter, 
  Search, 
  MapPin, 
  Clock, 
  ChevronDown,
  ChevronUp,
  Download,
  MoreVertical,
  Eye,
  Archive,
  Flag,
  User,
  Navigation,
  CheckCircle,
  XCircle,
  Image,
  BarChart3,
  TrendingUp,
  Map
} from 'lucide-react';

const CrowdSourced = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [expandedReport, setExpandedReport] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Sample reports data
  const reports = [
    {
      id: 1,
      type: 'Flood',
      location: 'Beachside Community',
      description: 'Water levels rising rapidly in the beachside area. Several roads are already impassable. Residents are advised to evacuate immediately and move to higher ground. Emergency services have been notified.',
      severity: 'High',
      time: '2 hours ago',
      status: 'New',
      reporter: 'John D.',
      coordinates: '12.3456, 98.7654',
      media: ['flood1.jpg', 'flood2.jpg'],
      verified: false
    },
    {
      id: 2,
      type: 'Tsunami Alert',
      location: 'North Bay Area',
      description: 'Unusual wave activity detected. Possible tsunami warning. Coastal areas should be evacuated immediately. Waves expected to reach 3-5 meters in height.',
      severity: 'Critical',
      time: '5 hours ago',
      status: 'In Progress',
      reporter: 'Sarah M.',
      coordinates: '12.5678, 98.9012',
      media: ['wave1.jpg'],
      verified: true
    },
    {
      id: 3,
      type: 'Strong Current',
      location: 'West Harbor',
      description: 'Dangerous rip currents observed. Multiple swimmers rescued. Lifeguards have posted warning signs and are monitoring the situation closely.',
      severity: 'Medium',
      time: '1 day ago',
      status: 'Resolved',
      reporter: 'Coastal Guard',
      coordinates: '12.1234, 98.5678',
      media: ['current1.jpg', 'current2.jpg'],
      verified: true
    },
    {
      id: 4,
      type: 'Oil Spill',
      location: 'South Coast',
      description: 'Oil slick spotted approximately 2 miles offshore. The spill appears to be spreading. Environmental response team has been dispatched to assess the situation.',
      severity: 'High',
      time: '2 days ago',
      status: 'New',
      reporter: 'Fisherman Bob',
      coordinates: '12.8765, 98.4321',
      media: ['oil1.jpg'],
      verified: false
    },
    {
      id: 5,
      type: 'Marine Life',
      location: 'Coral Bay',
      description: 'Unusual number of jellyfish in swimming areas. Some species may be dangerous. Swimmers are advised to avoid the area until further notice.',
      severity: 'Low',
      time: '3 days ago',
      status: 'Resolved',
      reporter: 'Lifeguard Team',
      coordinates: '12.1111, 98.2222',
      media: ['jellyfish1.jpg'],
      verified: true
    },
    {
      id: 6,
      type: 'Infrastructure',
      location: 'Pier Area',
      description: 'Damaged safety railings on the main pier. Structural engineers have been called to assess the damage. Temporary barriers have been installed.',
      severity: 'Medium',
      time: '4 days ago',
      status: 'In Progress',
      reporter: 'Local Business',
      coordinates: '12.9999, 98.8888',
      media: ['pier1.jpg', 'pier2.jpg'],
      verified: false
    },
  ];

  // Extract unique locations for filter
  const locations = ['All', ...new Set(reports.map(report => report.location))];
  const statuses = ['All', 'New', 'In Progress', 'Resolved'];
  const severities = ['All', 'Low', 'Medium', 'High', 'Critical'];

  // Filter reports based on selected filters and search term
  const filteredReports = reports.filter(report => {
    const matchesSearch = searchTerm === '' || 
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'All' || report.location === locationFilter;
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    const matchesSeverity = severityFilter === 'All' || report.severity === severityFilter;

    return matchesSearch && matchesLocation && matchesStatus && matchesSeverity;
  });

  // Get most reported locations
  const locationCounts = reports.reduce((acc, report) => {
    acc[report.location] = (acc[report.location] || 0) + 1;
    return acc;
  }, {});

  const mostReportedLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const toggleExpand = (id) => {
    if (expandedReport === id) {
      setExpandedReport(null);
    } else {
      setExpandedReport(id);
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-l-4 border-red-500';
      case 'High': return 'bg-orange-100 text-orange-800 border-l-4 border-orange-500';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
      case 'Low': return 'bg-green-100 text-green-800 border-l-4 border-green-500';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Crowd Sourced Reports</h1>
              <p className="text-gray-600">
                Hazard reports submitted by ResQWave app users
              </p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-colors">
              <Download size={16} className="mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Dashboard Overview Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="mr-2 text-blue-600" size={24} />
            Overview Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-gray-800">{reports.length}</div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
              <div className="text-2xl font-bold text-red-600">{reports.filter(r => r.status === 'New').length}</div>
              <div className="text-sm text-gray-600">New Reports</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
              <div className="text-2xl font-bold text-blue-600">{reports.filter(r => r.status === 'In Progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'Resolved').length}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </div>
        </div>

        {/* Location Hotspots Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Map className="mr-2 text-orange-600" size={24} />
            Location Hotspots
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Areas with Most Reports</h3>
            <div className="space-y-4">
              {mostReportedLocations.map(([location, count], index) => (
                <div key={location} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="ml-3 text-gray-700">{location}</span>
                  </div>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {count} {count === 1 ? 'report' : 'reports'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Filter className="mr-2 text-indigo-600" size={24} />
            Report Filtering
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow">
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports by type, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                  {showFilters ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Severity</label>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                  >
                    {severities.map(severity => (
                      <option key={severity} value={severity}>{severity}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-green-600" size={24} />
            Most Recent Hazard Reports
          </h2>
          
          <div className="space-y-5">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <div key={report.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="p-6 cursor-pointer" onClick={() => toggleExpand(report.id)}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${
                          report.severity === 'Critical' ? 'bg-red-100 text-red-600' : 
                          report.severity === 'High' ? 'bg-orange-100 text-orange-600' : 
                          report.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-green-100 text-green-600'
                        }`}>
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-800">{report.type}</h3>
                            {report.verified ? (
                              <CheckCircle size={16} className="ml-2 text-green-500" />
                            ) : (
                              <XCircle size={16} className="ml-2 text-gray-400" />
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <User size={14} className="mr-1" />
                            {report.reporter}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div className="text-right">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={14} className="mr-1" />
                            {report.time}
                          </div>
                          <div className="mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                        <div>
                          {expandedReport === report.id ? (
                            <ChevronUp size={20} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <MapPin size={14} className="mr-1" />
                        {report.location}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.severity === 'Critical' ? 'bg-red-100 text-red-800' : 
                        report.severity === 'High' ? 'bg-orange-100 text-orange-800' : 
                        report.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {report.severity} Severity
                      </div>
                    </div>
                  </div>
                  
                  {expandedReport === report.id && (
                    <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                          <p className="text-gray-600">{report.description}</p>
                          
                          <div className="mt-4 flex items-center text-sm text-gray-600">
                            <Navigation size={14} className="mr-2" />
                            <span className="font-medium">Coordinates:</span> 
                            <span className="ml-1">{report.coordinates}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Media Attachments</h4>
                          <div className="flex gap-2 mb-4">
                            {report.media.map((media, index) => (
                              <div key={index} className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                                <Image size={20} className="text-gray-400" />
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                              <Eye size={14} className="mr-1" />
                              View Details
                            </button>
                            <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                              <Archive size={14} className="mr-1" />
                              Archive
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No reports found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdSourced;