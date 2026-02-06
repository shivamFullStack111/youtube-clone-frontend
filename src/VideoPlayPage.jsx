


// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import Header from "./Header";

// const VideoPage = () => {
//   const { videoId: id } = useParams();
//   const navigate = useNavigate();
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [suggestedVideos, setSuggestedVideos] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [uploadedByUser, setUploadedByUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [subscribed, setSubscribed] = useState(false);
//   const [videoStats, setVideoStats] = useState({
//     likes: 0,
//     dislikes: 0,
//     views: 0,
//     totalSubscriber: 0,
//   });

//   // Get current user from localStorage
//   const getCurrentUser = () => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       return JSON.parse(storedUser);
//     }
//     return null;
//   };

//   // Fetch video by ID
//   const fetchVideo = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://localhost/youtube-clone-backend/api/video/getById.php?id=${id}`,
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.success) {
//         const videoData = result.data;
//         setVideo(videoData);

//         // Parse uploadedBy data
//         const uploadedBy = videoData.uploadedBy || {};
//         setUploadedByUser(uploadedBy);

//         // Parse likes/dislikes arrays
//         const likesArray = Array.isArray(videoData.likesArray)
//           ? videoData.likesArray
//           : [];
//         const dislikeArray = Array.isArray(videoData.dislikeArray)
//           ? videoData.dislikeArray
//           : [];

//         // Get current user
//         const user = getCurrentUser();
//         setCurrentUser(user);

//         // Check if current user has liked/disliked
//         if (user) {
//           setLiked(likesArray.some((like) => like?.id == user?.id));
//           setDisliked(dislikeArray.some((dislike) => dislike?.id == user?.id));
//         }

//         // Set video stats
//         setVideoStats({
//           likes: parseInt(videoData.totalLikes) || 0,
//           dislikes: parseInt(videoData.totalDislike) || 0,
//           views: parseInt(videoData.totalViews) || 0,
//           totalSubscriber: parseInt(uploadedBy.totalSubscriber) || 0,
//         });

//         // Check subscription status
//         if (user && uploadedBy.id) {
//           checkSubscriptionStatus(uploadedBy.id, user.id);
//         }

//         // Fetch suggested videos
//         fetchSuggestedVideos(videoData.category);

//         // Add view
//         addView();
//       } else {
//         throw new Error(result.message || "Failed to fetch video");
//       }
//     } catch (err) {
//       console.error("Error fetching video:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check subscription status
//   const checkSubscriptionStatus = async (channelId, userId) => {
//     try {
//       const response = await fetch(
//         `http://localhost/youtube-clone-backend/api/user/getProfile.php?userId=${channelId}`,
//       );
//       const result = await response.json();

//       if (result.success) {
//         const channelData = result.data;
//         const subscribers = Array.isArray(channelData.subscribers)
//           ? channelData.subscribers
//           : [];
//         const isSubscribed = subscribers.some((sub) => sub?.id == userId);
//         setSubscribed(isSubscribed);
        
//         // Update total subscriber count
//         setVideoStats(prev => ({
//           ...prev,
//           totalSubscriber: parseInt(channelData.totalSubscriber) || 0
//         }));
//       }
//     } catch (err) {
//       console.error("Error checking subscription:", err);
//     }
//   };

//   // Fetch uploadedBy user profile from user table
//   const fetchUploadedByUserProfile = async () => {
//     if (!uploadedByUser || !uploadedByUser.id) return;
    
//     try {
//       const response = await fetch(
//         `http://localhost/youtube-clone-backend/api/user/getProfile.php?userId=${uploadedByUser.id}`,
//       );
//       const result = await response.json();

//       if (result.success) {
//         const userData = result.data;
//         // Update uploadedByUser with fresh data from users table
//         setUploadedByUser(userData);
        
//         // Update total subscriber count
//         setVideoStats(prev => ({
//           ...prev,
//           totalSubscriber: parseInt(userData.totalSubscriber) || 0
//         }));
//       }
//     } catch (err) {
//       console.error("Error fetching uploadedBy user profile:", err);
//     }
//   };

//   // Add view count
//   const addView = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost/youtube-clone-backend/api/video/addView.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ videoId: id }),
//         },
//       );

//       const result = await response.json();

//       if (result.success) {
//         // Update local view count
//         setVideoStats((prev) => ({
//           ...prev,
//           views: prev.views + 1,
//         }));
//       }
//     } catch (err) {
//       console.error("Error adding view:", err);
//     }
//   };

//   // Fetch suggested videos
//   const fetchSuggestedVideos = async (category) => {
//     try {
//       const response = await fetch(
//         "http://localhost/youtube-clone-backend/api/video/getAll.php",
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Filter videos by same category, excluding current video
//         const filtered = result.data
//           .filter((v) => v.category === category && v?.id != id)
//           .slice(0, 5) // Limit to 5 videos
//           .map((v) => ({
//             id: v?.id,
//             title: v.title,
//             channel: v.uploadedBy
//               ? v.uploadedBy?.channelName || v.uploadedBy?.name
//               : "Unknown",
//             views: formatViews(v.totalViews),
//             time: formatTimeAgo(v.createdAt),
//             thumbnail: `https://picsum.photos/320/180?random=${v?.id}`,
//             channelImg: `https://picsum.photos/36/36?random=${v?.id + 100}`,
//           }));

//         setSuggestedVideos(filtered);
//       }
//     } catch (err) {
//       console.error("Error fetching suggested videos:", err);
//     }
//   };

//   // // Handle like
//   // const handleLike = async () => {
//   //   if (!currentUser) {
//   //     alert("Please login to like videos");
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   // Optimistic update
//   //   if (liked) {
//   //     setVideoStats((prev) => ({
//   //       ...prev,
//   //       likes: Math.max(0, prev.likes - 1),
//   //     }));
//   //     setLiked(false);
//   //   } else {
//   //     setVideoStats((prev) => ({
//   //       ...prev,
//   //       likes: prev.likes + 1,
//   //     }));
//   //     setLiked(true);

//   //     if (disliked) {
//   //       setVideoStats((prev) => ({
//   //         ...prev,
//   //         dislikes: Math.max(0, prev.dislikes - 1),
//   //       }));
//   //       setDisliked(false);
//   //     }
//   //   }

//   //   try {
//   //     const response = await fetch(
//   //       "http://localhost/youtube-clone-backend/api/video/like.php",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           videoId: id,
//   //           user: {
//   //             id: currentUser.id,
//   //             name: currentUser.name,
//   //             email: currentUser.email,
//   //             channelName: currentUser.channelName,
//   //           },
//   //         }),
//   //       },
//   //     );

//   //     const result = await response.json();

//   //     if (!result.success) {
//   //       // Revert optimistic update if failed
//   //       fetchVideo();
//   //     }
//   //   } catch (err) {
//   //     console.error("Error liking video:", err);
//   //     fetchVideo(); // Revert to server state
//   //   }
//   // };

//   // // Handle dislike
//   // const handleDislike = async () => {
//   //   if (!currentUser) {
//   //     alert("Please login to dislike videos");
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   // Optimistic update
//   //   if (disliked) {
//   //     setVideoStats((prev) => ({
//   //       ...prev,
//   //       dislikes: Math.max(0, prev.dislikes - 1),
//   //     }));
//   //     setDisliked(false);
//   //   } else {
//   //     setVideoStats((prev) => ({
//   //       ...prev,
//   //       dislikes: prev.dislikes + 1,
//   //     }));
//   //     setDisliked(true);

//   //     if (liked) {
//   //       setVideoStats((prev) => ({
//   //         ...prev,
//   //         likes: Math.max(0, prev.likes - 1),
//   //       }));
//   //       setLiked(false);
//   //     }
//   //   }

//   //   try {
//   //     const response = await fetch(
//   //       "http://localhost/youtube-clone-backend/api/video/dislike.php",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           videoId: id,
//   //           user: {
//   //             id: currentUser.id,
//   //             name: currentUser.name,
//   //             email: currentUser.email,
//   //             channelName: currentUser.channelName,
//   //           },
//   //         }),
//   //       },
//   //     );

//   //     const result = await response.json();

//   //     if (!result.success) {
//   //       // Revert optimistic update if failed
//   //       fetchVideo();
//   //     }
//   //   } catch (err) {
//   //     console.error("Error disliking video:", err);
//   //     fetchVideo(); // Revert to server state
//   //   }
//   // };

  
//   // Handle like
//   const handleLike = async () => {
//     if (!currentUser) {
//       alert("Please login to like videos");
//       navigate("/login");
//       return;
//     }

//     if (liked) {
//       // Unlike
//       setVideoStats((prev) => ({
//         ...prev,
//         likes: Math.max(0, prev.likes - 1),
//       }));
//       setLiked(false);
//     } else {
//       // Like
//       setVideoStats((prev) => ({
//         ...prev,
//         likes: prev.likes + 1,
//       }));
//       setLiked(true);

//       // Remove dislike if user had disliked
//       if (disliked) {
//         setVideoStats((prev) => ({
//           ...prev,
//           dislikes: Math.max(0, prev.dislikes - 1),
//         }));
//         setDisliked(false);
//       }
//     }

//     try {
//       const response = await fetch(
//         "http://localhost/youtube-clone-backend/api/video/like.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             videoId: id,
//             user: {
//               id: currentUser.id,
//               name: currentUser.name,
//               email: currentUser.email,
//               channelName: currentUser.channelName,
//             },
//           }),
//         },
//       );

//       const result = await response.json();

//       if (result.success) {
//         // Update local state immediately for better UX
//         if (liked) {
//           // Unlike
//           setVideoStats((prev) => ({
//             ...prev,
//             likes: Math.max(0, prev.likes - 1),
//           }));
//           setLiked(false);
//         } else {
//           // Like
//           setVideoStats((prev) => ({
//             ...prev,
//             likes: prev.likes + 1,
//           }));
//           setLiked(true);

//           // Remove dislike if user had disliked
//           if (disliked) {
//             setVideoStats((prev) => ({
//               ...prev,
//               dislikes: Math.max(0, prev.dislikes - 1),
//             }));
//             setDisliked(false);
//           }
//         }

//         // Refresh video data to sync with server
//         setTimeout(() => fetchVideo(), 100);
//       }
//     } catch (err) {
//       console.error("Error liking video:", err);
//     }
//   };

//   // Handle dislike
//   const handleDislike = async () => {
//     if (!currentUser) {
//       alert("Please login to dislike videos");
//       navigate("/login");
//       return;
//     }
//     if (disliked) {
//       // Remove dislike
//       setVideoStats((prev) => ({
//         ...prev,
//         dislikes: Math.max(0, prev.dislikes - 1),
//       }));
//       setDisliked(false);
//     } else {
//       // Add dislike
//       setVideoStats((prev) => ({
//         ...prev,
//         dislikes: prev.dislikes + 1,
//       }));
//       setDisliked(true);

//       // Remove like if user had liked
//       if (liked) {
//         setVideoStats((prev) => ({
//           ...prev,
//           likes: Math.max(0, prev.likes - 1),
//         }));
//         setLiked(false);
//       }
//     }

//     try {
//       const response = await fetch(
//         "http://localhost/youtube-clone-backend/api/video/dislike.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             videoId: id,
//             user: {
//               id: currentUser.id,
//               name: currentUser.name,
//               email: currentUser.email,
//               channelName: currentUser.channelName,
//             },
//           }),
//         },
//       );

//       const result = await response.json();

//       if (result.success) {
//         // Update local state immediately for better UX
//         if (disliked) {
//           // Remove dislike
//           setVideoStats((prev) => ({
//             ...prev,
//             dislikes: Math.max(0, prev.dislikes - 1),
//           }));
//           setDisliked(false);
//         } else {
//           // Add dislike
//           setVideoStats((prev) => ({
//             ...prev,
//             dislikes: prev.dislikes + 1,
//           }));
//           setDisliked(true);

//           // Remove like if user had liked
//           if (liked) {
//             setVideoStats((prev) => ({
//               ...prev,
//               likes: Math.max(0, prev.likes - 1),
//             }));
//             setLiked(false);
//           }
//         }

//         // Refresh video data to sync with server
//         setTimeout(() => fetchVideo(), 100);
//       }
//     } catch (err) {
//       console.error("Error disliking video:", err);
//     }
//   };


//   // Handle subscribe
//   const handleSubscribe = async () => {
//     if (!currentUser) {
//       alert("Please login to subscribe");
//       navigate("/login");
//       return;
//     }

//     if (!uploadedByUser) return;

//     // Optimistic update
//     if (subscribed) {
//       // Unsubscribe
//       setVideoStats((prev) => ({
//         ...prev,
//         totalSubscriber: Math.max(0, prev.totalSubscriber - 1),
//       }));
//       setSubscribed(false);
//     } else {
//       // Subscribe
//       setVideoStats((prev) => ({
//         ...prev,
//         totalSubscriber: prev.totalSubscriber + 1,
//       }));
//       setSubscribed(true);
//     }

//     try {
//       const response = await fetch(
//         "http://localhost/youtube-clone-backend/api/user/subscribe.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             channelUserId: uploadedByUser?.id,
//             subscriber: {
//               id: currentUser.id,
//               name: currentUser.name,
//               email: currentUser.email,
//               channelName: currentUser.channelName,
//             },
//           }),
//         },
//       );

//       const result = await response.json();

//       if (result.success) {
//         // Update with actual server data
//         setVideoStats((prev) => ({
//           ...prev,
//           totalSubscriber: parseInt(result.totalSubscriber) || prev.totalSubscriber,
//         }));
        
//         // Update subscription status
//         setSubscribed(result.action === "subscribed");
        
//         // Refresh uploadedBy user data
//         fetchUploadedByUserProfile();
        
//         // alert(
//         //   `${result.action === "subscribed" ? "Subscribed to" : "Unsubscribed from"} ${uploadedByUser.channelName || uploadedByUser.name}`,
//         // );
//       } else {
//         // Revert optimistic update if failed
//         checkSubscriptionStatus(uploadedByUser.id, currentUser.id);
//       }
//     } catch (err) {
//       console.error("Error subscribing:", err);
//       // Revert optimistic update on error
//       checkSubscriptionStatus(uploadedByUser.id, currentUser.id);
//     }
//   };

//   // Handle add comment (frontend only since no API)
//   const handleAddComment = () => {
//     if (!newComment.trim()) return;

//     if (!currentUser) {
//       alert("Please login to comment");
//       navigate("/login");
//       return;
//     }

//     const newCommentObj = {
//       id: comments.length + 1,
//       user: currentUser.name || "Anonymous",
//       avatar: `https://picsum.photos/36/36?random=${Date.now()}`,
//       time: "Just now",
//       text: newComment,
//       likes: 0,
//       liked: false,
//     };

//     setComments([newCommentObj, ...comments]);
//     setNewComment("");
//   };

//   // Handle comment like
//   const handleCommentLike = (commentId) => {
//     setComments(
//       comments.map((comment) => {
//         if (comment?.id === commentId) {
//           return {
//             ...comment,
//             likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
//             liked: !comment.liked,
//           };
//         }
//         return comment;
//       }),
//     );
//   };

//   // Helper function to format views
//   const formatViews = (views) => {
//     if (!views) return "0 views";

//     const numViews = parseInt(views);
//     if (isNaN(numViews)) return `${views} views`;

//     if (numViews >= 1000000) {
//       return (numViews / 1000000).toFixed(1) + "M views";
//     } else if (numViews >= 1000) {
//       return (numViews / 1000).toFixed(1) + "K views";
//     }
//     return numViews + " views";
//   };

//   // Helper function to format time ago
//   const formatTimeAgo = (dateString) => {
//     if (!dateString) return "Recently";

//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Yesterday";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
//     if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
//     return `${Math.floor(diffDays / 365)} years ago`;
//   };

//   // Format subscribers count
//   const formatSubscribers = (count) => {
//     if (!count) return "0 subscribers";

//     const num = parseInt(count);
//     if (isNaN(num)) return `${count} subscribers`;

//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + "M subscribers";
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(1) + "K subscribers";
//     }
//     return num + " subscribers";
//   };

//   useEffect(() => {
//     if (id) {
//       fetchVideo();
//     }

//     // Load mock comments
//     setComments([
//       {
//         id: 1,
//         user: "CodingEnthusiast",
//         avatar: "https://picsum.photos/36/36?random=30",
//         time: "2 days ago",
//         text: "This tutorial was exactly what I needed! Clear explanations and practical examples. Thank you!",
//         likes: 2300,
//         liked: false,
//       },
//       {
//         id: 2,
//         user: "WebDevNewbie",
//         avatar: "https://picsum.photos/36/36?random=31",
//         time: "1 day ago",
//         text: "I've been struggling to understand React for weeks, but this 10-minute tutorial explained it better than any 5-hour course I've taken.",
//         likes: 1500,
//         liked: false,
//       },
//       {
//         id: 3,
//         user: "TechGuru",
//         avatar: "https://picsum.photos/36/36?random=32",
//         time: "1 day ago",
//         text: "Great video! Would love to see a follow-up on React Router and state management with Context API.",
//         likes: 875,
//         liked: false,
//       },
//     ]);
//   }, [id]);

//   // Fetch uploadedBy user profile when uploadedByUser changes
//   useEffect(() => {
//     if (uploadedByUser && uploadedByUser.id) {
//       fetchUploadedByUserProfile();
//     }
//   }, [uploadedByUser]);

//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-50">
//         <Header />
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//           <span className="ml-4">Loading video...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error || !video) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-50">
//         <Header />
//         <div className="flex-1 p-4 text-center">
//           <h2 className="text-xl font-semibold text-red-600">
//             Error loading video
//           </h2>
//           <p className="text-gray-600 mt-2">{error || "Video not found"}</p>
//           <Link
//             to="/"
//             className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Go to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const channelName = uploadedByUser
//     ? uploadedByUser.channelName || uploadedByUser.name || "Unknown Channel"
//     : "Unknown Channel";
//   const channelImg = uploadedByUser?.id
//     ? `https://picsum.photos/36/36?random=${uploadedByUser.id}`
//     : `https://picsum.photos/36/36?random=${id}`;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />

//       <div className="flex flex-col lg:flex-row flex-1 pt-2">
//         {/* Main video content */}
//         <div className="flex-1 p-4">
//           {/* Video player */}
//           <div className="w-full bg-black rounded-lg overflow-hidden mb-4">
//             <div className="relative pb-[56.25%]">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src={
//                   video.videoUrl || "https://www.youtube.com/embed/IltsOcCj1Ak"
//                 }
//                 title={video.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>

//           {/* Video title and info */}
//           <div className="mb-6">
//             <h1 className="text-xl font-semibold mb-2">{video.title}</h1>
//             <p>{video?.description}</p>
//             <br />

//             {/* Video stats */}
//             <div className="flex flex-wrap items-center justify-between mb-4">
//               <div className="flex items-center space-x-6">
//                 <span className="text-gray-600 text-sm">
//                   {formatViews(videoStats.views)}
//                 </span>
//                 <span className="text-gray-600 text-sm">
//                   {formatTimeAgo(video.createdAt)}
//                 </span>
//               </div>

//               <div className="flex items-center space-x-4 mt-2 sm:mt-0">
//                 {/* Like button */}
//                 <button
//                   className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
//                     liked
//                       ? "bg-blue-50 text-blue-600"
//                       : "bg-gray-100 text-gray-700"
//                   }`}
//                   onClick={handleLike}
//                 >
//                   <svg viewBox="0 0 24 24" className="w-5 h-5">
//                     <path
//                       fill="currentColor"
//                       d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
//                     ></path>
//                   </svg>
//                   <span>{videoStats.likes}</span>
//                 </button>

//                 {/* Dislike button */}
//                 <button
//                   className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
//                     disliked
//                       ? "bg-blue-50 text-blue-600"
//                       : "bg-gray-100 text-gray-700"
//                   }`}
//                   onClick={handleDislike}
//                 >
//                   <svg viewBox="0 0 24 24" className="w-5 h-5">
//                     <path
//                       fill="currentColor"
//                       d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
//                     ></path>
//                   </svg>
//                   <span>Dislike</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Channel info and subscribe */}
//           <div className="border-t border-b border-gray-200 py-4 mb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={channelImg}
//                   alt={channelName}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <h3 className="font-medium text-lg">{channelName}</h3>
//                   <p className="text-sm text-gray-600">
//                     {formatSubscribers(videoStats.totalSubscriber)}
//                   </p>
//                   {uploadedByUser?.channelDescription && (
//                     <p className="text-sm text-gray-700 mt-1">
//                       {uploadedByUser.channelDescription}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <button
//                 className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
//                   subscribed
//                     ? "bg-gray-200 text-black hover:bg-gray-300"
//                     : "bg-red-600 text-white hover:bg-red-700"
//                 }`}
//                 onClick={handleSubscribe}
//               >
//                 {subscribed ? (
//                   <span className="flex items-center space-x-1">
//                     <svg viewBox="0 0 24 24" className="w-4 h-4">
//                       <path
//                         fill="currentColor"
//                         d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
//                       />
//                     </svg>
//                     <span>Subscribed</span>
//                   </span>
//                 ) : (
//                   "Subscribe"
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Comments section */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">
//               {comments.length} Comments
//             </h3>

//             {/* Add comment */}
//             <div className="flex items-start space-x-3 mb-6">
//               <img
//                 src={
//                   currentUser?.profilePic ||
//                   `https://picsum.photos/36/36?random=40`
//                 }
//                 alt="User"
//                 className="w-9 h-9 rounded-full"
//               />
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Add a comment..."
//                   className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-sm"
//                   onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
//                 />
//                 <div className="flex justify-end mt-2">
//                   <button
//                     onClick={handleAddComment}
//                     className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={!newComment.trim()}
//                   >
//                     Comment
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Comments list */}
//             {comments.length > 0 ? (
//               comments.map((comment) => (
//                 <div
//                   key={comment?.id}
//                   className="flex items-start space-x-3 mb-6 pb-4 border-b border-gray-100 last:border-0"
//                 >
//                   <img
//                     src={comment.avatar}
//                     alt={comment.user}
//                     className="w-9 h-9 rounded-full"
//                   />
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <h4 className="text-sm font-medium">{comment.user}</h4>
//                       <span className="text-xs text-gray-500">
//                         {comment.time}
//                       </span>
//                     </div>
//                     <p className="text-sm my-2">{comment.text}</p>
//                     <div className="flex items-center space-x-4 text-sm text-gray-600">
//                       <button
//                         className={`flex items-center space-x-1 ${comment.liked ? "text-blue-600" : "hover:text-blue-600"}`}
//                         onClick={() => handleCommentLike(comment?.id)}
//                       >
//                         <svg viewBox="0 0 24 24" className="w-5 h-5">
//                           <path
//                             fill="currentColor"
//                             d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
//                           ></path>
//                         </svg>
//                         <span>{comment.likes}</span>
//                       </button>
//                       <button className="flex items-center space-x-1 hover:text-blue-600">
//                         <svg viewBox="0 0 24 24" className="w-5 h-5">
//                           <path
//                             fill="currentColor"
//                             d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
//                           ></path>
//                         </svg>
//                         <span>Reply</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 No comments yet. Be the first to comment!
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Suggested videos sidebar */}
//         <div className="w-full lg:w-96 p-4 lg:border-l lg:border-gray-200">
//           <h3 className="font-semibold mb-4 text-lg">Suggested Videos</h3>
//           <div className="space-y-4">
//             {suggestedVideos.length > 0 ? (
//               suggestedVideos.map((suggestedVideo) => (
//                 <Link
//                   key={suggestedVideo?.id}
//                   to={`/video/${suggestedVideo?.id}`}
//                   className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                 >
//                   <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                     <img
//                       src={suggestedVideo.thumbnail}
//                       alt={suggestedVideo.title}
//                       className="w-full h-full object-cover hover:scale-105 transition-transform"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-medium line-clamp-2 mb-1">
//                       {suggestedVideo.title}
//                     </h4>
//                     <p className="text-xs text-gray-600 mb-1">
//                       {suggestedVideo.channel}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {suggestedVideo.views} • {suggestedVideo.time}
//                     </p>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm text-center py-4">
//                 No suggested videos found
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPage; 


