// import React, { useState } from "react";

// const LibraryPage = () => {
//   const [activeTab, setActiveTab] = useState("history");
//   const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);

//   // Mock data for watch history
//   const watchHistory = [
//     {
//       id: 1,
//       title: "React Tutorial for Beginners - Learn React in 10 Minutes",
//       channel: "WebDev Simplified",
//       views: "1.2M views",
//       time: "2 days ago",
//       duration: "10:25",
//       thumbnail: "https://picsum.photos/320/180?random=1",
//       channelImg: "https://picsum.photos/36/36?random=10",
//       watchedDate: "2 hours ago",
//     },
//   ];

//   // Mock data for liked videos
//   const likedVideos = [
//     {
//       id: 6,
//       title: "TypeScript for Beginners - Why and How to Use It",
//       channel: "TypeScript Master",
//       views: "892K views",
//       time: "5 months ago",
//       duration: "29:55",
//       thumbnail: "https://picsum.photos/320/180?random=6",
//       channelImg: "https://picsum.photos/36/36?random=15",
//       likedDate: "1 week ago",
//     },
//   ];

//   // Mock data for watch later
//   const watchLater = [
//     {
//       id: 9,
//       title: "Advanced React Patterns",
//       channel: "React Advanced",
//       views: "456K views",
//       time: "2 weeks ago",
//       duration: "45:20",
//       thumbnail: "https://picsum.photos/320/180?random=9",
//       channelImg: "https://picsum.photos/36/36?random=18",
//       addedDate: "Yesterday",
//     },
//     {
//       id: 10,
//       title: "JavaScript Interview Preparation",
//       channel: "Interview Ready",
//       views: "1.1M views",
//       time: "1 month ago",
//       duration: "38:15",
//       thumbnail: "https://picsum.photos/320/180?random=10",
//       channelImg: "https://picsum.photos/36/36?random=19",
//       addedDate: "3 days ago",
//     },
//   ];

//   const TabButton = ({ name, value, count }) => (
//     <button
//       className={`flex items-center px-4 py-3 border-b-2 ${
//         activeTab === value
//           ? "border-black text-black font-medium"
//           : "border-transparent text-gray-600 hover:text-black"
//       }`}
//       onClick={() => setActiveTab(value)}
//     >
//       {name}
//       {count > 0 && (
//         <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//           {count}
//         </span>
//       )}
//     </button>
//   );

//   const HistoryVideoCard = ({ video }) => (
//     <div className="flex items-start mb-4 p-2 hover:bg-gray-100 rounded-lg">
//       <div className="relative w-40 h-24 flex-shrink-0 mr-4">
//         <img
//           src={video.thumbnail}
//           alt={video.title}
//           className="w-full h-full object-cover rounded-lg"
//         />
//         <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
//           {video.duration}
//         </div>
//       </div>
//       <div className="flex-1 min-w-0">
//         <h3 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h3>
//         <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
//         <div className="text-xs text-gray-500">
//           <span>
//             {video.views} • {video.time}
//           </span>
//           <span className="mx-2">•</span>
//           <span>Watched {video.watchedDate}</span>
//         </div>
//       </div>
//       <button className="p-2 text-gray-400 hover:text-gray-600">
//         <svg
//           className="w-4 h-4"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M6 18L18 6M6 6l12 12"
//           ></path>
//         </svg>
//       </button>
//     </div>
//   );

//   const ClearHistoryDialog = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <h3 className="text-lg font-medium mb-4">Clear watch history?</h3>
//         <p className="text-gray-600 mb-6">
//           This will remove all videos from your watch history. This action
//           cannot be undone.
//         </p>
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={() => setShowClearHistoryDialog(false)}
//             className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               // Handle clear history logic here
//               setShowClearHistoryDialog(false);
//             }}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Clear watch history
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 pb-8">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 p-4">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-2xl font-bold">Library</h1>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-6xl mx-auto p-4">
//         {/* Tabs */}
//         <div className="border-b border-gray-200 mb-6">
//           <div className="flex overflow-x-auto hide-scrollbar">
//             <TabButton
//               name="History"
//               value="history"
//               count={watchHistory.length}
//             />
//             <TabButton
//               name="Liked videos"
//               value="liked"
//               count={likedVideos.length}
//             />
//             <TabButton
//               name="Watch later"
//               value="watchlater"
//               count={watchLater.length}
//             />
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div>
//           {/* History Tab */}
//           {activeTab === "history" && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Watch history</h2>
//                 {watchHistory.length > 0 && (
//                   <button
//                     onClick={() => setShowClearHistoryDialog(true)}
//                     className="text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     Clear all watch history
//                   </button>
//                 )}
//               </div>

