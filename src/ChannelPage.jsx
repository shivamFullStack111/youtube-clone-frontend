import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [activeTab, setActiveTab] = useState("home");
  const [subscribed, setSubscribed] = useState(false);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get current logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Fetch channel data and videos
  useEffect(() => {
    if (channelId) {
      fetchChannelData();
      fetchAllVideos();
    }
  }, [channelId]);

  // Check subscription status when channel and currentUser are available
  useEffect(() => {
    if (!channel || !currentUser) return;

    // ONLY initial load ke liye
    if (!isProcessing) {
      const isSubscribed = channel.subscribers?.some(
        (sub) => sub.id === currentUser.id,
      );
      setSubscribed(isSubscribed);
    }
  }, [channel?.id, currentUser?.id]);

  const fetchChannelData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost/youtube-clone-backend/api/user/getProfile.php?userId=${channelId}`,
      );
      const data = await response.json();
      if (data.success) {
        setChannel(data.data);
      }
    } catch (error) {
      console.error("Error fetching channel:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllVideos = async () => {
    try {
      const response = await fetch(
        "http://localhost/youtube-clone-backend/api/video/getAll.php",
      );
      const data = await response.json();
      if (data.success) {
        setVideos(data.data);
        // Filter videos for this specific channel
        const filteredVideos = data.data.filter(
          (video) =>
            video.uploadedBy && video.uploadedBy.id === channelId,
        );
        setChannelVideos(filteredVideos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const checkSubscriptionStatus = () => {
    if (channel && channel.subscribers && currentUser) {
      const isSubscribed = channel.subscribers.some(
        (sub) => sub.id === currentUser.id,
      );
      setSubscribed(isSubscribed);
    }
  };

const handleSubscribe = async () => {
  if (!currentUser) return;
  if (currentUser.id === Number(channelId)) return;
  if (isProcessing) return;

  setIsProcessing(true);

  const prevSubscribed = subscribed;

  // ✅ OPTIMISTIC UPDATE (FULL)
  setSubscribed((prev) => !prev);

  setChannel((prev) => {
    if (!prev) return prev;

    return {
      ...prev,
      totalSubscriber: prevSubscribed
        ? Math.max(0, prev.totalSubscriber - 1)
        : prev.totalSubscriber + 1,

      subscribers: prevSubscribed
        ? prev.subscribers.filter((s) => s.id !== currentUser.id)
        : [...(prev.subscribers || []), { id: currentUser.id }],
    };
  });

  try {
    const res = await fetch(
      "http://localhost/youtube-clone-backend/api/user/subscribe.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelUserId: channelId,
          subscriber: {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            channelName: currentUser.channelName,
          },
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("API failed");
    }

    // ✅ SERVER TRUTH SYNC
    setSubscribed(data.action === "subscribed");

    setChannel((prev) =>
      prev
        ? {
            ...prev,
            totalSubscriber: data.totalSubscriber,
          }
        : prev
    );
  } catch (err) {
    console.error(err);

    // ❌ ROLLBACK
    setSubscribed(prevSubscribed);
    setChannel((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        totalSubscriber: prevSubscribed
          ? prev.totalSubscriber + 1
          : Math.max(0, prev.totalSubscriber - 1),
        subscribers: prevSubscribed
          ? [...(prev.subscribers || []), { id: currentUser.id }]
          : prev.subscribers.filter((s) => s.id !== currentUser.id),
      };
    });
  } finally {
    setIsProcessing(false);
  }
};


  const TabButton = ({ name, value, icon }) => (
    <button
      className={`flex items-center px-4 py-3 border-b-2 ${
        activeTab === value
          ? "border-black text-black font-medium"
          : "border-transparent text-gray-600 hover:text-black"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );

  const VideoCard = ({ video }) => (
    <Link to={`/video/${video?.id}`} className="cursor-pointer group">
      <div className="relative mb-2">
        <img
          src={video.thumbnail || "https://picsum.photos/320/180"}
          alt={video.title}
          className="w-full h-40 object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration || "10:00"}
        </div>
      </div>
      <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600">
        {video.title}
      </h3>
      <div className="text-xs text-gray-600">
        <span>{video.views || "0 views"}</span>
        <span className="mx-1">•</span>
        <span>{video.timeAgo || "Just now"}</span>
      </div>
    </Link>
  );

  // Format number with commas
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "0";
  };

  // Calculate total views for channel
  const calculateTotalViews = () => {
    if (channelVideos.length === 0) return "0 views";
    const total = channelVideos.reduce((sum, video) => {
      const views = parseInt(video.views) || 0;
      return sum + views;
    }, 0);
    return `${formatNumber(total)} views`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded mb-6"></div>
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="ml-6">
                <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-64"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Channel not found</h2>
          <p className="text-gray-600">
            The channel you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Prepare about data
  const about = {
    description:
      channel.channelDescription ||
      channel.description ||
      "No description provided",
    details: [
      { label: "Joined", value: channel.joinedOn || "Not specified" },
      { label: "Total views", value: calculateTotalViews() },
      {
        label: "Subscribers",
        value: `${formatNumber(channel.totalSubscriber || 0)} subscribers`,
      },
      { label: "Videos", value: `${channelVideos.length} videos` },
    ],
    links: channel.links || [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Channel Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-purple-600 md:h-60">
        {channel.banner ? (
          <img
            src={channel.banner}
            alt="Channel banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        )}
      </div>

      {/* Channel Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 pb-6">
          <div className="flex items-start">
            <div className="relative">
              <img
                src={channel.avatar || "https://picsum.photos/80/80"}
                alt={channel.name}
                className="w-20 h-20 rounded-full -mt-6 border-4 border-white md:w-24 md:h-24"
              />
            </div>
            <div className="ml-4 mt-2">
              <h1 className="text-xl font-bold md:text-2xl">
                {channel.channelName || channel.name}
              </h1>
              <p className="text-gray-600 text-sm">
                @
                {channel.channelName
                  ? channel.channelName.toLowerCase().replace(/\s+/g, "")
                  : channel.name.toLowerCase().replace(/\s+/g, "")}{" "}
                •{` ${formatNumber(channel.totalSubscriber || 0)} subscribers`}{" "}
                •{` ${channelVideos.length} videos`}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                {channel.channelDescription ||
                  channel.description ||
                  "No description"}
              </p>
            </div>
          </div>

          {/* Show subscribe button only if it's not the current user's own channel AND user is logged in */}
          {currentUser && currentUser.id !== parseInt(channelId) ? (
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center ${
                  subscribed
                    ? "bg-gray-200 text-black hover:bg-gray-300"
                    : "bg-red-600 text-white hover:bg-red-700"
                } ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
                onClick={handleSubscribe}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {subscribed ? "Unsubscribing..." : "Subscribing..."}
                  </>
                ) : subscribed ? (
                  <>
                    <span className="hidden md:inline">Subscribed</span>
                    <span className="md:hidden">✓</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          ) : currentUser && currentUser.id === parseInt(channelId) ? (
            // Show message if it's the user's own channel
            <div className="flex space-x-2 mt-4 md:mt-0">
              <span className="px-4 py-2 text-sm text-gray-600">
                Your channel
              </span>
            </div>
          ) : (
            // Show login prompt if user is not logged in
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                className="px-4 py-2 rounded-full font-medium text-sm bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  // Redirect to login or show login modal
                  window.location.href = "/login";
                }}
              >
                Login to Subscribe
              </button>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            <TabButton name="Home" value="home" icon="🏠" />
            <TabButton name="Videos" value="videos" icon="🎥" />
            <TabButton name="About" value="about" icon="ℹ️" />
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {/* Home Tab */}
          {activeTab === "home" && (
            <div>
              {/* Featured Content */}
              {channelVideos.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Featured</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {channelVideos.slice(0, 4).map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Uploads */}
              {channelVideos.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Popular videos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {channelVideos.slice(0, 8).map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              )}

              {channelVideos.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📹</div>
                  <h3 className="text-xl font-bold mb-2">No videos yet</h3>
                  <p className="text-gray-600">
                    This channel hasn't uploaded any videos.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  Uploads ({channelVideos.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100">
                    Latest
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {channelVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {channelVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🎥</div>
                  <h3 className="text-xl font-bold mb-2">No videos uploaded</h3>
                  <p className="text-gray-600">
                    This channel hasn't uploaded any videos yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-800 mb-8 whitespace-pre-line">
                {about.description}
              </p>

              <h2 className="text-xl font-bold mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {about.details.map((detail, index) => (
                  <div key={index}>
                    <span className="font-medium text-gray-700">
                      {detail.label}:
                    </span>
                    <span className="ml-2 text-gray-600">{detail.value}</span>
                  </div>
                ))}
              </div>

              {about.links.length > 0 && (
                <>
                  <h2 className="text-xl font-bold mb-4">Links</h2>
                  <div className="space-y-2">
                    {about.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
