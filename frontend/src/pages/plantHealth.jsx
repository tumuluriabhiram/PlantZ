import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for session IDs
import Navbar from '../components/Navbar';

const PlantHealthCheck = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Initial hardcoded data matching the format needed by the API
  const initialData = {
    Soil_Moisture: 25.0,
    Ambient_Temperature: 22.5,
    Soil_Temperature: 20.0,
    Humidity: 60.0,
    Light_Intensity: 500.0,
    Soil_pH: 6.5,
    Nitrogen_Level: 30.0,
    Phosphorus_Level: 25.0,
    Potassium_Level: 35.0,
    Chlorophyll_Content: 40.0,
    Electrochemical_Signal: 1.5,
  };

  const [formData, setFormData] = useState(initialData);

  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const chatContainerRef = useRef(null); // Ref for scrolling chat

  // Generate session ID on component mount
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

   // Scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Ensure values are numbers
      [name]: value === '' ? '' : parseFloat(value),
    });
  };

  // --- API Calls ---


  // Handle form submission for prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null); // Reset previous results
    setChatMessages([]); // Clear previous chat
    setChatError(null); // Clear previous chat error

    // Basic frontend validation (ensure all fields have numeric values)
    const invalidFields = Object.entries(formData)
      .filter(([key, value]) => typeof value !== 'number' || isNaN(value));

    if (invalidFields.length > 0) {
        setError(`Please enter valid numbers for: ${invalidFields.map(f => f[0]).join(', ')}`);
        setLoading(false);
        return;
    }


    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'omit', // Or 'include' if backend CORS is strict
      });

      if (!response.ok) {
         const errorData = await response.json();
        throw new Error(errorData.error || `Prediction API failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      console.log(data)
      
    } catch (err) {
       console.error("Prediction submit error:", err);
      setError(`Prediction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-green-50 min-h-screen p-6 font-sans">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto"> {/* Increased max-width slightly */}
        <div className="text-center mb-8">
           {/* ... (keep existing intro section) ... */}
           <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-green-500">
                {/* Simple leaf SVG */}
                <path fill="currentColor" d="M50 10 C 70 20, 85 45, 85 60 Q 85 90, 50 95 Q 15 90, 15 60 C 15 45, 30 20, 50 10 M 50 10 L 50 95"/>
            </svg>
           </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Plant Health Predictor & Assistant</h1>
          <p className="text-gray-600">
            Enter sensor data to analyze health and chat with our AI assistant for advice.
          </p>
        </div>

        {/* Prediction Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
             <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Enter Sensor Data</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {/* Adjusted grid */}
              {Object.keys(initialData).map((key) => ( // Use initialData keys to ensure order
                <div key={key} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {key.replace(/_/g, ' ')} {/* Replace underscores */}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    step="0.1" // Allow decimals
                    className="border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out text-sm" // Smaller text
                    required
                    placeholder="e.g. 25.0"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {loading ? 'Analyzing...' : 'Check Plant Health'}
              </button>
            </div>
          </form>
        </div>

         {/* Error message for Prediction */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
            <p className="font-bold">Prediction Error</p>
            <p>{error}</p>
          </div>
        )}


        {
          result !== null
          ?
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Analysis Result</h2>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-3 ${
                  result.stress === 'Low Stress' ? 'bg-green-500' :
                  result.stress === 'Medium Stress' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <div>
                  <h3 className="font-medium text-gray-800">{result.stress}</h3>
                  <p className="text-sm text-gray-600">Plant Stress Level</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">{result.confidence}%</p>
                <p className="text-sm text-gray-600">Confidence</p>
              </div>
            </div>
          </div>
          :
          null
        }

      </div> {/* End Max Width Container */}
    </div>
  );
};

export default PlantHealthCheck;