//               {watchHistory.length > 0 ? (
//                 <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
//                   {watchHistory.map((video) => (
//                     <HistoryVideoCard key={video.id} video={video} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg
//                       className="w-12 h-12 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No watch history
//                   </h3>
//                   <p className="text-gray-600">
//                     Videos you watch will appear here.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Liked Videos Tab */}
//           {activeTab === "liked" && (
//             <div>
//               <h2 className="text-xl font-bold mb-6">Liked videos</h2>

//               {likedVideos.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {likedVideos.map((video) => (
//                     <div
//                       key={video.id}
//                       className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
//                     >
//                       <div className="relative">
//                         <img
//                           src={video.thumbnail}
//                           alt={video.title}
//                           className="w-full h-40 object-cover"
//                         />
//                         <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
//                           {video.duration}
//                         </div>
//                       </div>
//                       <div className="p-3">
//                         <h3 className="font-medium text-sm mb-1 line-clamp-2">
//                           {video.title}
//                         </h3>
//                         <p className="text-xs text-gray-600 mb-1">
//                           {video.channel}
//                         </p>
//                         <div className="text-xs text-gray-500">
//                           <span>
//                             {video.views} • {video.time}
//                           </span>
//                           <span className="mx-2">•</span>
//                           <span>Liked {video.likedDate}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg
//                       className="w-12 h-12 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No liked videos yet
//                   </h3>
//                   <p className="text-gray-600">
//                     Videos you like will appear here.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Watch Later Tab */}
//           {activeTab === "watchlater" && (
//             <div>
//               <h2 className="text-xl font-bold mb-6">Watch later</h2>

//               {watchLater.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {watchLater.map((video) => (
//                     <div
//                       key={video.id}
//                       className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
//                     >
//                       <div className="relative">
//                         <img
//                           src={video.thumbnail}
//                           alt={video.title}
//                           className="w-full h-40 object-cover"
//                         />
//                         <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
//                           {video.duration}
//                         </div>
//                       </div>
//                       <div className="p-3">
//                         <h3 className="font-medium text-sm mb-1 line-clamp-2">
//                           {video.title}
//                         </h3>
//                         <p className="text-xs text-gray-600 mb-1">
//                           {video.channel}
//                         </p>
//                         <div className="text-xs text-gray-500">
//                           <span>
//                             {video.views} • {video.time}
//                           </span>
//                           <span className="mx-2">•</span>
//                           <span>Added {video.addedDate}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg
//                       className="w-12 h-12 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No videos to watch later
//                   </h3>
//                   <p className="text-gray-600">
//                     Save videos to watch later by tapping the clock icon.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Clear History Dialog */}
//       {showClearHistoryDialog && <ClearHistoryDialog />}
//     </div>
//   );
// };

