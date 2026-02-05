import React, { useState } from 'react';

const UploadPage = () => {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    category: 'education',
    tags: ''
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadComplete(true);
      }
    }, 200);
  };

  const handleReset = () => {
    setVideoData({
      title: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      category: 'education',
      tags: ''
    });
    setUploadProgress(0);
    setUploadComplete(false);
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gray-200 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Complete!</h2>
            <p className="text-gray-600 mb-6">Your video has been successfully published on PlayZone.</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Upload Another Video
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                View Video
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white px-6 py-4">
          <h1 className="text-xl font-bold">Upload Video</h1>
          <p className="text-gray-300 text-sm">Share your video with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Processing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Video Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Title (required)</label>
                <input
                  type="text"
                  name="title"
                  value={videoData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a title that describes your video"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{videoData.title.length}/100 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={videoData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell viewers about your video"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{videoData.description.length}/5000 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (required)</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={videoData.videoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste the URL of your video"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={videoData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste the URL of your thumbnail image"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={videoData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add tags separated by commas (e.g., react, tutorial, webdev)"
                />
                <p className="text-xs text-gray-500 mt-1">Tags help viewers find your video</p>
              </div>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
            

              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-800 mb-3">Category</h3>
                <select
                  name="category"
                  value={videoData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                  <option value="sports">Sports</option>
                  <option value="technology">Technology</option>
                  <option value="travel">Travel & Events</option>
                  <option value="howto">Howto & Style</option>
                </select>
              </div>

              {/* Thumbnail Preview */}
              {videoData.thumbnail && (
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Thumbnail Preview</h3>
                  <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                    <img 
                      src={videoData.thumbnail} 
                      alt="Thumbnail preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180' fill='%23cccccc'%3E%3Crect width='320' height='180' fill='%23f0f0f0'/%3E%3Cpath d='M120 70L100 90L80 70H60V110H80V90L100 110L120 90V110H140V70H120ZM180 110V90H160V70H200V90H180V110H160V90H180ZM240 70H220V110H240V90H260V110H280V90H260V70H240Z' fill='%23999999'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isUploading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;