import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const VideoPage = () => {
  const { videoId: id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [uploadedByUser, setUploadedByUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [savedToWatchLater, setSavedToWatchLater] = useState(false);
  const [videoStats, setVideoStats] = useState({
    likes: 0,
    dislikes: 0,
    views: 0,
    totalSubscriber: 0,
  });

  // Get current user from localStorage
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  // ============== LOCAL STORAGE FUNCTIONS ==============

  // Save to History
  const saveToHistory = (videoData) => {
    if (!videoData) return;
    
    const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
    
    // Remove if already exists
    const filteredHistory = history.filter(item => item.id !== videoData.id);
    
    // Add to beginning
    const videoInfo = {
      id: videoData.id,
      title: videoData.title,
      channel: videoData.uploadedBy?.channelName || videoData.uploadedBy?.name || "Unknown",
      thumbnail: `https://picsum.photos/320/180?random=${videoData.id}`,
      channelImg: `https://picsum.photos/36/36?random=${videoData.id + 100}`,
      duration: "10:00", // Default duration
      views: formatViews(videoData.totalViews),
      time: "Now",
      watchedAt: new Date().toISOString(),
      videoUrl: videoData.videoUrl
    };
    
    filteredHistory.unshift(videoInfo);
    
    // Keep only last 100 videos
    const limitedHistory = filteredHistory.slice(0, 100);
    localStorage.setItem("watchHistory", JSON.stringify(limitedHistory));
  };

  // Save to Liked Videos
  const saveToLikedVideos = (videoData) => {
    if (!videoData) return;
    
    const likedVideos = JSON.parse(localStorage.getItem("likedVideos") || "[]");
    
    // Check if already liked
    const alreadyLiked = likedVideos.some(item => item.id === videoData.id);
    
    if (alreadyLiked) {
      // Remove from liked videos (if unliking)
      const updatedLikedVideos = likedVideos.filter(item => item.id !== videoData.id);
      localStorage.setItem("likedVideos", JSON.stringify(updatedLikedVideos));
    } else {
      // Add to liked videos
      const videoInfo = {
        id: videoData.id,
        title: videoData.title,
        channel: videoData.uploadedBy?.channelName || videoData.uploadedBy?.name || "Unknown",
        thumbnail: `https://picsum.photos/320/180?random=${videoData.id}`,
        channelImg: `https://picsum.photos/36/36?random=${videoData.id + 100}`,
        duration: "10:00",
        views: formatViews(videoData.totalViews),
        time: formatTimeAgo(videoData.createdAt),
        likedAt: new Date().toISOString(),
        videoUrl: videoData.videoUrl
      };
      
      likedVideos.unshift(videoInfo);
      localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
    }
  };

  // Save to Watch Later
  const saveToWatchLater = (videoData) => {
    if (!videoData) return;
    
    const watchLater = JSON.parse(localStorage.getItem("watchLater") || "[]");
    
    if (savedToWatchLater) {
      // Remove from watch later
      const updatedWatchLater = watchLater.filter(item => item.id !== videoData.id);
      localStorage.setItem("watchLater", JSON.stringify(updatedWatchLater));
      setSavedToWatchLater(false);
      alert("Removed from Watch Later");
    } else {
      // Add to watch later
      const videoInfo = {
        id: videoData.id,
        title: videoData.title,
        channel: videoData.uploadedBy?.channelName || videoData.uploadedBy?.name || "Unknown",
        thumbnail: `https://picsum.photos/320/180?random=${videoData.id}`,
        channelImg: `https://picsum.photos/36/36?random=${videoData.id + 100}`,
        duration: "10:00",
        views: formatViews(videoData.totalViews),
        time: formatTimeAgo(videoData.createdAt),
        savedAt: new Date().toISOString(),
        videoUrl: videoData.videoUrl
      };
      
      watchLater.unshift(videoInfo);
      localStorage.setItem("watchLater", JSON.stringify(watchLater));
      setSavedToWatchLater(true);
      // alert("Added to Watch Later");
    }
  };

  // Check if video is in Watch Later
  const checkWatchLaterStatus = (videoId) => {
    const watchLater = JSON.parse(localStorage.getItem("watchLater") || "[]");
    const isSaved = watchLater.some(item => item.id == videoId);
    setSavedToWatchLater(isSaved);
  };

  // ============== EXISTING CODE ==============

  // Fetch video by ID
  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost/youtube-clone-backend/api/video/getById.php?id=${id}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const videoData = result.data;
        setVideo(videoData);

        // Save to history
        saveToHistory(videoData);

        // Check watch later status
        checkWatchLaterStatus(videoData.id);

        // Parse uploadedBy data
        const uploadedBy = videoData.uploadedBy || {};
        setUploadedByUser(uploadedBy);

        // Parse likes/dislikes arrays
        const likesArray = Array.isArray(videoData.likesArray)
          ? videoData.likesArray
          : [];
        const dislikeArray = Array.isArray(videoData.dislikeArray)
          ? videoData.dislikeArray
          : [];

        // Get current user
        const user = getCurrentUser();
        setCurrentUser(user);

        // Check if current user has liked/disliked
        if (user) {
          setLiked(likesArray.some((like) => like?.id == user?.id));
          setDisliked(dislikeArray.some((dislike) => dislike?.id == user?.id));
        }

        // Set video stats
        setVideoStats({
          likes: parseInt(videoData.totalLikes) || 0,
          dislikes: parseInt(videoData.totalDislike) || 0,
          views: parseInt(videoData.totalViews) || 0,
          totalSubscriber: parseInt(uploadedBy.totalSubscriber) || 0,
        });

        // Check subscription status
        if (user && uploadedBy.id) {
          checkSubscriptionStatus(uploadedBy.id, user.id);
        }

        // Fetch suggested videos
        fetchSuggestedVideos(videoData.category);

        // Add view
        addView();
      } else {
        throw new Error(result.message || "Failed to fetch video");
      }
    } catch (err) {
      console.error("Error fetching video:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check subscription status
  const checkSubscriptionStatus = async (channelId, userId) => {
    try {
      const response = await fetch(
        `http://localhost/youtube-clone-backend/api/user/getProfile.php?userId=${channelId}`,
      );
      const result = await response.json();

      if (result.success) {
        const channelData = result.data;
        const subscribers = Array.isArray(channelData.subscribers)
          ? channelData.subscribers
          : [];
        const isSubscribed = subscribers.some((sub) => sub?.id == userId);
        setSubscribed(isSubscribed);
        
        // Update total subscriber count
        setVideoStats(prev => ({
          ...prev,
          totalSubscriber: parseInt(channelData.totalSubscriber) || 0
        }));
      }
    } catch (err) {
      console.error("Error checking subscription:", err);
    }
  };

  // Fetch uploadedBy user profile from user table
  const fetchUploadedByUserProfile = async () => {
    if (!uploadedByUser || !uploadedByUser.id) return;
    
    try {
      const response = await fetch(
        `http://localhost/youtube-clone-backend/api/user/getProfile.php?userId=${uploadedByUser.id}`,
      );
      const result = await response.json();

      if (result.success) {
        const userData = result.data;
        // Update uploadedByUser with fresh data from users table
        setUploadedByUser(userData);
        
        // Update total subscriber count
        setVideoStats(prev => ({
          ...prev,
          totalSubscriber: parseInt(userData.totalSubscriber) || 0
        }));
      }
    } catch (err) {
      console.error("Error fetching uploadedBy user profile:", err);
    }
  };

  // Add view count
  const addView = async () => {
    try {
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/video/addView.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: id }),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Update local view count
        setVideoStats((prev) => ({
          ...prev,
          views: prev.views + 1,
        }));
      }
    } catch (err) {
      console.error("Error adding view:", err);
    }
  };

  // Fetch suggested videos
  const fetchSuggestedVideos = async (category) => {
    try {
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/video/getAll.php",
      );
      const result = await response.json();

      if (result.success) {
        // Filter videos by same category, excluding current video
        const filtered = result.data
          .filter((v) => v.category === category && v?.id != id)
          .slice(0, 5) // Limit to 5 videos
          .map((v) => ({
            id: v?.id,
            title: v.title,
            channel: v.uploadedBy
              ? v.uploadedBy?.channelName || v.uploadedBy?.name
              : "Unknown",
            views: formatViews(v.totalViews),
            time: formatTimeAgo(v.createdAt),
            thumbnail: `https://picsum.photos/320/180?random=${v?.id}`,
            channelImg: `https://picsum.photos/36/36?random=${v?.id + 100}`,
          }));

        setSuggestedVideos(filtered);
      }
    } catch (err) {
      console.error("Error fetching suggested videos:", err);
    }
  };

  // Handle like
  const handleLike = async () => {
    if (!currentUser) {
      alert("Please login to like videos");
      navigate("/login");
      return;
    }

    if (liked) {
      // Unlike
      setVideoStats((prev) => ({
        ...prev,
        likes: Math.max(0, prev.likes - 1),
      }));
      setLiked(false);
      
      // Remove from liked videos
      saveToLikedVideos(video);
    } else {
      // Like
      setVideoStats((prev) => ({
        ...prev,
        likes: prev.likes + 1,
      }));
      setLiked(true);

      // Add to liked videos
      saveToLikedVideos(video);

      // Remove dislike if user had disliked
      if (disliked) {
        setVideoStats((prev) => ({
          ...prev,
          dislikes: Math.max(0, prev.dislikes - 1),
        }));
        setDisliked(false);
      }
    }

    try {
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/video/like.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: id,
            user: {
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              channelName: currentUser.channelName,
            },
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Update local state immediately for better UX
        if (liked) {
          // Unlike
          setVideoStats((prev) => ({
            ...prev,
            likes: Math.max(0, prev.likes - 1),
          }));
          setLiked(false);
        } else {
          // Like
          setVideoStats((prev) => ({
            ...prev,
            likes: prev.likes + 1,
          }));
          setLiked(true);

          // Remove dislike if user had disliked
          if (disliked) {
            setVideoStats((prev) => ({
              ...prev,
              dislikes: Math.max(0, prev.dislikes - 1),
            }));
            setDisliked(false);
          }
        }

        // Refresh video data to sync with server
        setTimeout(() => fetchVideo(), 100);
      }
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  // Handle dislike
  const handleDislike = async () => {
    if (!currentUser) {
      alert("Please login to dislike videos");
      navigate("/login");
      return;
    }
    
    if (disliked) {
      // Remove dislike
      setVideoStats((prev) => ({
        ...prev,
        dislikes: Math.max(0, prev.dislikes - 1),
      }));
      setDisliked(false);
    } else {
      // Add dislike
      setVideoStats((prev) => ({
        ...prev,
        dislikes: prev.dislikes + 1,
      }));
      setDisliked(true);

      // Remove like if user had liked
      if (liked) {
        setVideoStats((prev) => ({
          ...prev,
          likes: Math.max(0, prev.likes - 1),
        }));
        setLiked(false);
        
        // Remove from liked videos when disliked
        saveToLikedVideos(video);
      }
    }

    try {
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/video/dislike.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: id,
            user: {
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              channelName: currentUser.channelName,
            },
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Update local state immediately for better UX
        if (disliked) {
          // Remove dislike
          setVideoStats((prev) => ({
            ...prev,
            dislikes: Math.max(0, prev.dislikes - 1),
          }));
          setDisliked(false);
        } else {
          // Add dislike
          setVideoStats((prev) => ({
            ...prev,
            dislikes: prev.dislikes + 1,
          }));
          setDisliked(true);

          // Remove like if user had liked
          if (liked) {
            setVideoStats((prev) => ({
              ...prev,
              likes: Math.max(0, prev.likes - 1),
            }));
            setLiked(false);
          }
        }

        // Refresh video data to sync with server
        setTimeout(() => fetchVideo(), 100);
      }
    } catch (err) {
      console.error("Error disliking video:", err);
    }
  };

  // Handle subscribe
  const handleSubscribe = async () => {
    if (!currentUser) {
      alert("Please login to subscribe");
      navigate("/login");
      return;
    }

    if (!uploadedByUser) return;

    // Optimistic update
    if (subscribed) {
      // Unsubscribe
      setVideoStats((prev) => ({
        ...prev,
        totalSubscriber: Math.max(0, prev.totalSubscriber - 1),
      }));
      setSubscribed(false);
    } else {
      // Subscribe
      setVideoStats((prev) => ({
        ...prev,
        totalSubscriber: prev.totalSubscriber + 1,
      }));
      setSubscribed(true);
    }

    try {
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/user/subscribe.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channelUserId: uploadedByUser?.id,
            subscriber: {
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              channelName: currentUser.channelName,
            },
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Update with actual server data
        setVideoStats((prev) => ({
          ...prev,
          totalSubscriber: parseInt(result.totalSubscriber) || prev.totalSubscriber,
        }));
        
        // Update subscription status
        setSubscribed(result.action === "subscribed");
        
        // Refresh uploadedBy user data
        fetchUploadedByUserProfile();
      } else {
        // Revert optimistic update if failed
        checkSubscriptionStatus(uploadedByUser.id, currentUser.id);
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      // Revert optimistic update on error
      checkSubscriptionStatus(uploadedByUser.id, currentUser.id);
    }
  };

  // Handle add comment (frontend only since no API)
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    if (!currentUser) {
      alert("Please login to comment");
      navigate("/login");
      return;
    }

    const newCommentObj = {
      id: comments.length + 1,
      user: currentUser.name || "Anonymous",
      avatar: `https://picsum.photos/36/36?random=${Date.now()}`,
      time: "Just now",
      text: newComment,
      likes: 0,
      liked: false,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  // Handle comment like
  const handleCommentLike = (commentId) => {
    setComments(
      comments.map((comment) => {
        if (comment?.id === commentId) {
          return {
            ...comment,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked,
          };
        }
        return comment;
      }),
    );
  };

  // Handle watch later
  const handleWatchLater = () => {
    if (!currentUser) {
      alert("Please login to save videos");
      navigate("/login");
      return;
    }
    
    if (video) {
      saveToWatchLater(video);
    }
  };

  // Helper function to format views
  const formatViews = (views) => {
    if (!views) return "0 views";

    const numViews = parseInt(views);
    if (isNaN(numViews)) return `${views} views`;

    if (numViews >= 1000000) {
      return (numViews / 1000000).toFixed(1) + "M views";
    } else if (numViews >= 1000) {
      return (numViews / 1000).toFixed(1) + "K views";
    }
    return numViews + " views";
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

  // Format subscribers count
  const formatSubscribers = (count) => {
    if (!count) return "0 subscribers";

    const num = parseInt(count);
    if (isNaN(num)) return `${count} subscribers`;

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M subscribers";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K subscribers";
    }
    return num + " subscribers";
  };

  useEffect(() => {
    if (id) {
      fetchVideo();
    }

    // Load mock comments
    setComments([
      {
        id: 1,
        user: "CodingEnthusiast",
        avatar: "https://picsum.photos/36/36?random=30",
        time: "2 days ago",
        text: "This tutorial was exactly what I needed! Clear explanations and practical examples. Thank you!",
        likes: 2300,
        liked: false,
      },
      {
        id: 2,
        user: "WebDevNewbie",
        avatar: "https://picsum.photos/36/36?random=31",
        time: "1 day ago",
        text: "I've been struggling to understand React for weeks, but this 10-minute tutorial explained it better than any 5-hour course I've taken.",
        likes: 1500,
        liked: false,
      },
      {
        id: 3,
        user: "TechGuru",
        avatar: "https://picsum.photos/36/36?random=32",
        time: "1 day ago",
        text: "Great video! Would love to see a follow-up on React Router and state management with Context API.",
        likes: 875,
        liked: false,
      },
    ]);
  }, [id]);

  // Fetch uploadedBy user profile when uploadedByUser changes
  useEffect(() => {
    if (uploadedByUser && uploadedByUser.id) {
      fetchUploadedByUserProfile();
    }
  }, [uploadedByUser]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4">Loading video...</span>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 p-4 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading video
          </h2>
          <p className="text-gray-600 mt-2">{error || "Video not found"}</p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const channelName = uploadedByUser
    ? uploadedByUser.channelName || uploadedByUser.name || "Unknown Channel"
    : "Unknown Channel";
  const channelImg = uploadedByUser?.id
    ? `https://picsum.photos/36/36?random=${uploadedByUser.id}`
    : `https://picsum.photos/36/36?random=${id}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col lg:flex-row flex-1 pt-2">
        {/* Main video content */}
        <div className="flex-1 p-4">
          {/* Video player */}
          <div className="w-full bg-black rounded-lg overflow-hidden mb-4">
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={
                  video.videoUrl || "https://www.youtube.com/embed/IltsOcCj1Ak"
                }
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Video title and info */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-2">{video.title}</h1>
            <p>{video?.description}</p>
            <br />

            {/* Video stats */}
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <span className="text-gray-600 text-sm">
                  {formatViews(videoStats.views)}
                </span>
                <span className="text-gray-600 text-sm">
                  {formatTimeAgo(video.createdAt)}
                </span>
              </div>

              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                {/* Like button */}
                <button
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                    liked
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={handleLike}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                    ></path>
                  </svg>
                  <span>{videoStats.likes}</span>
                </button>

                {/* Dislike button */}
                <button
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                    disliked
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={handleDislike}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                    ></path>
                  </svg>
                  <span>Dislike</span>
                </button>

                {/* Watch Later button */}
                <button
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                    savedToWatchLater
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={handleWatchLater}
                  title={savedToWatchLater ? "Remove from Watch Later" : "Save to Watch Later"}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"
                    ></path>
                  </svg>
                  <span>{savedToWatchLater ? "Saved" : "Watch Later"}</span>
                </button>

                {/* Share button */}
                {/* <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-full text-gray-700">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                    ></path>
                  </svg>
                  <span>Share</span>
                </button> */}
              </div>
            </div>
          </div>

          {/* Channel info and subscribe */}
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={channelImg}
                  alt={channelName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg">{channelName}</h3>
                  <p className="text-sm text-gray-600">
                    {formatSubscribers(videoStats.totalSubscriber)}
                  </p>
                  {uploadedByUser?.channelDescription && (
                    <p className="text-sm text-gray-700 mt-1">
                      {uploadedByUser.channelDescription}
                    </p>
                  )}
                </div>
              </div>

              <button
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                  subscribed
                    ? "bg-gray-200 text-black hover:bg-gray-300"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
                onClick={handleSubscribe}
              >
                {subscribed ? (
                  <span className="flex items-center space-x-1">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        fill="currentColor"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                      />
                    </svg>
                    <span>Subscribed</span>
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          </div>

          {/* Comments section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {comments.length} Comments
            </h3>

            {/* Add comment */}
            <div className="flex items-start space-x-3 mb-6">
              <img
                src={
                  currentUser?.profilePic ||
                  `https://picsum.photos/36/36?random=40`
                }
                alt="User"
                className="w-9 h-9 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newComment.trim()}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Comments list */}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment?.id}
                  className="flex items-start space-x-3 mb-6 pb-4 border-b border-gray-100 last:border-0"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium">{comment.user}</h4>
                      <span className="text-xs text-gray-500">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-sm my-2">{comment.text}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <button
                        className={`flex items-center space-x-1 ${comment.liked ? "text-blue-600" : "hover:text-blue-600"}`}
                        onClick={() => handleCommentLike(comment?.id)}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path
                            fill="currentColor"
                            d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                          ></path>
                        </svg>
                        <span>{comment.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path
                            fill="currentColor"
                            d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                          ></path>
                        </svg>
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>

        {/* Suggested videos sidebar */}
        <div className="w-full lg:w-96 p-4 lg:border-l lg:border-gray-200">
          <h3 className="font-semibold mb-4 text-lg">Suggested Videos</h3>
          <div className="space-y-4">
            {suggestedVideos.length > 0 ? (
              suggestedVideos.map((suggestedVideo) => (
                <Link
                  key={suggestedVideo?.id}
                  to={`/video/${suggestedVideo?.id}`}
                  className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={suggestedVideo.thumbnail}
                      alt={suggestedVideo.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {suggestedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      {suggestedVideo.channel}
                    </p>
                    <p className="text-xs text-gray-500">
                      {suggestedVideo.views} • {suggestedVideo.time}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No suggested videos found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;