// export default LibraryPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [historyVideos, setHistoryVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadLibraryData();
  }, []);

  // Load data from localStorage
  const loadLibraryData = () => {
    try {
      // Load watch history
      const historyData = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      setHistoryVideos(historyData);

      // Load liked videos
      const likedData = JSON.parse(localStorage.getItem("likedVideos") || "[]");
      setLikedVideos(likedData);

      // Load watch later
      const watchLaterData = JSON.parse(localStorage.getItem("watchLater") || "[]");
      setWatchLaterVideos(watchLaterData);
    } catch (error) {
      console.error("Error loading library data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear watch history
  const clearWatchHistory = () => {
    localStorage.removeItem("watchHistory");
    setHistoryVideos([]);
    setShowClearHistoryDialog(false);
  };

  // Remove video from history
  const removeFromHistory = (videoId) => {
    const updatedHistory = historyVideos.filter(video => video.id != videoId);
    localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
    setHistoryVideos(updatedHistory);
  };

  // Remove video from liked videos
  const removeFromLiked = (videoId) => {
    const updatedLiked = likedVideos.filter(video => video.id != videoId);
    localStorage.setItem("likedVideos", JSON.stringify(updatedLiked));
    setLikedVideos(updatedLiked);
  };

  // Remove video from watch later
  const removeFromWatchLater = (videoId) => {
    const updatedWatchLater = watchLaterVideos.filter(video => video.id != videoId);
    localStorage.setItem("watchLater", JSON.stringify(updatedWatchLater));
    setWatchLaterVideos(updatedWatchLater);
  };

  // Format date to relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const TabButton = ({ name, value, count }) => (
    <button
      className={`flex items-center px-4 py-3 border-b-2 transition-colors ${
        activeTab === value
          ? "border-black text-black font-medium"
          : "border-transparent text-gray-600 hover:text-black"
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
    <div className="flex items-start mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Link to={`/video/${video.id}`} className="relative w-40 h-24 flex-shrink-0 mr-4">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover rounded-lg hover:rounded-none transition-all duration-200"
          onError={(e) => {
            e.target.src = `https://picsum.photos/320/180?random=${video.id}`;
          }}
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration || "10:00"}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/video/${video.id}`}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-blue-600">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
        <div className="text-xs text-gray-500">
          <span>
            {video.views} • {video.time}
          </span>
          <span className="mx-2">•</span>
          <span>Watched {formatRelativeTime(video.watchedAt)}</span>
        </div>
      </div>
      <button 
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full"
        onClick={() => removeFromHistory(video.id)}
        title="Remove from history"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );

  const LikedVideoCard = ({ video }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/video/${video.id}`} className="relative block">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = `https://picsum.photos/320/180?random=${video.id}`;
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration || "10:00"}
        </div>
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          ❤️ Liked
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/video/${video.id}`}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-blue-600">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span>
              {video.views} • {video.time}
            </span>
            <span className="mx-2">•</span>
            <span>Liked {formatRelativeTime(video.likedAt)}</span>
          </div>
          <button 
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-full"
            onClick={() => removeFromLiked(video.id)}
            title="Remove from liked videos"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const WatchLaterCard = ({ video }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/video/${video.id}`} className="relative block">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = `https://picsum.photos/320/180?random=${video.id}`;
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration || "10:00"}
        </div>
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          ⏰ Later
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/video/${video.id}`}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-blue-600">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span>
              {video.views} • {video.time}
            </span>
            <span className="mx-2">•</span>
            <span>Added {formatRelativeTime(video.savedAt)}</span>
          </div>
          <button 
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            onClick={() => removeFromWatchLater(video.id)}
            title="Remove from watch later"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
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
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={clearWatchHistory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Clear watch history
          </button>
        </div>
      </div>
    </div>
  );

  // Refresh data when tab changes
  useEffect(() => {
    loadLibraryData();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4">Loading library...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pb-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Library</h1>
            <p className="text-gray-600 text-sm mt-1">
              Your personal collection of videos
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-4">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 bg-white rounded-t-lg">
            <div className="flex overflow-x-auto hide-scrollbar">
              <TabButton
                name="History"
                value="history"
                count={historyVideos.length}
              />
              <TabButton
                name="Liked videos"
                value="liked"
                count={likedVideos.length}
              />
              <TabButton
                name="Watch later"
                value="watchlater"
                count={watchLaterVideos.length}
              />
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* History Tab */}
            {activeTab === "history" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Watch history</h2>
                  {historyVideos.length > 0 && (
                    <button
                      onClick={() => setShowClearHistoryDialog(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                    >
                      Clear all watch history
                    </button>
                  )}
                </div>

                {historyVideos.length > 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                    {historyVideos.map((video) => (
                      <HistoryVideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No watch history
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Videos you watch will appear here.
                    </p>
                    <Link
                      to="/"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Browse Videos
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Liked Videos Tab */}
            {activeTab === "liked" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Liked videos</h2>
                  {likedVideos.length > 0 && (
                    <div className="text-sm text-gray-600">
                      {likedVideos.length} {likedVideos.length === 1 ? 'video' : 'videos'}
                    </div>
                  )}
                </div>

                {likedVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {likedVideos.map((video) => (
                      <LikedVideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No liked videos yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Like videos to save them here.
                    </p>
                    <Link
                      to="/"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Browse Videos
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Watch Later Tab */}
            {activeTab === "watchlater" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Watch later</h2>
                  {watchLaterVideos.length > 0 && (
                    <div className="text-sm text-gray-600">
                      {watchLaterVideos.length} {watchLaterVideos.length === 1 ? 'video' : 'videos'}
                    </div>
                  )}
                </div>

                {watchLaterVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {watchLaterVideos.map((video) => (
                      <WatchLaterCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No videos to watch later
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Save videos to watch later by tapping the clock icon.
                    </p>
                    <Link
                      to="/"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Browse Videos
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear History Dialog */}
      {showClearHistoryDialog && <ClearHistoryDialog />}

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

export default LibraryPage;