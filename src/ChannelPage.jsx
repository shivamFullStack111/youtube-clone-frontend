import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChannelPage = () => {
  const { channelId } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  const [subscribed, setSubscribed] = useState(false);
  
  // Mock channel data
  const channel = {
    id: channelId,
    name: "WebDev Simplified",
    handle: "@webdevsimplified",
    subscribers: "1.8M subscribers",
    videos: "428 videos",
    description: "Simplifying web development concepts with easy-to-understand tutorials and guides. Learn JavaScript, React, Node.js, CSS, and more!",
    banner: "https://picsum.photos/1200/300?random=50",
    avatar: "https://picsum.photos/80/80?random=10",
    joined: "Joined Mar 15, 2018",
    views: "185M views",
    links: [
      { name: "Website", url: "https://webdevsimplified.com" },
      { name: "Instagram", url: "https://instagram.com/webdevsimplified" },
      { name: "Twitter", url: "https://twitter.com/devsimplified" }
    ]
  };

  // Mock videos data
  const videos = [
    {
      id: 1,
      title: "React Tutorial for Beginners - Learn React in 10 Minutes",
      views: "1.2M views",
      time: "2 days ago",
      duration: "10:25",
      thumbnail: "https://picsum.photos/320/180?random=1"
    },
    {
      id: 2,
      title: "JavaScript Array Methods Explained - map, filter, reduce",
      views: "845K views",
      time: "1 week ago",
      duration: "15:42",
      thumbnail: "https://picsum.photos/320/180?random=2"
    },
    {
      id: 3,
      title: "CSS Flexbox Complete Guide - Everything You Need to Know",
      views: "2.1M views",
      time: "3 weeks ago",
      duration: "28:07",
      thumbnail: "https://picsum.photos/320/180?random=3"
    },
    {
      id: 4,
      title: "Node.js Crash Course - Build a REST API",
      views: "956K views",
      time: "1 month ago",
      duration: "42:18",
      thumbnail: "https://picsum.photos/320/180?random=4"
    },
    {
      id: 5,
      title: "React Hooks Explained - useState, useEffect, useContext",
      views: "1.5M views",
      time: "2 months ago",
      duration: "36:22",
      thumbnail: "https://picsum.photos/320/180?random=5"
    },
    {
      id: 6,
      title: "JavaScript Promises Explained - Async/Await Alternative",
      views: "721K views",
      time: "3 months ago",
      duration: "24:15",
      thumbnail: "https://picsum.photos/320/180?random=6"
    },
    {
      id: 7,
      title: "CSS Grid Layout Tutorial - Create Website Layouts",
      views: "1.3M views",
      time: "4 months ago",
      duration: "33:40",
      thumbnail: "https://picsum.photos/320/180?random=7"
    },
    {
      id: 8,
      title: "TypeScript for Beginners - Why and How to Use It",
      views: "892K views",
      time: "5 months ago",
      duration: "29:55",
      thumbnail: "https://picsum.photos/320/180?random=8"
    }
  ];

  // Mock playlists data
  const playlists = [
    {
      id: 1,
      title: "React Tutorial Series",
      videoCount: "12 videos",
      thumbnail: "https://picsum.photos/320/180?random=21",
      lastUpdated: "Updated 2 weeks ago"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      videoCount: "8 videos",
      thumbnail: "https://picsum.photos/320/180?random=22",
      lastUpdated: "Updated 1 month ago"
    },
    {
      id: 3,
      title: "CSS Mastery",
      videoCount: "10 videos",
      thumbnail: "https://picsum.photos/320/180?random=23",
      lastUpdated: "Updated 3 weeks ago"
    }
  ];

  // Mock about data
  const about = {
    description: channel.description,
    details: [
      { label: "Joined", value: channel.joined },
      { label: "Total views", value: channel.views }
    ],
    links: channel.links
  };

  const TabButton = ({ name, value, icon }) => (
    <button
      className={`flex items-center px-4 py-3 border-b-2 ${
        activeTab === value
          ? 'border-black text-black font-medium'
          : 'border-transparent text-gray-600 hover:text-black'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );

  const VideoCard = ({ video }) => (
    <div className="cursor-pointer group">
      <div className="relative mb-2">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-auto rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600">{video.title}</h3>
      <div className="text-xs text-gray-600">
        <span>{video.views}</span>
        <span className="mx-1">•</span>
        <span>{video.time}</span>
      </div>
    </div>
  );

  const PlaylistCard = ({ playlist }) => (
    <div className="cursor-pointer group">
      <div className="relative mb-2">
        <img 
          src={playlist.thumbnail} 
          alt={playlist.title}
          className="w-full h-auto rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full">
            View full playlist
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-full">
          {playlist.videoCount}
        </div>
      </div>
      <h3 className="font-medium text-sm mb-1 group-hover:text-blue-600">{playlist.title}</h3>
      <div className="text-xs text-gray-600">{playlist.lastUpdated}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Channel Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-purple-600 md:h-60">
        <img 
          src={channel.banner} 
          alt="Channel banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 pb-6">
          <div className="flex items-start">
            <img 
              src={channel.avatar} 
              alt={channel.name}
              className="w-20 h-20 rounded-full -mt-6 border-4 border-white md:w-24 md:h-24"
            />
            <div className="ml-4 mt-2">
              <h1 className="text-xl font-bold md:text-2xl">{channel.name}</h1>
              <p className="text-gray-600 text-sm">{channel.handle} • {channel.subscribers} • {channel.videos}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-1">{channel.description}</p>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button 
              className={`px-4 py-2 rounded-full font-medium text-sm ${
                subscribed 
                  ? 'bg-gray-200 text-black' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
              onClick={() => setSubscribed(!subscribed)}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            <TabButton name="Home" value="home" icon="🏠" />
            <TabButton name="Videos" value="videos" icon="🎥" />
            <TabButton name="Playlists" value="playlists" icon="📚" />
            <TabButton name="Community" value="community" icon="💬" />
            <TabButton name="Channels" value="channels" icon="🔗" />
            <TabButton name="About" value="about" icon="ℹ️" />
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {/* Home Tab */}
          {activeTab === 'home' && (
            <div>
              {/* Featured Content */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.slice(0, 4).map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>

              {/* Popular Uploads */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Popular videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>

              {/* Playlists */}
              <div>
                <h2 className="text-xl font-bold mb-4">Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {playlists.map(playlist => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Uploads</h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100">
                    Latest
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {/* Playlists Tab */}
          {activeTab === 'playlists' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Playlists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map(playlist => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No community posts yet</h3>
              <p className="text-gray-600">When this channel posts to Community, you'll see it here.</p>
            </div>
          )}

          {/* Channels Tab */}
          {activeTab === 'channels' && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No featured channels</h3>
              <p className="text-gray-600">This channel hasn't featured any other channels yet.</p>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-800 mb-8">{about.description}</p>
              
              <h2 className="text-xl font-bold mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {about.details.map((detail, index) => (
                  <div key={index}>
                    <span className="font-medium text-gray-700">{detail.label}:</span>
                    <span className="ml-2 text-gray-600">{detail.value}</span>
                  </div>
                ))}
              </div>
              
              <h2 className="text-xl font-bold mb-4">Links</h2>
              <div className="space-y-2">
                {about.links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;