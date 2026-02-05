import React, { useState } from 'react';

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);

  // Mock data for watch history
  const watchHistory = [
    {
      id: 1,
      title: "React Tutorial for Beginners - Learn React in 10 Minutes",
      channel: "WebDev Simplified",
      views: "1.2M views",
      time: "2 days ago",
      duration: "10:25",
      thumbnail: "https://picsum.photos/320/180?random=1",
      channelImg: "https://picsum.photos/36/36?random=10",
      watchedDate: "2 hours ago"
    },
    {
      id: 2,
      title: "JavaScript Array Methods Explained - map, filter, reduce",
      channel: "JS Ninja",
      views: "845K views",
      time: "1 week ago",
      duration: "15:42",
      thumbnail: "https://picsum.photos/320/180?random=2",
      channelImg: "https://picsum.photos/36/36?random=11",
      watchedDate: "5 hours ago"
    },
    {
      id: 3,
      title: "CSS Flexbox Complete Guide - Everything You Need to Know",
      channel: "CSS Master",
      views: "2.1M views",
      time: "3 weeks ago",
      duration: "28:07",
      thumbnail: "https://picsum.photos/320/180?random=3",
      channelImg: "https://picsum.photos/36/36?random=12",
      watchedDate: "Yesterday"
    },
    {
      id: 4,
      title: "Node.js Crash Course - Build a REST API",
      channel: "Backend Bro",
      views: "956K views",
      time: "1 month ago",
      duration: "42:18",
      thumbnail: "https://picsum.photos/320/180?random=4",
      channelImg: "https://picsum.photos/36/36?random=13",
      watchedDate: "2 days ago"
    },
    {
      id: 5,
      title: "React Hooks Explained - useState, useEffect, useContext",
      channel: "React Pro",
      views: "1.5M views",
      time: "2 months ago",
      duration: "36:22",
      thumbnail: "https://picsum.photos/320/180?random=5",
      channelImg: "https://picsum.photos/36/36?random=14",
      watchedDate: "3 days ago"
    }
  ];

  // Mock data for playlists
  const playlists = [
    {
      id: 1,
      title: "React Tutorial Series",
      videoCount: "12 videos",
      thumbnail: "https://picsum.photos/320/180?random=21",
      lastUpdated: "Updated 2 weeks ago",
      visibility: "Public",
      videos: [
        { id: 101, title: "React Introduction", duration: "10:25" },
        { id: 102, title: "React Components", duration: "15:30" },
        { id: 103, title: "React State Management", duration: "22:15" }
      ]
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      videoCount: "8 videos",
      thumbnail: "https://picsum.photos/320/180?random=22",
      lastUpdated: "Updated 1 month ago",
      visibility: "Public",
      videos: [
        { id: 201, title: "JavaScript Basics", duration: "18:40" },
        { id: 202, title: "Functions in JS", duration: "20:15" }
      ]
    },
    {
      id: 3,
      title: "CSS Mastery",
      videoCount: "10 videos",
      thumbnail: "https://picsum.photos/320/180?random=23",
      lastUpdated: "Updated 3 weeks ago",
      visibility: "Private",
      videos: [
        { id: 301, title: "CSS Grid Layout", duration: "25:10" },
        { id: 302, title: "Flexbox Deep Dive", duration: "28:45" }
      ]
    }
  ];

  // Mock data for liked videos
  const likedVideos = [
    {
      id: 6,
      title: "TypeScript for Beginners - Why and How to Use It",
      channel: "TypeScript Master",
      views: "892K views",
      time: "5 months ago",
      duration: "29:55",
      thumbnail: "https://picsum.photos/320/180?random=6",
      channelImg: "https://picsum.photos/36/36?random=15",
      likedDate: "1 week ago"
    },
    {
      id: 7,
      title: "Web Development Roadmap 2023",
      channel: "Dev Career Guide",
      views: "1.3M views",
      time: "4 months ago",
      duration: "33:40",
      thumbnail: "https://picsum.photos/320/180?random=7",
      channelImg: "https://picsum.photos/36/36?random=16",
      likedDate: "2 weeks ago"
    },
    {
      id: 8,
      title: "Build a Portfolio Website with React",
      channel: "Portfolio Pro",
      views: "721K views",
      time: "3 months ago",
      duration: "24:15",
      thumbnail: "https://picsum.photos/320/180?random=8",
      channelImg: "https://picsum.photos/36/36?random=17",
      likedDate: "3 weeks ago"
    }
  ];

  // Mock data for watch later
  const watchLater = [
    {
      id: 9,
      title: "Advanced React Patterns",
      channel: "React Advanced",
      views: "456K views",
      time: "2 weeks ago",
      duration: "45:20",
      thumbnail: "https://picsum.photos/320/180?random=9",
      channelImg: "https://picsum.photos/36/36?random=18",
      addedDate: "Yesterday"
    },
    {
      id: 10,
      title: "JavaScript Interview Preparation",
      channel: "Interview Ready",
      views: "1.1M views",
      time: "1 month ago",
      duration: "38:15",
      thumbnail: "https://picsum.photos/320/180?random=10",
      channelImg: "https://picsum.photos/36/36?random=19",
      addedDate: "3 days ago"
    }
  ];

  const TabButton = ({ name, value, count }) => (
    <button
      className={`flex items-center px-4 py-3 border-b-2 ${
        activeTab === value
          ? 'border-black text-black font-medium'
          : 'border-transparent text-gray-600 hover:text-black'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {name}
      {count > 0 && (
        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  );

  const HistoryVideoCard = ({ video }) => (
    <div className="flex items-start mb-4 p-2 hover:bg-gray-100 rounded-lg">
      <div className="relative w-40 h-24 flex-shrink-0 mr-4">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
        <div className="text-xs text-gray-500">
          <span>{video.views} • {video.time}</span>
          <span className="mx-2">•</span>
          <span>Watched {video.watchedDate}</span>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );

  const PlaylistCard = ({ playlist }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={playlist.thumbnail} 
          alt={playlist.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
          {playlist.videoCount}
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
          {playlist.visibility}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1">{playlist.title}</h3>
        <p className="text-xs text-gray-600">{playlist.lastUpdated}</p>
        <div className="mt-2 pt-2 border-t border-gray-100">
          {playlist.videos.slice(0, 3).map(video => (
            <div key={video.id} className="flex items-center text-xs text-gray-600 mb-1 last:mb-0">
              <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="truncate">{video.title}</span>
              <span className="ml-auto text-gray-400">{video.duration}</span>
            </div>
          ))}
          {playlist.videos.length > 3 && (
            <div className="text-xs text-gray-500 mt-1">
              +{playlist.videos.length - 3} more videos
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ClearHistoryDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium mb-4">Clear watch history?</h3>
        <p className="text-gray-600 mb-6">
          This will remove all videos from your watch history. This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowClearHistoryDialog(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle clear history logic here
              setShowClearHistoryDialog(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Clear watch history
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Library</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex overflow-x-auto hide-scrollbar">
            <TabButton name="History" value="history" count={watchHistory.length} />
            <TabButton name="Playlists" value="playlists" count={playlists.length} />
            <TabButton name="Liked videos" value="liked" count={likedVideos.length} />
            <TabButton name="Watch later" value="watchlater" count={watchLater.length} />
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Watch history</h2>
                {watchHistory.length > 0 && (
                  <button
                    onClick={() => setShowClearHistoryDialog(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear all watch history
                  </button>
                )}
              </div>

              {watchHistory.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                  {watchHistory.map(video => (
                    <HistoryVideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No watch history</h3>
                  <p className="text-gray-600">Videos you watch will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* Playlists Tab */}
          {activeTab === 'playlists' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Playlists</h2>
              
              {playlists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {playlists.map(playlist => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No playlists yet</h3>
                  <p className="text-gray-600">Create your first playlist to get started.</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Create playlist
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Liked Videos Tab */}
          {activeTab === 'liked' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Liked videos</h2>
              
              {likedVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {likedVideos.map(video => (
                    <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
                        <div className="text-xs text-gray-500">
                          <span>{video.views} • {video.time}</span>
                          <span className="mx-2">•</span>
                          <span>Liked {video.likedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No liked videos yet</h3>
                  <p className="text-gray-600">Videos you like will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* Watch Later Tab */}
          {activeTab === 'watchlater' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Watch later</h2>
              
              {watchLater.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchLater.map(video => (
                    <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
                        <div className="text-xs text-gray-500">
                          <span>{video.views} • {video.time}</span>
                          <span className="mx-2">•</span>
                          <span>Added {video.addedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No videos to watch later</h3>
                  <p className="text-gray-600">Save videos to watch later by tapping the clock icon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Clear History Dialog */}
      {showClearHistoryDialog && <ClearHistoryDialog />}
    </div>
  );
};

export default LibraryPage;