// import React, { useState } from "react";

// const TrendingPage = () => {
//   const [activeCategory, setActiveCategory] = useState("all");

//   // Mock data for trending videos
//   const trendingVideos = {
//     all: [
//       {
//         id: 1,
//         title: "React 18 New Features - Everything You Need to Know",
//         channel: "WebDev Simplified",
//         views: "2.4M views",
//         time: "5 hours ago",
//         duration: "18:32",
//         thumbnail: "https://picsum.photos/320/180?random=1",
//         channelImg: "https://picsum.photos/36/36?random=10",
//         trendingReason: "Trending in Technology",
//       },
//       {
//         id: 2,
//         title: "JavaScript Pro Tips - 10 Tricks You Didn't Know",
//         channel: "JS Master",
//         views: "1.8M views",
//         time: "8 hours ago",
//         duration: "15:45",
//         thumbnail: "https://picsum.photos/320/180?random=2",
//         channelImg: "https://picsum.photos/36/36?random=11",
//         trendingReason: "Trending in Programming",
//       },
//       {
//         id: 3,
//         title: "iPhone 15 Unboxing and First Impressions",
//         channel: "Tech Review",
//         views: "3.2M views",
//         time: "1 day ago",
//         duration: "22:18",
//         thumbnail: "https://picsum.photos/320/180?random=3",
//         channelImg: "https://picsum.photos/36/36?random=12",
//         trendingReason: "Trending in Technology",
//       },
//       {
//         id: 4,
//         title: "Cooking the Perfect Steak - Chef's Secret Technique",
//         channel: "Culinary Arts",
//         views: "1.5M views",
//         time: "2 days ago",
//         duration: "12:55",
//         thumbnail: "https://picsum.photos/320/180?random=4",
//         channelImg: "https://picsum.photos/36/36?random=13",
//         trendingReason: "Trending in Food",
//       },
//       {
//         id: 5,
//         title: "Gaming Highlights - Best Moments of the Week",
//         channel: "Pro Gamer",
//         views: "4.7M views",
//         time: "3 days ago",
//         duration: "28:40",
//         thumbnail: "https://picsum.photos/320/180?random=5",
//         channelImg: "https://picsum.photos/36/36?random=14",
//         trendingReason: "Trending in Gaming",
//       },
//       {
//         id: 6,
//         title: "Workout Routine for Beginners - 30 Day Challenge",
//         channel: "Fitness Coach",
//         views: "2.1M views",
//         time: "4 days ago",
//         duration: "25:15",
//         thumbnail: "https://picsum.photos/320/180?random=6",
//         channelImg: "https://picsum.photos/36/36?random=15",
//         trendingReason: "Trending in Fitness",
//       },
//       {
//         id: 7,
//         title: "Travel Vlog: Japan Cherry Blossom Season",
//         channel: "World Explorer",
//         views: "3.8M views",
//         time: "5 days ago",
//         duration: "32:10",
//         thumbnail: "https://picsum.photos/320/180?random=7",
//         channelImg: "https://picsum.photos/36/36?random=16",
//         trendingReason: "Trending in Travel",
//       },
//       {
//         id: 8,
//         title: "Music Production Masterclass - Make Beats Like a Pro",
//         channel: "Beat Maker",
//         views: "1.9M views",
//         time: "6 days ago",
//         duration: "45:22",
//         thumbnail: "https://picsum.photos/320/180?random=8",
//         channelImg: "https://picsum.photos/36/36?random=17",
//         trendingReason: "Trending in Music",
//       },
//     ],
//     music: [
//       {
//         id: 9,
//         title: "Top Hits of 2023 - Official Music Video Compilation",
//         channel: "Music Charts",
//         views: "5.2M views",
//         time: "1 day ago",
//         duration: "52:30",
//         thumbnail: "https://picsum.photos/320/180?random=9",
//         channelImg: "https://picsum.photos/36/36?random=18",
//         trendingReason: "Trending in Music",
//       },
//       {
//         id: 10,
//         title: "Guitar Tutorial - Learn Your Favorite Song in 10 Minutes",
//         channel: "Guitar Master",
//         views: "1.3M views",
//         time: "2 days ago",
//         duration: "11:45",
//         thumbnail: "https://picsum.photos/320/180?random=10",
//         channelImg: "https://picsum.photos/36/36?random=19",
//         trendingReason: "Trending in Music",
//       },
//     ],
//     gaming: [
//       {
//         id: 11,
//         title: "New Game Release - Full Gameplay Walkthrough",
//         channel: "Gaming Central",
//         views: "3.6M views",
//         time: "1 day ago",
//         duration: "1:28:15",
//         thumbnail: "https://picsum.photos/320/180?random=11",
//         channelImg: "https://picsum.photos/36/36?random=20",
//         trendingReason: "Trending in Gaming",
//       },
//       {
//         id: 12,
//         title: "Esports Championship Finals - Highlights",
//         channel: "Pro Gaming",
//         views: "2.8M views",
//         time: "3 days ago",
//         duration: "24:50",
//         thumbnail: "https://picsum.photos/320/180?random=12",
//         channelImg: "https://picsum.photos/36/36?random=21",
//         trendingReason: "Trending in Gaming",
//       },
//     ],
//     movies: [
//       {
//         id: 13,
//         title: "Blockbuster Movie Trailer Breakdown - Easter Eggs Revealed",
//         channel: "Movie Insider",
//         views: "4.1M views",
//         time: "2 days ago",
//         duration: "18:20",
//         thumbnail: "https://picsum.photos/320/180?random=13",
//         channelImg: "https://picsum.photos/36/36?random=22",
//         trendingReason: "Trending in Movies",
//       },
//       {
//         id: 14,
//         title: "Director's Interview - Behind the Scenes of New Film",
//         channel: "Cinema Talks",
//         views: "2.3M views",
//         time: "4 days ago",
//         duration: "26:45",
//         thumbnail: "https://picsum.photos/320/180?random=14",
//         channelImg: "https://picsum.photos/36/36?random=23",
//         trendingReason: "Trending in Movies",
//       },
//     ],
//   };

