// pages/LiveMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom threat level icons
const createCustomIcon = (threatLevel) => {
  let html = '';
  let className = '';
  
  switch(threatLevel) {
    case 'high':
      html = '<div class="animate-pulse w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"><i class="fas fa-exclamation-triangle text-white text-sm"></i></div>';
      className = 'high-threat-marker';
      break;
    case 'medium':
      html = '<div class="animate-pulse w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center"><i class="fas fa-exclamation-circle text-white text-xs"></i></div>';
      className = 'medium-threat-marker';
      break;
    case 'low':
      html = '<div class="animate-pulse w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"><i class="fas fa-info-circle text-white text-xs"></i></div>';
      className = 'low-threat-marker';
      break;
    default:
      html = '<div class="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center"><i class="fas fa-map-marker-alt text-white text-xs"></i></div>';
  }
  
  return L.divIcon({
    html,
    className,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// Sample data for threatened areas
const threatData = [
  {
    id: 1,
    position: [12.9716, 77.5946], // Bangalore
    threatLevel: 'medium',
    title: 'Coastal Karnataka Alert',
    magnitude: '7.2',
    estimatedArrival: '45 minutes',
    affectedAreas: ['Mangalore', 'Udupi', 'Karwar'],
    warning: 'Evacuation advised for coastal regions',
    updated: '10 minutes ago'
  },
  {
    id: 2,
    position: [13.0827, 80.2707], // Chennai
    threatLevel: 'high',
    title: 'Tamil Nadu Coast Warning',
    magnitude: '8.1',
    estimatedArrival: '28 minutes',
    affectedAreas: ['Chennai', 'Puducherry', 'Cuddalore'],
    warning: 'Immediate evacuation required',
    updated: '5 minutes ago'
  },
  {
    id: 3,
    position: [8.5241, 76.9366], // Thiruvananthapuram
    threatLevel: 'high',
    title: 'Kerala High Alert',
    magnitude: '7.8',
    estimatedArrival: '15 minutes',
    affectedAreas: ['Thiruvananthapuram', 'Kochi', 'Kollam'],
    warning: 'Tsunami imminent - seek high ground immediately',
    updated: '2 minutes ago'
  },
  {
    id: 4,
    position: [19.0760, 72.8777], // Mumbai
    threatLevel: 'low',
    title: 'Maharashtra Watch',
    magnitude: '6.5',
    estimatedArrival: '1 hour 20 minutes',
    affectedAreas: ['Mumbai', 'Raigad', 'Ratnagiri'],
    warning: 'Stay alert for further updates',
    updated: '15 minutes ago'
  },
  {
    id: 5,
    position: [17.6868, 83.2185], // Vishakhapatnam
    threatLevel: 'medium',
    title: 'Andhra Pradesh Advisory',
    magnitude: '7.0',
    estimatedArrival: '35 minutes',
    affectedAreas: ['Vishakhapatnam', 'Kakinada', 'Vijayawada'],
    warning: 'Coastal areas should prepare for evacuation',
    updated: '8 minutes ago'
  }
];

const LiveMap = () => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate live data updates
  useEffect(() => {
    // Simulate initial loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate periodic updates
    const updateInterval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => {
      clearTimeout(loadTimer);
      clearInterval(updateInterval);
    };
  }, []);

  const handleMarkerHover = (threat) => {
    setSelectedThreat(threat);
  };

  const handleMarkerLeave = () => {
    setSelectedThreat(null);
  };

  const getThreatColor = (level) => {
    switch(level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      case 'low': return '#3b82f6';
      default: return '#3b82f6';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 bg-slate-800/50 border-b border-slate-700">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 md:mb-0">
          Live Tsunami Threat Map
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="text-sm text-slate-300">
            Last updated: {formatTime(lastUpdated)}
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">High Threat</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs">Medium Threat</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Low Threat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-300">Loading live threat data...</p>
          </div>
        ) : (
          <>
            {/* Map Container */}
            <div className="flex-1 h-full">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {threatData.map((threat) => (
                  <React.Fragment key={threat.id}>
                    <Circle
                      center={threat.position}
                      pathOptions={{
                        color: getThreatColor(threat.threatLevel),
                        fillColor: getThreatColor(threat.threatLevel),
                        fillOpacity: 0.2,
                        weight: 2
                      }}
                      radius={70000}
                    />
                    <Marker
                      position={threat.position}
                      icon={createCustomIcon(threat.threatLevel)}
                      eventHandlers={{
                        mouseover: () => handleMarkerHover(threat),
                        mouseout: handleMarkerLeave
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-lg text-slate-800">{threat.title}</h3>
                          <p className="text-sm">Magnitude: {threat.magnitude}</p>
                          <p className="text-sm">Estimated arrival: {threat.estimatedArrival}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>

            {/* Threat Details Panel */}
            {selectedThreat && (
              <div className="absolute top-4 right-4 w-80 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-5 z-40">
                <h2 className="text-xl font-bold text-cyan-400 mb-4">{selectedThreat.title}</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Threat Level:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedThreat.threatLevel === 'high' 
                        ? 'bg-red-500/20 text-red-400' 
                        : selectedThreat.threatLevel === 'medium'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedThreat.threatLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Magnitude:</span>
                    <span className="font-medium">{selectedThreat.magnitude}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Estimated Arrival:</span>
                    <span className="font-medium">{selectedThreat.estimatedArrival}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-slate-400 block mb-1">Affected Areas:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedThreat.affectedAreas.map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-700/50 rounded text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-500/10 border-l-4 border-red-500 rounded">
                    <span className="text-sm text-slate-300 block font-medium mb-1">Warning:</span>
                    <span className="text-red-200">{selectedThreat.warning}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Updated:</span>
                    <span>{selectedThreat.updated}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Footer */}
      <div className="p-3 bg-slate-800/50 border-t border-slate-700 text-center text-xs text-slate-500">
        Monitoring tsunami threats in real-time. Data updates every minute.
      </div>
      
      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </div>
  );
};

export default LiveMap;