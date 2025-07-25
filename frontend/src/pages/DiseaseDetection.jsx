import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCamera, FaLeaf, FaUpload, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setError(null);
    setResult(null);

    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  async function handleAnalyze () {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', image);

      const authToken = localStorage.getItem('token');
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

      const response = await axios.post(
        `${backendUrl}/api/disease`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data);
      setResult(response.data);

    } catch (err) {
      console.error('Error during disease detection:', err);
      setError(
        err.response?.data?.message || 'Failed to analyze image. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <motion.h1 
        className="text-2xl font-bold text-green-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Plant Disease Detection
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Upload and Preview */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div 
            className={`border-2 border-dashed rounded-xl p-6 min-h-64 flex flex-col items-center justify-center cursor-pointer ${
              preview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
            onClick={handleUploadClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            {preview ? (
              <div className="w-full">
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Plant preview" 
                    className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md" 
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-2 right-2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetAll();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {!result && !loading && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg w-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAnalyze();
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaLeaf className="mr-2" />
                        Analyze Plant
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <FaCamera className="text-green-600 text-xl" />
                </div>
                <h3 className="font-medium text-lg text-gray-800 mb-2">Upload Plant Image</h3>
                <p className="text-gray-500 mb-4">
                  Take or upload a clear photo of the affected plant leaves or stems
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto shadow-md hover:bg-green-700 transition-colors"
                >
                  <FaUpload className="mr-2" />
                  Choose Image
                </motion.button>
              </div>
            )}
          </div>

          {error && (
            <motion.div 
              className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaExclamationTriangle className="mr-2" />
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - Results */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center min-h-64">
              <motion.div 
                className="w-16 h-16 mb-4 text-green-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaLeaf className="w-full h-full" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing your plant...</h3>
              <p className="text-gray-500 text-center">
                Our AI is examining the image to identify any diseases and prepare treatment recommendations.
              </p>
            </div>
          ) : result ? (
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaLeaf className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{result.disease.name}</h3>
                  <p className="text-green-600">Confidence: {result.confidence}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Treatment Steps:</h4>
                <ol className="space-y-3">
                  {result.disease.treatment.map((step, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className="bg-green-100 text-green-800 font-semibold rounded-full w-6 h-6 flex items-left justify-center mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-left">{step}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Prevention:</h4>
                <ol className="space-y-3">
                  {result.disease.prevention.map((step, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-left justify-center mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-left">{step}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors"
                onClick={resetAll}
              >
                Scan Another Plant
              </motion.button>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center min-h-64 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Some Tips For the Image</h3>
              <p className="text-gray-500 text-center">
                Upload a photo of your plant and click "Analyze Plant" to get disease detection and treatment recommendations.
                @Ashwin add smth ki image aisi ho, and aise kheecho...
                Basic instructions for uploading and analyzing the image.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DiseaseDetection;