//   const categories = [
//     { id: "all", name: "All" },
//     { id: "music", name: "Music" },
//     { id: "gaming", name: "Gaming" },
//     { id: "news", name: "News" },
//     { id: "movies", name: "Movies" },
//     { id: "sports", name: "Sports" },
//     { id: "learning", name: "Learning" },
//     { id: "fashion", name: "Fashion & Beauty" },
//   ];

//   const CategoryButton = ({ category }) => (
//     <button
//       className={`px-4 py-2 rounded-full whitespace-nowrap ${
//         activeCategory === category.id
//           ? "bg-black text-white"
//           : "bg-gray-100 hover:bg-gray-200"
//       }`}
//       onClick={() => setActiveCategory(category.id)}
//     >
//       {category.name}
//     </button>
//   );

//   const VideoCard = ({ video }) => (
//     <div className="cursor-pointer group">
//       <div className="relative mb-3">
//         <img
//           src={video.thumbnail}
//           alt={video.title}
//           className="w-full h-auto rounded-lg group-hover:rounded-none transition-all duration-200"
//         />
//         <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
//           {video.duration}
//         </div>
//       </div>
//       <div className="flex">
//         <img
//           src={video.channelImg}
//           alt={video.channel}
//           className="w-9 h-9 rounded-full mr-3 flex-shrink-0"
//         />
//         <div className="flex-1 min-w-0">
//           <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600">
//             {video.title}
//           </h3>
//           <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
//           <div className="text-xs text-gray-500">
//             <span className="text-red-600 font-medium">
//               {video.trendingReason}
//             </span>
//             <span className="mx-1">•</span>
//             <span>{video.views}</span>
//             <span className="mx-1">•</span>
//             <span>{video.time}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Get videos for active category
//   const videos = trendingVideos[activeCategory] || trendingVideos.all;

//   return (
//     <div className="min-h-screen bg-gray-50 pb-8">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-2xl font-bold mb-4">Trending</h1>

