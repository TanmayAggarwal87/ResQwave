// pages/SocialMedia.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
  Share,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  TrendingUp,
  Bell,
  Clock,
  Users,
  BarChart3,
  ChevronRight,
  Shield,
  Navigation,
  Zap,
  Satellite,
  Waves,
  Wind,
  MessageSquare,
  Radio
} from 'lucide-react';

const SocialMedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [trendingFilter, setTrendingFilter] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState('All');

  // Sample social media posts data with India-oriented content
  const socialPosts = [
    {
      id: 1,
      platform: 'Twitter',
      username: '@IndiaMetDepartment',
      handle: 'indiametdept',
      content: 'High wave alert for coastal Tamil Nadu and Andhra Pradesh. Fishermen advised not to venture into sea for next 24 hours. #CycloneAlert #IndiaCoastalSafety',
      time: '45 mins ago',
      location: 'Chennai, Tamil Nadu',
      likes: 214,
      shares: 87,
      comments: 32,
      trending: true,
      verified: true,
      sentiment: 'critical',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      platform: 'Facebook',
      username: 'Indian National Centre for Ocean Information Services',
      handle: 'incoishyd',
      content: 'Tsunami watch issued for Andaman and Nicobar Islands after 7.6 magnitude earthquake in Eastern Indian Ocean. Stay tuned for updates.',
      time: '2 hours ago',
      location: 'Andaman and Nicobar Islands',
      likes: 543,
      shares: 321,
      comments: 128,
      trending: true,
      verified: true,
      sentiment: 'critical',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      platform: 'Instagram',
      username: 'Indian Coast Guard',
      handle: 'indiancoastguard',
      content: 'Rescue operations underway off Mumbai coast after merchant vessel reports distress. All crew safe. #SafetyAtSea #IndianCoastGuard',
      time: '5 hours ago',
      location: 'Mumbai, Maharashtra',
      likes: 876,
      shares: 234,
      comments: 76,
      trending: true,
      verified: true,
      sentiment: 'warning',
      priority: 'medium',
      image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      platform: 'Twitter',
      username: '@NDRFIndia',
      handle: 'ndrf',
      content: 'NDRF teams deployed to coastal Kerala in anticipation of heavy rainfall and potential flooding. Citizens advised to follow official channels for updates.',
      time: '8 hours ago',
      location: 'Kerala Coast',
      likes: 432,
      shares: 198,
      comments: 65,
      trending: true,
      verified: true,
      sentiment: 'alert',
      priority: 'medium',
      image: 'https://images.unsplash.com/photo-1473580044384-7baa7a6ab2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      platform: 'Facebook',
      username: 'India Meteorological Department',
      handle: 'imd',
      content: 'Cyclone alert for Odisha and West Bengal coasts. Expected landfall in 48 hours. Fishermen advised to return to shore immediately.',
      time: '1 day ago',
      location: 'Bay of Bengal',
      likes: 765,
      shares: 342,
      comments: 143,
      trending: false,
      verified: true,
      sentiment: 'warning',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      platform: 'Instagram',
      username: 'Local Fisherman Association',
      handle: 'chennaifishermen',
      content: 'Unusual tidal patterns observed off Chennai coast. Higher than normal waves reported. Advising all small boats to stay ashore today.',
      time: '1 day ago',
      location: 'Chennai, Tamil Nadu',
      likes: 143,
      shares: 45,
      comments: 32,
      trending: false,
      verified: false,
      sentiment: 'info',
      priority: 'low',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 7,
      platform: 'Twitter',
      username: '@GoaTourism',
      handle: 'goatourism',
      content: 'Beach safety alert: Strong undertow reported at popular beaches in North Goa. Swim only in designated areas with lifeguards present.',
      time: '2 days ago',
      location: 'Goa',
      likes: 287,
      shares: 124,
      comments: 43,
      trending: false,
      verified: true,
      sentiment: 'alert',
      priority: 'medium',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      platform: 'Youtube',
      username: 'DD News Coastal Division',
      handle: 'ddnewscoastal',
      content: 'VIDEO: Indian Navy rescues 27 crew members from sinking cargo ship off Kochi coast during severe weather conditions.',
      time: '2 days ago',
      location: 'Kochi, Kerala',
      likes: 1243,
      shares: 432,
      comments: 187,
      trending: true,
      verified: true,
      sentiment: 'info',
      priority: 'low',
      image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 9,
      platform: 'Reddit',
      username: 'u/CoastalWatch_India',
      handle: 'coastalwatch',
      content: 'Multiple reports of unusual marine activity near Visakhapatnam coast. Local authorities investigating. Anyone else noticing this?',
      time: '3 hours ago',
      location: 'Visakhapatnam, Andhra Pradesh',
      likes: 87,
      shares: 23,
      comments: 42,
      trending: true,
      verified: false,
      sentiment: 'alert',
      priority: 'medium',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 10,
      platform: 'Telegram',
      username: 'Indian Maritime Alert',
      handle: 'maritimealert',
      content: 'URGENT: Oil spill reported 15km off Mumbai coast. Cleanup operations initiated. Avoid area if possible. Updates to follow.',
      time: '1 hour ago',
      location: 'Mumbai, Maharashtra',
      likes: 156,
      shares: 89,
      comments: 34,
      trending: true,
      verified: true,
      sentiment: 'critical',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1615783080245-5d87bb8af5d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Platform options for filter
  const platforms = ['All', 'Twitter', 'Facebook', 'Instagram', 'Youtube', 'Reddit', 'Telegram'];
  const timeOptions = ['All', 'Last hour', 'Today', 'This week', 'This month'];
  const sentimentOptions = ['All', 'Critical', 'Warning', 'Alert', 'Info'];
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];

  // Filter posts based on selected filters and search term
  const filteredPosts = socialPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = platformFilter === 'All' || post.platform === platformFilter;
    const matchesTrending = !trendingFilter || post.trending === true;
    const matchesSentiment = sentimentFilter === 'All' || 
      post.sentiment.toLowerCase() === sentimentFilter.toLowerCase();

    return matchesSearch && matchesPlatform && matchesTrending && matchesSentiment;
  });

  // Get urgent alerts (critical sentiment)
  const urgentAlerts = socialPosts.filter(post => post.sentiment === 'critical' || post.priority === 'high');

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'Twitter': return <Twitter size={18} className="text-blue-400" />;
      case 'Facebook': return <Facebook size={18} className="text-blue-600" />;
      case 'Instagram': return <Instagram size={18} className="text-pink-500" />;
      case 'Youtube': return <Youtube size={18} className="text-red-500" />;
      case 'Reddit': return <MessageSquare size={18} className="text-orange-500" />;
      case 'Telegram': return <Radio size={18} className="text-blue-500" />;
      default: return null;
    }
  };

  // Get sentiment color
  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'alert': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">High Priority</span>;
      case 'medium': return <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Medium Priority</span>;
      case 'low': return <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Low Priority</span>;
      default: return null;
    }
  };

  // Get threat type icon
  const getThreatIcon = (content) => {
    if (content.toLowerCase().includes('tsunami')) return <Waves size={20} className="text-blue-600" />;
    if (content.toLowerCase().includes('cyclone')) return <Wind size={20} className="text-blue-600" />;
    return <Satellite size={20} className="text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" className="h-8 mr-3" />
              Indian Coastal Threat Monitoring
            </h1>
            <p className="text-gray-600">
              Real-time monitoring of coastal threats from social media platforms across India
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm">
              <BarChart3 size={18} className="mr-2" />
              Analytics
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
              <Shield size={18} className="mr-2" />
              Send Alert
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border-l-4 border-blue-500">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Twitter className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">1,243</div>
              <div className="text-sm text-gray-600">Twitter Mentions</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border-l-4 border-green-500">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Facebook className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">876</div>
              <div className="text-sm text-gray-600">Facebook Posts</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border-l-4 border-pink-500">
            <div className="p-3 bg-pink-100 rounded-lg mr-4">
              <Instagram className="text-pink-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">542</div>
              <div className="text-sm text-gray-600">Instagram Posts</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border-l-4 border-red-500">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">87</div>
              <div className="text-sm text-gray-600">Urgent Alerts</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search posts, locations, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className={`flex items-center px-4 py-2.5 rounded-lg text-sm ${trendingFilter ? 'bg-purple-100 text-purple-800 border border-purple-300' : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => setTrendingFilter(!trendingFilter)}>
                <TrendingUp size={16} className="mr-2" />
                Trending Only
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Platform</label>
              <div className="relative">
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
                >
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Time</label>
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Sentiment</label>
              <div className="relative">
                <select
                  value={sentimentFilter}
                  onChange={(e) => setSentimentFilter(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
                >
                  {sentimentOptions.map(sentiment => (
                    <option key={sentiment} value={sentiment}>{sentiment}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Priority</label>
              <div className="relative">
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-800"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Alerts Section */}
        {urgentAlerts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <AlertTriangle className="text-red-500 mr-2" size={24} />
                Urgent Alerts - India Coastal Regions
              </h2>
              <button className="text-blue-600 text-sm flex items-center hover:text-blue-800">
                View all <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgentAlerts.slice(0, 2).map(alert => (
                <div key={alert.id} className="bg-red-50 border border-red-200 rounded-xl p-4 flex">
                  <div className="bg-red-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    {getThreatIcon(alert.content)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-red-800">{alert.platform} Alert</h3>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">URGENT</span>
                    </div>
                    <p className="text-red-700 mb-2">{alert.content}</p>
                    <div className="flex items-center text-sm text-red-600">
                      <MapPin size={14} className="mr-1" />
                      {alert.location} • 
                      <Clock size={14} className="ml-2 mr-1" />
                      {alert.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tsunami Alert Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-4 mb-8 flex items-center justify-between shadow-md">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <Waves size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Tsunami Watch - Indian Ocean</h3>
              <p>Monitoring potential tsunami activity after 7.6 magnitude earthquake near Indonesia</p>
            </div>
          </div>
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50">
            View Details
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            <button className={`px-4 py-2 font-medium ${platformFilter === 'All' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('All')}>
              All Platforms
            </button>
            <button className={`px-4 py-2 font-medium flex items-center ${platformFilter === 'Twitter' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('Twitter')}>
              <Twitter size={16} className="mr-2" /> Twitter
            </button>
            <button className={`px-4 py-2 font-medium flex items-center ${platformFilter === 'Facebook' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('Facebook')}>
              <Facebook size={16} className="mr-2" /> Facebook
            </button>
            <button className={`px-4 py-2 font-medium flex items-center ${platformFilter === 'Instagram' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('Instagram')}>
              <Instagram size={16} className="mr-2" /> Instagram
            </button>
            <button className={`px-4 py-2 font-medium flex items-center ${platformFilter === 'Youtube' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('Youtube')}>
              <Youtube size={16} className="mr-2" /> YouTube
            </button>
            <button className={`px-4 py-2 font-medium flex items-center ${platformFilter === 'Reddit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('Reddit')}>
              <MessageSquare size={16} className="mr-2" /> Reddit
            </button>
            <button className={`px-4 py-2 font-medium flex items-center ${platformFilter === 'Telegram' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setPlatformFilter('Telegram')}>
              <Radio size={16} className="mr-2" /> Telegram
            </button>
          </div>
        </div>

        {/* Social Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-200">
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.content.substring(0, 20)} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-0 left-0 bg-gradient-to-b from-black/40 to-transparent w-full p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-white rounded-full mr-2">
                        {getPlatformIcon(post.platform)}
                      </div>
                      <span className="text-white text-sm font-medium">{post.platform}</span>
                    </div>
                    {post.trending && (
                      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <TrendingUp size={10} className="mr-1" /> TRENDING
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  {getPriorityBadge(post.priority)}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                {/* User info */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center flex-grow">
                    <div className="font-medium text-gray-800 flex items-center">
                      {post.username}
                      {post.verified && (
                        <span className="ml-1 text-blue-500" title="Verified">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getSentimentColor(post.sentiment)}`}>
                    {post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)}
                  </span>
                </div>
                
                {/* Post content */}
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {post.content}
                </p>
                
                {/* Location and time */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {post.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {post.time}
                  </div>
                </div>
                
                {/* Engagement stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex items-center">
                    <Heart size={14} className="mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <Share size={14} className="mr-1" />
                    {post.shares}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={14} className="mr-1" />
                    {post.comments}
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                    <ExternalLink size={14} className="mr-1" />
                    View Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity - Indian Coastline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Users className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-800">5,243</div>
                  <div className="text-sm text-gray-600">Total Mentions</div>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">+18% from yesterday</div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Navigation className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-800">24</div>
                  <div className="text-sm text-gray-600">Coastal Locations</div>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">+6 in last hour</div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <Bell className="text-red-600" size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-800">12</div>
                  <div className="text-sm text-gray-600">New Alerts</div>
                </div>
              </div>
              <div className="text-xs text-red-600 font-medium">+4 in last hour</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm py-6 border-t border-gray-200">
          <p>Indian Coastal Threat Monitoring System • Updated 5 minutes ago</p>
          <p className="mt-1">Monitoring 8,458 social media accounts across India's 7,516 km coastline</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;