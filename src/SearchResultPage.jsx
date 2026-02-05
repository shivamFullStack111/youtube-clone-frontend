import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResultsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [uploadDate, setUploadDate] = useState('anytime');
  const [duration, setDuration] = useState('any');
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search_query') || '';
  
  // Sample search results data
  const [results, setResults] = useState({
    videos: [],
    channels: [],
    isLoading: true
  });

  // Simulate API call to fetch search results
  useEffect(() => {
    setResults({ videos: [], channels: [], isLoading: true });
    
    const timer = setTimeout(() => {
      setResults({
        isLoading: false,
        videos: [
          {
            id: 1,
            title: "React Tutorial for Beginners - Learn React in 10 Minutes",
            channel: "WebDev Simplified",
            channelId: "UCwebdev",
            views: "1.2M views",
            time: "2 days ago",
            duration: "10:25",
            thumbnail: "https://picsum.photos/320/180?random=1",
            channelImg: "https://picsum.photos/36/36?random=10",
            description: "Learn React.js fundamentals in just 10 minutes. This tutorial covers components, state, props, and more."
          },
          {
            id: 2,
            title: "React vs Angular vs Vue - Which Framework is Best in 2023?",
            channel: "Tech Comparisons",
            channelId: "techcomparisons",
            views: "845K views",
            time: "1 week ago",
            duration: "15:42",
            thumbnail: "https://picsum.photos/320/180?random=2",
            channelImg: "https://picsum.photos/36/36?random=11",
            description: "We compare the top JavaScript frameworks to help you decide which one to learn in 2023."
          },
          {
            id: 3,
            title: "Building a React App from Scratch - Complete Guide",
            channel: "React Mastery",
            channelId: "reactmastery",
            views: "356K views",
            time: "5 days ago",
            duration: "42:18",
            thumbnail: "https://picsum.photos/320/180?random=3",
            channelImg: "https://picsum.photos/36/36?random=12",
            description: "Follow along as we build a complete React application from scratch with modern best practices."
          },
          {
            id: 4,
            title: "React Hooks Explained - useState, useEffect, useContext",
            channel: "JavaScript Academy",
            channelId: "jsacademy",
            views: "2.4M views",
            time: "3 weeks ago",
            duration: "28:07",
            thumbnail: "https://picsum.photos/320/180?random=4",
            channelImg: "https://picsum.photos/36/36?random=13",
            description: "Understanding React Hooks is essential for modern React development. Learn how to use them effectively."
          },
          {
            id: 5,
            title: "React Performance Optimization Techniques",
            channel: "Advanced Web Development",
            channelId: "advancedwebdev",
            views: "521K views",
            time: "2 months ago",
            duration: "36:22",
            thumbnail: "https://picsum.photos/320/180?random=5",
            channelImg: "https://picsum.photos/36/36?random=14",
            description: "Learn how to optimize your React applications for better performance and user experience."
          }
        ],
        channels: [
          {
            id: 1,
            name: "React Official Channel",
            subscribers: "2.3M subscribers",
            videos: "1.2K videos",
            thumbnail: "https://picsum.photos/136/136?random=20",
            description: "Official channel for React.js. Tutorials, updates, and news about the React library."
          },
          {
            id: 2,
            name: "WebDev Simplified",
            subscribers: "1.8M subscribers",
            videos: "428 videos",
            thumbnail: "https://picsum.photos/136/136?random=21",
            description: "Simplifying web development concepts with easy-to-understand tutorials and guides."
          },
          {
            id: 3,
            name: "React Mastery",
            subscribers: "956K subscribers",
            videos: "312 videos",
            thumbnail: "https://picsum.photos/136/136?random=22",
            description: "Master React.js with in-depth tutorials, project walkthroughs, and advanced concepts."
          }
        ]
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [query]);

  const filteredVideos = results.videos.filter(video => {
    // In a real app, this would be done server-side
    if (uploadDate === 'lastHour') return true; // Simplified for demo
    if (duration === 'short' && video.duration > '10:00') return false;
    if (duration === 'long' && video.duration < '20:00') return false;
    return true;
  });

  const FilterButton = ({ text, value }) => (
    <button
      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
        activeFilter === value
          ? 'bg-black text-white'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={() => setActiveFilter(value)}
    >
      {text}
    </button>
  );

  if (results.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Search header skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-3 mb-8 overflow-x-auto">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
            ))}
          </div>
          
          {/* Video results skeleton */}
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex mb-6">
              <div className="w-80 h-44 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Search header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Results for <span className="font-semibold">"{query}"</span>
            </p>
            
            <button 
              className="flex items-center text-sm text-blue-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filters
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
            <FilterButton text="All" value="all" />
            <FilterButton text="Videos" value="videos" />
            <FilterButton text="Channels" value="channels" />
            <FilterButton text="Live" value="live" />
            <FilterButton text="Playlists" value="playlists" />
          </div>
          
          {/* Advanced filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="uploadDate">Upload date</option>
                    <option value="viewCount">View count</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload date</label>
                  <select 
                    value={uploadDate}
                    onChange={(e) => setUploadDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="anytime">Any time</option>
                    <option value="lastHour">Last hour</option>
                    <option value="today">Today</option>
                    <option value="thisWeek">This week</option>
                    <option value="thisMonth">This month</option>
                    <option value="thisYear">This year</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="any">Any duration</option>
                    <option value="short">Short (&lt; 4 minutes)</option>
                    <option value="medium">Medium (4-20 minutes)</option>
                    <option value="long">Long (&gt; 20 minutes)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Channel results */}
        {(activeFilter === 'all' || activeFilter === 'channels') && results.channels.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.channels.map(channel => (
                <Link to={'/channel/frhbjdcnk'} key={channel.id} className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                  <img 
                    src={channel.thumbnail} 
                    alt={channel.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{channel.name}</h3>
                    <p className="text-sm text-gray-600">{channel.subscribers} • {channel.videos}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{channel.description}</p>
                    <button className="mt-2 px-4 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700">
                      Subscribe
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Video results */}
        {(activeFilter === 'all' || activeFilter === 'videos') && (
          <div>
            {activeFilter === 'all' && filteredVideos.length > 0 && (
              <h2 className="text-xl font-semibold mb-4">Videos</h2>
            )}
            
            {filteredVideos.length > 0 ? (
              <div className="space-y-6">
                {filteredVideos.map(video => (
                  <div key={video.id} className="flex flex-col md:flex-row">
                    <Link 
                      to={`/video/${video.id}`}
                      className="relative mb-3 md:mb-0 md:mr-4 flex-shrink-0"
                    >
                      <div className="w-full md:w-80 h-44 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </Link>
                    
                    <div className="flex-1">
                      <Link to={`/video/${video.id}`}>
                        <h3 className="text-lg font-medium mb-1 hover:text-blue-600">{video.title}</h3>
                      </Link>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>{video.views}</span>
                        <span className="mx-2">•</span>
                        <span>{video.time}</span>
                      </div>
                      
                      <Link 
                        to={`/channel/${video.channelId}`}
                        className="flex items-center mt-2 mb-3"
                      >
                        <img 
                          src={video.channelImg} 
                          alt={video.channel}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-600 hover:text-black">{video.channel}</span>
                      </Link>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                <p className="text-gray-500">Try different keywords or remove search filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;