//           {/* Categories */}
//           <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
//             {categories.map((category) => (
//               <CategoryButton key={category.id} category={category} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-6xl mx-auto p-4">
//         {/* Now Trending Section */}
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-6">Now Trending</h2>

//           {videos.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {videos.map((video) => (
//                 <VideoCard key={video.id} video={video} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   className="w-12 h-12 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                   ></path>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No trending videos
//               </h3>
//               <p className="text-gray-600">
//                 There are no trending videos in this category right now.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Trending Charts - For Music Category */}
//         {activeCategory === "music" && (
//           <div className="mt-8">
//             <h2 className="text-xl font-bold mb-6">Trending Music Charts</h2>
//             <div className="bg-white rounded-lg border border-gray-200 p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-bold">Top Songs</h3>
//                 <span className="text-sm text-gray-600">Updated today</span>
//               </div>

//               <div className="space-y-3">
//                 {[1, 2, 3, 4, 5].map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center p-2 hover:bg-gray-50 rounded"
//                   >
//                     <div className="w-8 text-center text-gray-500 font-medium">
//                       {index + 1}
//                     </div>
//                     <img
//                       src={`https://picsum.photos/40/40?random=${40 + index}`}
//                       alt="Song"
//                       className="w-10 h-10 rounded mr-3"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-medium text-sm truncate">
//                         Popular Song Title {index + 1}
//                       </h4>
//                       <p className="text-xs text-gray-600">Artist Name</p>
//                     </div>
//                     <div className="text-xs text-gray-500">3:2{index}</div>
//                     <button className="ml-3 p-1 text-gray-400 hover:text-gray-600">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                         ></path>
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         ></path>
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <button className="w-full mt-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-md border border-gray-200 text-sm">
//                 View full chart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrendingPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const TrendingPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "Music", name: "Music" },
    { id: "Gaming", name: "Gaming" },
    { id: "Coding", name: "Coding" },
    { id: "React", name: "React" },
    { id: "JavaScript", name: "JavaScript" },
    { id: "Cooking", name: "Cooking" },
    { id: "Travel", name: "Travel" },
    { id: "Fitness", name: "Fitness" },
    { id: "Tech", name: "Tech" },
    { id: "Education", name: "Education" },
  ];

  // Fetch trending videos from API
  const fetchTrendingVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/video/trending.php"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const apiVideos = result.data || [];
        
        // Transform API data to match our component structure
        const transformedVideos = apiVideos.map(video => {
          const uploadedBy = video.uploadedBy || {};
          
          return {
            id: video.id,
            title: video.title,
            channel: uploadedBy.channelName || uploadedBy.name || "Unknown Channel",
            views: formatViews(video.totalViews),
            time: formatTimeAgo(video.createdAt),
            duration: "10:00", // You can calculate this if you have duration in DB
            thumbnail: `https://picsum.photos/320/180?random=${video.id}`,
            channelImg: `https://picsum.photos/36/36?random=${video.id + 100}`,
            trendingReason: getTrendingReason(video.totalViews, video.category),
            category: video.category || "Uncategorized",
            description: video.description,
            videoUrl: video.videoUrl,
            likes: video.totalLikes || 0,
            dislikes: video.totalDislike || 0
          };
        });
        
        setVideos(transformedVideos);
        setFilteredVideos(transformedVideos);
      } else {
        throw new Error(result.message || 'Failed to fetch trending videos');
      }
    } catch (err) {
      console.error("Error fetching trending videos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
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

  // Get trending reason based on views and category
  const getTrendingReason = (views, category) => {
    const numViews = parseInt(views) || 0;
    
    if (numViews >= 1000000) {
      return "Super Trending 🔥";
    } else if (numViews >= 500000) {
      return "Trending Now ⚡";
    } else if (numViews >= 100000) {
      return `Trending in ${category || "this category"}`;
    } else {
      return "Getting Popular 📈";
    }
  };

  // Filter videos by category
  const filterVideosByCategory = (categoryId) => {
    setActiveCategory(categoryId);
    
    if (categoryId === "all") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(video => 
        video.category && video.category.toLowerCase() === categoryId.toLowerCase()
      );
      setFilteredVideos(filtered);
    }
  };

  // Calculate duration (mock - you can implement real duration if available)
  const calculateDuration = () => {
    const minutes = Math.floor(Math.random() * 30) + 5;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const CategoryButton = ({ category }) => (
    <button
      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
        activeCategory === category.id
          ? "bg-black text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={() => filterVideosByCategory(category.id)}
    >
      {category.name}
    </button>
  );

  const VideoCard = ({ video }) => (
    <Link to={`/video/${video.id}`}>
      <div className="cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200">
        <div className="relative mb-3">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover rounded-lg group-hover:rounded-xl transition-all duration-200"
            onError={(e) => {
              e.target.src = `https://picsum.photos/320/180?random=${video.id}`;
            }}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {calculateDuration()}
          </div>
          {video.totalViews > 100000 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              TRENDING
            </div>
          )}
        </div>
        <div className="flex">
          <img
            src={video.channelImg}
            alt={video.channel}
            className="w-9 h-9 rounded-full mr-3 flex-shrink-0"
            onError={(e) => {
              e.target.src = `https://picsum.photos/36/36?random=${video.id + 100}`;
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600">
              {video.title}
            </h3>
            <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
            <div className="text-xs text-gray-500">
              <span className="text-red-600 font-medium">
                {video.trendingReason}
              </span>
              <span className="mx-1">•</span>
              <span>{video.views}</span>
              <span className="mx-1">•</span>
              <span>{video.time}</span>
            </div>
            {video.category && (
              <div className="mt-1">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                  {video.category}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  // Get music charts data for music category
  const musicCharts = filteredVideos
    .filter(video => video.category === "Music")
    .slice(0, 5)
    .map((video, index) => ({
      ...video,
      position: index + 1
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pb-8 pt-2">
        {/* Header */}
        <div className="sticky top-14 z-10 bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Trending</h1>
            <p className="text-gray-600 mb-4 text-sm">
              Videos that are popular and gaining views rapidly
            </p>

            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
              {categories.map((category) => (
                <CategoryButton key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-4">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <span className="ml-4">Loading trending videos...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load trending videos</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchTrendingVideos}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Now Trending Section */}
          {!loading && !error && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  Now Trending {activeCategory !== "all" ? `in ${categories.find(c => c.id === activeCategory)?.name}` : ""}
                </h2>
                <span className="text-sm text-gray-600">
                  {filteredVideos.length} videos
                </span>
              </div>

              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVideos.map((video) => (
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No trending videos found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    There are no trending videos in this category right now.
                  </p>
                  <button
                    onClick={() => filterVideosByCategory("all")}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    View All Trending
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Trending Charts - For Music Category */}
          {!loading && !error && activeCategory === "Music" && musicCharts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-6">Trending Music Charts</h2>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Top Trending Music Videos</h3>
                    <span className="text-sm text-gray-600">Updated today</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {musicCharts.map((video, index) => (
                    <Link
                      key={video.id}
                      to={`/video/${video.id}`}
                      className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-8 text-center font-bold ${
                        index === 0 ? "text-red-600" : 
                        index === 1 ? "text-orange-600" : 
                        index === 2 ? "text-yellow-600" : "text-gray-500"
                      }`}>
                        {index + 1}
                      </div>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-16 rounded mr-4 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{video.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 mr-3">{video.views}</span>
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">
                            Trending
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mr-4">{calculateDuration()}</div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </button>
                    </Link>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => filterVideosByCategory("all")}
                    className="w-full py-3 text-center text-blue-600 hover:bg-blue-50 rounded-md border border-gray-200 text-sm font-medium"
                  >
                    View all trending videos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Section */}
          {!loading && !error && filteredVideos.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h3 className="text-lg font-bold mb-4">Trending Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredVideos.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Videos</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {filteredVideos.reduce((total, video) => {
                      const views = parseInt(video.views) || 0;
                      return total + views;
                    }, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-red-600">
                    {categories.find(c => c.id === activeCategory)?.name || "All"}
                  </div>
                  <div className="text-sm text-gray-600">Current Category</div>
                </div>
              </div>
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

export default TrendingPage;