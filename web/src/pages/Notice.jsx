import React, { useState } from 'react';

const Notice = () => {
  // State management
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [targetAudience, setTargetAudience] = useState('all');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Predefined templates
  const templates = [
    {
      id: 1,
      name: 'Weather Alert',
      title: 'Weather Emergency Alert',
      content: 'Severe weather conditions expected in your area. Please take necessary precautions and stay indoors.',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Security Threat',
      title: 'Security Alert',
      content: 'Security threat reported in the area. Please avoid the specified location and follow official instructions.',
      priority: 'high'
    },
    {
      id: 3,
      name: 'Public Health',
      title: 'Public Health Notice',
      content: 'Important health information for residents. Please follow guidelines from health authorities.',
      priority: 'medium'
    },
    {
      id: 4,
      name: 'Utility Disruption',
      title: 'Service Disruption Notice',
      content: 'Planned service disruption affecting utilities. Expected restoration time provided below.',
      priority: 'medium'
    },
    {
      id: 5,
      name: 'General Information',
      title: 'Public Information Notice',
      content: 'Important information for all residents. Please read carefully for updates affecting your community.',
      priority: 'low'
    }
  ];

  // Handle template selection
  const handleTemplateSelect = (e) => {
    const templateId = parseInt(e.target.value);
    if (templateId === 0) {
      setSelectedTemplate('');
      setTitle('');
      setContent('');
      setPriority('medium');
      return;
    }
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setTitle(template.title);
      setContent(template.content);
      setPriority(template.priority);
    }
  };

  // Open publish confirmation modal
  const handlePublishClick = () => {
    if (!title || !content) {
      alert('Please provide both title and content before publishing.');
      return;
    }
    setShowPublishModal(true);
  };

  // Confirm publication
  const confirmPublish = () => {
    if (confirmationCode.toUpperCase() === 'PUBLISH') {
      const newNotice = {
        id: Date.now(),
        title,
        content,
        priority,
        targetAudience,
        timestamp: new Date().toLocaleString(),
        status: 'published'
      };
      
      setNotices([newNotice, ...notices]);
      resetForm();
      setShowPublishModal(false);
      setConfirmationCode('');
      setIsPublished(true);
      
      // Reset published status after 3 seconds
      setTimeout(() => setIsPublished(false), 3000);
    } else {
      alert('Incorrect confirmation code. Please type the correct security code to confirm.');
    }
  };

  // Save as draft
  const saveAsDraft = () => {
    if (!title || !content) {
      alert('Please provide both title and content before saving.');
      return;
    }
    
    const newNotice = {
      id: Date.now(),
      title,
      content,
      priority,
      targetAudience,
      timestamp: new Date().toLocaleString(),
      status: 'draft'
    };
    
    setNotices([newNotice, ...notices]);
    resetForm();
    alert('Notice saved as draft successfully!');
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedTemplate('');
    setPriority('medium');
    setTargetAudience('all');
  };

  // Delete a notice
  const deleteNotice = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Emergency Notice Management</h1>
              <p className="text-gray-700">
                Create and send emergency alerts to app users and coordinate public notifications.
              </p>
            </div>
          </div>
          
          {isPublished && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Notice published successfully!
            </div>
          )}
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create New Notice
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 font-medium mb-2">Select Template:</label>
                <select 
                  value={selectedTemplate} 
                  onChange={handleTemplateSelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value={0}>Custom Notice</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id} className="text-gray-900">{template.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-900 font-medium mb-2">Priority Level:</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="low" className="text-green-700">Low Priority</option>
                  <option value="medium" className="text-yellow-700">Medium Priority</option>
                  <option value="high" className="text-red-700">High Priority</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-900 font-medium mb-2">Notice Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-900 font-medium mb-2">Notice Content:</label>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter notice content"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-900 font-medium mb-2">Target Audience:</label>
              <select 
                value={targetAudience} 
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="all">All Users</option>
                <option value="residents">Residents Only</option>
                <option value="authorities">Authorities Only</option>
                <option value="volunteers">Volunteers</option>
                <option value="specific">Specific Areas</option>
              </select>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md flex items-center"
                onClick={saveAsDraft}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save as Draft
              </button>
              <button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md flex items-center"
                onClick={handlePublishClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Publish Notice
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notice History
          </h2>
          {notices.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">No notices created yet. Create your first notice above.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {notices.map(notice => (
                <div 
                  key={notice.id} 
                  className={`border-l-4 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                    notice.priority === 'high' 
                      ? 'border-red-500 bg-red-50 hover:bg-red-100' 
                      : notice.priority === 'medium' 
                      ? 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                      : 'border-green-500 bg-green-50 hover:bg-green-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex-grow">{notice.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      notice.priority === 'high' 
                        ? 'bg-red-200 text-red-900' 
                        : notice.priority === 'medium' 
                        ? 'bg-yellow-200 text-yellow-900' 
                        : 'bg-green-200 text-green-900'
                    }`}>
                      {notice.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      notice.status === 'published' 
                        ? 'bg-green-200 text-green-900' 
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      {notice.status.toUpperCase()}
                    </span>
                    <button 
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm py-1 px-3 rounded-lg transition duration-200 shadow-sm flex items-center"
                      onClick={() => deleteNotice(notice.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-900 mb-4 leading-relaxed">{notice.content}</p>
                  <div className="flex flex-wrap justify-between text-sm text-gray-700">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Target: {notice.targetAudience}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Created: {notice.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 transform transition-all duration-300 scale-100 opacity-100">
            <div className="bg-blue-100 p-3 rounded-xl inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Verification Required</h3>
            <p className="text-gray-700 mb-4">You are about to publish this notice to <span className="font-semibold">{targetAudience}</span> users.</p>
            <p className="text-gray-700 mb-4">This action cannot be undone. Please enter the security code to confirm publication.</p>
            
            <input
              type="password"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Enter security code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900 placeholder-gray-600"
            />
            
            <div className="flex justify-end gap-3">
              <button 
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-5 rounded-lg transition duration-200 shadow-sm"
                onClick={() => setShowPublishModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-5 rounded-lg transition duration-200 shadow-sm"
                onClick={confirmPublish}
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;