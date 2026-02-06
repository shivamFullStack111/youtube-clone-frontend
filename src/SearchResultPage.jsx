



import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Header from './Header';

const SearchResultsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [uploadDate, setUploadDate] = useState('anytime');
  const [duration, setDuration] = useState('any');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState({
    videos: [],
    isLoading: true,
    error: null,
    totalResults: 0
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('search_query') || '';

  // Fetch search results from API
  const fetchSearchResults = async () => {
    if (!query.trim()) {
      setResults({
        videos: [],
        isLoading: false,
        error: null,
        totalResults: 0
      });
      return;
    }

    try {
      setResults(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(
        `http://localhost/youtube-clone-backend/api/video/search.php?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Transform API data to match our component structure
        const transformedVideos = result.data.map(video => {
          const uploadedBy = video.uploadedBy || {};
          
          return {
            id: video.id,
            title: video.title,
            channel: uploadedBy.channelName || uploadedBy.name || "Unknown Channel",
            channelId: uploadedBy.id || video.id,
            views: formatViews(video.totalViews),
            time: formatTimeAgo(video.createdAt),
            duration: calculateDuration(video),
            thumbnail: `https://picsum.photos/320/180?random=${video.id}`,
            channelImg: uploadedBy.profilePic || `https://picsum.photos/36/36?random=${video.id + 100}`,
            description: video.description || "No description available",
            category: video.category || "Uncategorized",
            tags: video.tags || "",
            videoUrl: video.videoUrl,
            likes: video.totalLikes || 0,
            createdAt: video.createdAt
          };
        });

        // Sort videos based on sortBy
        let sortedVideos = [...transformedVideos];
        switch (sortBy) {
          case 'uploadDate':
            sortedVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'viewCount':
            sortedVideos.sort((a, b) => {
              const aViews = extractNumberFromViews(a.views);
              const bViews = extractNumberFromViews(b.views);
              return bViews - aViews;
            });
            break;
          case 'rating':
            sortedVideos.sort((a, b) => b.likes - a.likes);
            break;
          default: // relevance
            // Keep original order (already sorted by totalViews in API)
            break;
        }

        // Filter by upload date
        sortedVideos = filterByUploadDate(sortedVideos, uploadDate);

        // Filter by duration
        sortedVideos = filterByDuration(sortedVideos, duration);

        setResults({
          videos: sortedVideos,
          isLoading: false,
          error: null,
          totalResults: result.totalResults || sortedVideos.length
        });
      } else {
        throw new Error(result.message || 'Search failed');
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResults({
        videos: [],
        isLoading: false,
        error: err.message,
        totalResults: 0
      });
    }
  };

  // Helper function to format views
  const formatViews = (views) => {
    if (!views) return "0 views";
    
    const numViews = parseInt(views);
    if (isNaN(numViews)) return `${views} views`;
    
    if (numViews >= 1000000) {
      return (numViews / 1000000).toFixed(1) + 'M views';
    } else if (numViews >= 1000) {
      return (numViews / 1000).toFixed(1) + 'K views';
    }
    return numViews + ' views';
  };

  // Helper function to extract number from formatted views
  const extractNumberFromViews = (viewString) => {
    if (!viewString) return 0;
    
    const match = viewString.match(/(\d+(\.\d+)?)/);
    if (!match) return 0;
    
    let num = parseFloat(match[1]);
    
    if (viewString.includes('M')) {
      return num * 1000000;
    } else if (viewString.includes('K')) {
      return num * 1000;
    }
    return num;
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Calculate duration (mock - in real app, store duration in database)
  const calculateDuration = (video) => {
    // If you have duration in database, use it
    if (video.duration) return video.duration;
    
    // Mock duration based on video ID
    const minutes = (video.id % 30) + 5; // 5-35 minutes
    const seconds = (video.id % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Filter by upload date
  const filterByUploadDate = (videos, filter) => {
    if (filter === 'anytime') return videos;
    
    const now = new Date();
    return videos.filter(video => {
      const videoDate = new Date(video.createdAt);
      const diffMs = now - videoDate;
      const diffHours = diffMs / (1000 * 60 * 60);
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      switch (filter) {
        case 'lastHour':
          return diffHours <= 1;
        case 'today':
          return diffHours <= 24;
        case 'thisWeek':
          return diffDays <= 7;
        case 'thisMonth':
          return diffDays <= 30;
        case 'thisYear':
          return diffDays <= 365;
        default:
          return true;
      }
    });
  };

  // Filter by duration
  const filterByDuration = (videos, filter) => {
    if (filter === 'any') return videos;
    
    return videos.filter(video => {
      const duration = video.duration;
      if (!duration) return true;
      
      const [minutes, seconds] = duration.split(':').map(Number);
      const totalMinutes = minutes + (seconds / 60);
      
      switch (filter) {
        case 'short':
          return totalMinutes < 4;
        case 'medium':
          return totalMinutes >= 4 && totalMinutes <= 20;
        case 'long':
          return totalMinutes > 20;
        default:
          return true;
      }
    });
  };

  // Handle search with filters
  const handleSearchWithFilters = () => {
    fetchSearchResults();
  };

  // Handle filter changes
  useEffect(() => {
    if (!results.isLoading && query) {
      handleSearchWithFilters();
    }
  }, [sortBy, uploadDate, duration]);

  // Initial fetch when query changes
  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const FilterButton = ({ text, value }) => (
    <button
      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
        activeFilter === value
          ? 'bg-black text-white'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={() => setActiveFilter(value)}
    >
      {text}
    </button>
  );

  // Loading skeleton
  if (results.isLoading && query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-2">
          <div className="max-w-7xl mx-auto p-4">
            {/* Search header skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
            <div className="flex space-x-3 mb-8 overflow-x-auto">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              ))}
            </div>
            
            {/* Video results skeleton */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col md:flex-row mb-6 animate-pulse">
                <div className="w-full md:w-80 h-44 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-1 mt-3 md:mt-0">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="flex items-center mt-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-2 pb-8">
        {/* Search header */}
        <div className="sticky top-14 z-10 bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">
                  Search results for <span className="font-semibold">"{query}"</span>
                </p>
                {results.totalResults > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {results.totalResults} {results.totalResults === 1 ? 'result' : 'results'} found
                  </p>
                )}
              </div>
              
              <button 
                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
              <FilterButton text="All" value="all" />
              <FilterButton text="Videos" value="videos" />
            </div>
            
            {/* Advanced filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">Refine your search</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="uploadDate">Upload date</option>
                      <option value="viewCount">View count</option>
                      <option value="rating">Rating (likes)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload date</label>
                    <select 
                      value={uploadDate}
                      onChange={(e) => setUploadDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="any">Any duration</option>
                      <option value="short">Short (&lt; 4 minutes)</option>
                      <option value="medium">Medium (4-20 minutes)</option>
                      <option value="long">Long (&gt; 20 minutes)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setSortBy('relevance');
                      setUploadDate('anytime');
                      setDuration('any');
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 mr-2"
                  >
                    Reset filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Apply filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto p-4">
          {/* Error State */}
          {results.error && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mb-6">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Search Error</h3>
              <p className="text-gray-500 mb-4">{results.error}</p>
              <button
                onClick={fetchSearchResults}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty Search Query */}
          {!query.trim() && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Enter a search term</h3>
              <p className="text-gray-500">Type something in the search bar to find videos</p>
            </div>
          )}

          {/* No Results */}
          {query && !results.isLoading && !results.error && results.videos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No results found for "{query}"</h3>
              <p className="text-gray-500 mb-4">Try different keywords or remove search filters</p>
              <div className="space-x-3">
                <button
                  onClick={() => {
                    setSortBy('relevance');
                    setUploadDate('anytime');
                    setDuration('any');
                    setShowFilters(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Clear all filters
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Browse videos
                </button>
              </div>
            </div>
          )}

          {/* Video results */}
          {(activeFilter === 'all' || activeFilter === 'videos') && results.videos.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Videos</h2>
              
              {results.videos.map(video => (
                <div key={video.id} className="flex flex-col md:flex-row bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <Link 
                    to={`/video/${video.id}`}
                    className="relative mb-3 md:mb-0 md:mr-4 flex-shrink-0"
                  >
                    <div className="w-full md:w-80 h-44 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/320/180?random=${video.id}`;
                        }}
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {video.category && (
                      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {video.category}
                      </div>
                    )}
                  </Link>
                  
                  <div className="flex-1">
                    <Link to={`/video/${video.id}`}>
                      <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">
                        {video.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span>{video.views}</span>
                      <span className="mx-2">•</span>
                      <span>{video.time}</span>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600">{video.likes} likes</span>
                    </div>
                    
                    <Link 
                      to={`/channel/${video.channelId}`}
                      className="flex items-center mb-3 group"
                    >
                      <img 
                        src={video.channelImg} 
                        alt={video.channel}
                        className="w-8 h-8 rounded-full mr-2 group-hover:ring-2 group-hover:ring-blue-500"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/36/36?random=${video.id + 100}`;
                        }}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{video.channel}</span>
                    </Link>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{video.description}</p>
                    
                    {video.tags && (
                      <div className="flex flex-wrap gap-2">
                        {video.tags.split(',').slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show more button if many results */}
          {results.videos.length > 0 && results.totalResults > results.videos.length && (
            <div className="text-center mt-8">
              <button
                className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                onClick={() => {
                  // In a real app, you would implement pagination here
                  alert('Implement pagination to load more results');
                }}
              >
                Show more results
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS for hide-scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchResultsPage;