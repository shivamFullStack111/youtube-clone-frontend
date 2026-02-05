import React, { useState } from 'react';

const TrendingPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for trending videos
  const trendingVideos = {
    all: [
      {
        id: 1,
        title: "React 18 New Features - Everything You Need to Know",
        channel: "WebDev Simplified",
        views: "2.4M views",
        time: "5 hours ago",
        duration: "18:32",
        thumbnail: "https://picsum.photos/320/180?random=1",
        channelImg: "https://picsum.photos/36/36?random=10",
        trendingReason: "Trending in Technology"
      },
      {
        id: 2,
        title: "JavaScript Pro Tips - 10 Tricks You Didn't Know",
        channel: "JS Master",
        views: "1.8M views",
        time: "8 hours ago",
        duration: "15:45",
        thumbnail: "https://picsum.photos/320/180?random=2",
        channelImg: "https://picsum.photos/36/36?random=11",
        trendingReason: "Trending in Programming"
      },
      {
        id: 3,
        title: "iPhone 15 Unboxing and First Impressions",
        channel: "Tech Review",
        views: "3.2M views",
        time: "1 day ago",
        duration: "22:18",
        thumbnail: "https://picsum.photos/320/180?random=3",
        channelImg: "https://picsum.photos/36/36?random=12",
        trendingReason: "Trending in Technology"
      },
      {
        id: 4,
        title: "Cooking the Perfect Steak - Chef's Secret Technique",
        channel: "Culinary Arts",
        views: "1.5M views",
        time: "2 days ago",
        duration: "12:55",
        thumbnail: "https://picsum.photos/320/180?random=4",
        channelImg: "https://picsum.photos/36/36?random=13",
        trendingReason: "Trending in Food"
      },
      {
        id: 5,
        title: "Gaming Highlights - Best Moments of the Week",
        channel: "Pro Gamer",
        views: "4.7M views",
        time: "3 days ago",
        duration: "28:40",
        thumbnail: "https://picsum.photos/320/180?random=5",
        channelImg: "https://picsum.photos/36/36?random=14",
        trendingReason: "Trending in Gaming"
      },
      {
        id: 6,
        title: "Workout Routine for Beginners - 30 Day Challenge",
        channel: "Fitness Coach",
        views: "2.1M views",
        time: "4 days ago",
        duration: "25:15",
        thumbnail: "https://picsum.photos/320/180?random=6",
        channelImg: "https://picsum.photos/36/36?random=15",
        trendingReason: "Trending in Fitness"
      },
      {
        id: 7,
        title: "Travel Vlog: Japan Cherry Blossom Season",
        channel: "World Explorer",
        views: "3.8M views",
        time: "5 days ago",
        duration: "32:10",
        thumbnail: "https://picsum.photos/320/180?random=7",
        channelImg: "https://picsum.photos/36/36?random=16",
        trendingReason: "Trending in Travel"
      },
      {
        id: 8,
        title: "Music Production Masterclass - Make Beats Like a Pro",
        channel: "Beat Maker",
        views: "1.9M views",
        time: "6 days ago",
        duration: "45:22",
        thumbnail: "https://picsum.photos/320/180?random=8",
        channelImg: "https://picsum.photos/36/36?random=17",
        trendingReason: "Trending in Music"
      }
    ],
    music: [
      {
        id: 9,
        title: "Top Hits of 2023 - Official Music Video Compilation",
        channel: "Music Charts",
        views: "5.2M views",
        time: "1 day ago",
        duration: "52:30",
        thumbnail: "https://picsum.photos/320/180?random=9",
        channelImg: "https://picsum.photos/36/36?random=18",
        trendingReason: "Trending in Music"
      },
      {
        id: 10,
        title: "Guitar Tutorial - Learn Your Favorite Song in 10 Minutes",
        channel: "Guitar Master",
        views: "1.3M views",
        time: "2 days ago",
        duration: "11:45",
        thumbnail: "https://picsum.photos/320/180?random=10",
        channelImg: "https://picsum.photos/36/36?random=19",
        trendingReason: "Trending in Music"
      }
    ],
    gaming: [
      {
        id: 11,
        title: "New Game Release - Full Gameplay Walkthrough",
        channel: "Gaming Central",
        views: "3.6M views",
        time: "1 day ago",
        duration: "1:28:15",
        thumbnail: "https://picsum.photos/320/180?random=11",
        channelImg: "https://picsum.photos/36/36?random=20",
        trendingReason: "Trending in Gaming"
      },
      {
        id: 12,
        title: "Esports Championship Finals - Highlights",
        channel: "Pro Gaming",
        views: "2.8M views",
        time: "3 days ago",
        duration: "24:50",
        thumbnail: "https://picsum.photos/320/180?random=12",
        channelImg: "https://picsum.photos/36/36?random=21",
        trendingReason: "Trending in Gaming"
      }
    ],
    movies: [
      {
        id: 13,
        title: "Blockbuster Movie Trailer Breakdown - Easter Eggs Revealed",
        channel: "Movie Insider",
        views: "4.1M views",
        time: "2 days ago",
        duration: "18:20",
        thumbnail: "https://picsum.photos/320/180?random=13",
        channelImg: "https://picsum.photos/36/36?random=22",
        trendingReason: "Trending in Movies"
      },
      {
        id: 14,
        title: "Director's Interview - Behind the Scenes of New Film",
        channel: "Cinema Talks",
        views: "2.3M views",
        time: "4 days ago",
        duration: "26:45",
        thumbnail: "https://picsum.photos/320/180?random=14",
        channelImg: "https://picsum.photos/36/36?random=23",
        trendingReason: "Trending in Movies"
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'news', name: 'News' },
    { id: 'movies', name: 'Movies' },
    { id: 'sports', name: 'Sports' },
    { id: 'learning', name: 'Learning' },
    { id: 'fashion', name: 'Fashion & Beauty' }
  ];

  const CategoryButton = ({ category }) => (
    <button
      className={`px-4 py-2 rounded-full whitespace-nowrap ${
        activeCategory === category.id
          ? 'bg-black text-white'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={() => setActiveCategory(category.id)}
    >
      {category.name}
    </button>
  );

  const VideoCard = ({ video }) => (
    <div className="cursor-pointer group">
      <div className="relative mb-3">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-auto rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex">
        <img 
          src={video.channelImg} 
          alt={video.channel}
          className="w-9 h-9 rounded-full mr-3 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600">{video.title}</h3>
          <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
          <div className="text-xs text-gray-500">
            <span className="text-red-600 font-medium">{video.trendingReason}</span>
            <span className="mx-1">•</span>
            <span>{video.views}</span>
            <span className="mx-1">•</span>
            <span>{video.time}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Get videos for active category
  const videos = trendingVideos[activeCategory] || trendingVideos.all;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Trending</h1>
          
          {/* Categories */}
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {categories.map(category => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Now Trending Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Now Trending</h2>
          
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No trending videos</h3>
              <p className="text-gray-600">There are no trending videos in this category right now.</p>
            </div>
          )}
        </div>

        {/* Breaking News Section */}
        {activeCategory === 'all' || activeCategory === 'news' ? (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Breaking News</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-medium">LIVE</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">Updated 10 minutes ago</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Major Tech Conference Announcements</h3>
                <p className="text-gray-700 mb-4">
                  Breaking news from the biggest tech conference of the year. New product launches, 
                  innovative technologies, and industry-changing announcements.
                </p>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    Watch Live Coverage
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                    Read Summary
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Creator Spotlight */}
        {activeCategory === 'all' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Creator Spotlight</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://picsum.photos/60/60?random=30" 
                    alt="Creator"
                    className="w-15 h-15 rounded-full mr-4 border-2 border-white"
                  />
                  <div>
                    <h3 className="font-bold text-lg">WebDev Simplified</h3>
                    <p className="text-purple-200">1.8M subscribers</p>
                  </div>
                </div>
                <p className="mb-4">
                  Creating simplified web development tutorials that make complex concepts easy to understand.
                </p>
                <button className="px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-medium hover:bg-gray-100">
                  Subscribe
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://picsum.photos/60/60?random=31" 
                    alt="Creator"
                    className="w-15 h-15 rounded-full mr-4 border-2 border-white"
                  />
                  <div>
                    <h3 className="font-bold text-lg">Tech Review</h3>
                    <p className="text-blue-200">2.3M subscribers</p>
                  </div>
                </div>
                <p className="mb-4">
                  Honest and detailed reviews of the latest tech products and gadgets.
                </p>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-full text-sm font-medium hover:bg-gray-100">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trending Charts - For Music Category */}
        {activeCategory === 'music' && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-6">Trending Music Charts</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Top Songs</h3>
                <span className="text-sm text-gray-600">Updated today</span>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <div className="w-8 text-center text-gray-500 font-medium">{index + 1}</div>
                    <img 
                      src={`https://picsum.photos/40/40?random=${40 + index}`}
                      alt="Song"
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">Popular Song Title {index + 1}</h4>
                      <p className="text-xs text-gray-600">Artist Name</p>
                    </div>
                    <div className="text-xs text-gray-500">3:2{index}</div>
                    <button className="ml-3 p-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-md border border-gray-200 text-sm">
                View full chart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPage;