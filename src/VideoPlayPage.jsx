
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

// Current video data (in a real app, this would come from an API)
const currentVideo = {
  id: 1,
  title: "How to Build a React App in 10 Minutes - Beginner Tutorial",
  channel: "WebDev Simplified",
  subscribers: "1.2M subscribers",
  views: "1.2M views",
  time: "2 days ago",
  description:
    "In this tutorial, we'll build a complete React application from scratch in just 10 minutes. Learn the fundamentals of React components, state management, and props while building a practical project.",
  likes: "125K",
  dislikes: "2K",
  comments: "3.5K",
  thumbnail: "https://picsum.photos/320/180?random=1",
  channelImg: "https://picsum.photos/36/36?random=10",
};

const VideoPage = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Suggested videos data
  const suggestedVideos = [
    {
      id: 2,
      title: "Learn Tailwind CSS - Complete Course",
      channel: "Tailwind Masters",
      views: "845K views",
      time: "1 week ago",
      thumbnail: "https://picsum.photos/320/180?random=2",
      channelImg: "https://picsum.photos/36/36?random=11",
    },
    {
      id: 3,
      title: "JavaScript Tips and Tricks 2023 - You Must Know These!",
      channel: "JS Ninja",
      views: "2.4M views",
      time: "3 weeks ago",
      thumbnail: "https://picsum.photos/320/180?random=3",
      channelImg: "https://picsum.photos/36/36?random=12",
    },
    {
      id: 4,
      title: "Building a YouTube Clone with React & Tailwind CSS",
      channel: "React Pro",
      views: "356K views",
      time: "5 days ago",
      thumbnail: "https://picsum.photos/320/180?random=4",
      channelImg: "https://picsum.photos/36/36?random=13",
    },
    {
      id: 5,
      title: "React Hooks Explained - useState, useEffect",
      channel: "React Mastery",
      views: "1.7M views",
      time: "3 months ago",
      thumbnail: "https://picsum.photos/320/180?random=13",
      channelImg: "https://picsum.photos/36/36?random=20",
    },
    {
      id: 6,
      title: "Next.js 13 Crash Course - Learn the Basics",
      channel: "NextJS Academy",
      views: "892K views",
      time: "2 weeks ago",
      thumbnail: "https://picsum.photos/320/180?random=14",
      channelImg: "https://picsum.photos/36/36?random=21",
    },
  ];

  // Comments data
  const comments = [
    {
      id: 1,
      user: "CodingEnthusiast",
      avatar: "https://picsum.photos/36/36?random=30",
      time: "2 days ago",
      text: "This tutorial was exactly what I needed! Clear explanations and practical examples. Thank you!",
      likes: "2.3K",
      liked: false,
    },
    {
      id: 2,
      user: "WebDevNewbie",
      avatar: "https://picsum.photos/36/36?random=31",
      time: "1 day ago",
      text: "I've been struggling to understand React for weeks, but this 10-minute tutorial explained it better than any 5-hour course I've taken.",
      likes: "1.5K",
      liked: false,
    },
    {
      id: 3,
      user: "TechGuru",
      avatar: "https://picsum.photos/36/36?random=32",
      time: "1 day ago",
      text: "Great video! Would love to see a follow-up on React Router and state management with Context API.",
      likes: "875",
      liked: false,
    },
  ];

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar (same as homepage) */}
   <Header></Header>

      {/* Main content */}
      <div className="flex flex-1 pt-2">
        {/* Video player and info */}
        <div className="flex-1 p-4">
          {/* Video player */}
          <div className="flex-1">
            <div className="w-full bg-black rounded-lg overflow-hidden">
              <iframe
                width="1110"
                height="615"
                src="https://www.youtube.com/embed/IltsOcCj1Ak?si=Ut_O6zqHX4-KPHkf"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            <h1 className="mt-4 text-xl font-semibold">
              Demo Video Title #Jungle Jump
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              1,25,000 views • 2 days ago
            </p>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Home
              </Link>
              <Link
                to="/trending"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Trending
              </Link>
              <Link
                to="/library"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Library
              </Link>
            </div>
          </div>

          {/* Video title and actions */}
          <div className="mb-4">
            <h1 className="text-xl font-semibold">{currentVideo.title}</h1>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  {currentVideo.views} • {currentVideo.time}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <button
                  className={`flex items-center space-x-1 ${
                    liked ? "text-blue-600" : "text-gray-600"
                  }`}
                  onClick={handleLike}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                    ></path>
                  </svg>
                  <span>{currentVideo.likes}</span>
                </button>
                <button
                  className={`flex items-center space-x-1 ${
                    disliked ? "text-blue-600" : "text-gray-600"
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
                <button className="flex items-center space-x-1 text-gray-600">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                    ></path>
                  </svg>
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"
                    ></path>
                  </svg>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <img
                  src={currentVideo.channelImg}
                  alt={currentVideo.channel}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{currentVideo.channel}</h3>
                  <p className="text-sm text-gray-600">
                    {currentVideo.subscribers}
                  </p>
                  <p className="text-sm mt-2">{currentVideo.description}</p>
                  <button className="text-sm text-gray-600 mt-2">
                    Show more
                  </button>
                </div>
              </div>
              <button
                className={`px-4 py-1.5 rounded-full font-medium text-sm ${
                  subscribed
                    ? "bg-gray-200 text-black"
                    : "bg-red-600 text-white"
                }`}
                onClick={handleSubscribe}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {currentVideo.comments} Comments
            </h3>

            <div className="flex items-start space-x-3 mb-6">
              <img
                src="https://picsum.photos/36/36?random=40"
                alt="User"
                className="w-9 h-9 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3 mb-6">
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
                  <p className="text-sm my-1">{comment.text}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path
                          fill="currentColor"
                          d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                        ></path>
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1">
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
            ))}
          </div>
        </div>

        {/* Suggested videos sidebar */}
        <div className="w-full md:w-96 p-4 space-y-4">
          {suggestedVideos.map((video) => (
            <a
              key={video.id}
              to={`/video/${video.id}`}
              className="flex items-start space-x-2 cursor-pointer"
            >
              <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
                <p className="text-xs text-gray-500">
                  {video.views} • {video.time}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
