// pages/AuthorityDB.jsx
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Bell, 
  Twitter, 
  AlertTriangle, 
  Search,
  Menu,
  Users,
  Clock,
  Activity,
  ArrowRight,
  Shield,
  MessageCircle,
  ChevronDown,
  X,
  Filter,
  Download,
  Plus,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Sun,
  Moon,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthorityDB = () => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a dark mode preference saved
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
           (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [notifications, setNotifications] = useState(3);

  // Sample data for demonstration
  const recentActivities = [
    { id: 1, type: 'Report', description: 'New flood warning reported', time: '10 minutes ago', icon: <AlertTriangle size={16} />, color: 'text-blue-500', priority: 'high' },
    { id: 2, type: 'Social', description: 'Twitter alert about strong currents', time: '45 minutes ago', icon: <Twitter size={16} />, color: 'text-green-500', priority: 'medium' },
    { id: 3, type: 'Notice', description: 'Beach closure notice sent', time: '2 hours ago', icon: <Bell size={16} />, color: 'text-purple-500', priority: 'low' },
    { id: 4, type: 'Update', description: 'Map updated with new hazard zones', time: '5 hours ago', icon: <MapPin size={16} />, color: 'text-red-500', priority: 'medium' },
  ];

  const statsData = [
    { title: 'Active Hazards', value: '7', change: '+2', changeType: 'negative', icon: <AlertTriangle size={20} />, chart: [5, 7, 6, 8, 7, 9, 7] },
    { title: 'Social Mentions', value: '24', change: '-5', changeType: 'positive', icon: <Twitter size={20} />, chart: [29, 25, 27, 22, 24, 26, 24] },
    { title: 'Resolved Cases', value: '18', change: '+3', changeType: 'positive', icon: <Shield size={20} />, chart: [12, 14, 15, 16, 17, 15, 18] },
    { title: 'Avg. Response Time', value: '32m', change: '-4m', changeType: 'positive', icon: <Clock size={20} />, chart: [36, 38, 35, 34, 33, 32, 32] },
  ];

  const responseTeams = [
    { name: 'North Coast Team', members: 5, status: 'active', availability: '5 members available', color: 'green' },
    { name: 'South Bay Team', members: 3, status: 'active', availability: '3 members available', color: 'green' },
    { name: 'Central Division', members: 2, status: 'busy', availability: '2 members on duty', color: 'yellow' },
    { name: 'Eastern Unit', members: 0, status: 'offline', availability: 'No members available', color: 'red' },
  ];

  const hazardTypes = [
    { type: 'Flood', count: 3, trend: 'up' },
    { type: 'Strong Currents', count: 2, trend: 'stable' },
    { type: 'Marine Life', count: 1, trend: 'down' },
    { type: 'Weather', count: 1, trend: 'up' },
  ];

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const MiniSparkline = ({ data, positive }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    return (
      <div className="flex items-end h-8 w-16 ml-2">
        {data.map((value, index) => {
          const height = ((value - min) / (max - min)) * 100 || 50;
          return (
            <div
              key={index}
              className={`flex-1 mx-px rounded-t ${
                positive ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800'
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
                <Shield size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                ResQWave Authority Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search reports, alerts, teams..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {isSearchFocused && (
                <X size={18} className="absolute right-3 top-2.5 text-gray-400 cursor-pointer" />
              )}
            </div>
            
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
              onClick={() => setNotifications(0)}
            >
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800 dark:text-white">Authority Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Coastal Safety Division</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, Authority</h2>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with coastal emergencies in your area today.</p>
          
          <div className="flex items-center mt-4 space-x-4">
            <div className="px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
              7 Active Emergencies
            </div>
            <div className="px-3 py-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full text-sm font-medium">
              3 Require Immediate Attention
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                  {stat.icon}
                </div>
                <MiniSparkline data={stat.chart} positive={stat.changeType === 'positive'} />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                  <div className={`flex items-center text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.changeType === 'positive' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Features Grid - Enhanced with prominence */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Emergency Management</h2>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                <Filter size={16} className="mr-1" />
                Filter
              </button>
              <button className="flex items-center px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                <Settings size={16} className="mr-1" />
                Settings
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* App Reports Card - Enhanced */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 cursor-pointer group hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              onClick={() => navigate('/app-reports')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="text-blue-500" size={28} />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">12 New</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">App Reports</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Review and manage hazard reports from ResQWave users across all coastal areas</p>
                <div className="flex justify-between items-center text-blue-500 dark:text-blue-400">
                  <span className="text-sm font-medium">View all reports</span>
                  <div className="flex items-center">
                    <span className="text-xs mr-2">Explore</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card - Enhanced */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 cursor-pointer group hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              onClick={() => navigate('/social-media')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:scale-110 transition-transform">
                    <Twitter className="text-green-500" size={28} />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">24 Mentions</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Social Media</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Monitor social media platforms for real-time coastal threats and public sentiment</p>
                <div className="flex justify-between items-center text-green-500 dark:text-green-400">
                  <span className="text-sm font-medium">View social monitoring</span>
                  <div className="flex items-center">
                    <span className="text-xs mr-2">Explore</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Map Card - Enhanced */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 cursor-pointer group hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              onClick={() => navigate('/live-map')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:scale-110 transition-transform">
                    <MapPin className="text-red-500" size={28} />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">7 Hazards</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Live Map</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">View real-time hazard locations, team deployments, and emergency zones</p>
                <div className="flex justify-between items-center text-red-500 dark:text-red-400">
                  <span className="text-sm font-medium">Open live map</span>
                  <div className="flex items-center">
                    <span className="text-xs mr-2">Explore</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Notice Section Card - Enhanced */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 cursor-pointer group hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              onClick={() => navigate('/notice')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:scale-110 transition-transform">
                    <Bell className="text-purple-500" size={28} />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">3 Active</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Notice Section</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Create and send emergency alerts to app users and coordinate public notifications</p>
                <div className="flex justify-between items-center text-purple-500 dark:text-purple-400">
                  <span className="text-sm font-medium">Manage notices</span>
                  <div className="flex items-center">
                    <span className="text-xs mr-2">Explore</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activities</h3>
              <button className="text-sm text-blue-500 dark:text-blue-400 font-medium">View all</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className={`p-2 rounded-full mr-4 ${activity.color} bg-opacity-10`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white">{activity.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activity.priority === 'high' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : activity.priority === 'medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {activity.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Teams */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Response Teams</h3>
              <button className="text-sm text-blue-500 dark:text-blue-400 font-medium flex items-center">
                <Plus size={16} className="mr-1" /> Add Team
              </button>
            </div>
            <div className="space-y-4">
              {responseTeams.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 bg-${team.color}-100 dark:bg-${team.color}-900/30`}>
                      <Users size={16} className={`text-${team.color}-500`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{team.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{team.availability}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-${team.color}-500 mr-2`}></div>
                    <MoreVertical size={16} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Hazard Types</h4>
              <div className="space-y-3">
                {hazardTypes.map((hazard, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{hazard.type}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-800 dark:text-white mr-2">{hazard.count}</span>
                      {hazard.trend === 'up' ? (
                        <TrendingUp size={14} className="text-red-500" />
                      ) : hazard.trend === 'down' ? (
                        <TrendingDown size={14} className="text-green-500" />
                      ) : (
                        <div className="w-3 h-0.5 bg-gray-400"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorityDB;