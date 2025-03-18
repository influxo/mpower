import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from './components/loader'
import { Home, OurServices, Gallery } from './pages'

function App() {
  const [isLoading, setIsLoading] = useState(true);
 

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
        <Route path="/about" element={<Gallery />} />
        
        {/* Add more routes as needed */}
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
