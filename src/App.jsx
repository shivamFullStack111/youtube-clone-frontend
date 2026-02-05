import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import VideoPage from './VideoPlayPage';
import UploadPage from './UploadVideoPage';
import SearchResultsPage from './SearchResultPage';
import ChannelPage from './ChannelPage';
import LibraryPage from './LibraryPage';
import TrendingPage from './TrendingPage';
import AuthPage from './Auth';
import {Toaster} from 'react-hot-toast'




// 404 Page for undefined routes
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/results" element={<SearchResultsPage />} />
        <Route path="/channel/:channelId" element={<ChannelPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* <Route path="/feed/subscriptions" element={<SubscriptionsPage />} /> */}
        <Route path="/library" element={<LibraryPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>

    </Router>
  );
}

export default App;