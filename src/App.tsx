import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from './components/loader'
import { Home, OurServices, Gallery } from './pages'

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if this is the initial page load
    return !sessionStorage.getItem('hasVisitedBefore');
  });
 
  useEffect(() => {
    // If the app has finished loading, mark that the user has visited
    if (!isLoading) {
      sessionStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [isLoading]);

  function handleLoadingComplete() {
    setIsLoading(false);
  }

  // If still in initial loading state, show the loader
  if (isLoading) {
    return <Loader onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/gallery" element={<Gallery />} />
        
        {/* Add more routes as needed */}
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
