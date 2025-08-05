import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlantConversation from '../components/PlantConversation';
import { usePlantChat } from '../components/PlantChatContext';
import axios from 'axios';

const ChatPage = () => {
    const { plantId } = useParams();
    const { currentPlant, messages, isTyping, addMessage, clearMessages, removeTypingIndicator } = usePlantChat();
    const [isLoading, setIsLoading] = useState(true);
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);
    const messageEndRef = useRef(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Format message text - Convert markdown-style formatting to properly formatted text
    const formatBotMessage = (text) => {
        if (!text) return '';
        
        let formattedText = text;
        
        // Clean up excessive whitespace but preserve intentional line breaks
        formattedText = formattedText.replace(/\n{3,}/g, '\n\n');
        formattedText = formattedText.replace(/[ \t]{2,}/g, ' ');
        
        // Remove markdown headers but keep the text with proper spacing
        formattedText = formattedText.replace(/#{1,6}\s*/g, '');
        
        // Convert bold markdown to HTML bold tags (preserve ** formatting)
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert italic/emphasis markdown to HTML bold tags (preserve * formatting)
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        
        // Remove code block markers but keep the content
        formattedText = formattedText.replace(/```[\w]*\n?/g, '');
        formattedText = formattedText.replace(/`(.*?)`/g, '$1');
        
        // Preserve numbered lists - keep them as is with proper spacing
        formattedText = formattedText.replace(/^\s*(\d+)\.\s+/gm, '$1. ');
        
        // Clean up bullet points but preserve them
        formattedText = formattedText.replace(/^\s*[-+]\s+/gm, '• ');
        
        // Remove any remaining markdown links but keep the text
        formattedText = formattedText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        
        // Clean up any remaining special markdown characters except preserved ones
        formattedText = formattedText.replace(/[_~`]/g, '');
        
        // Fix spacing around punctuation
        formattedText = formattedText.replace(/\s+([.!?])/g, '$1');
        formattedText = formattedText.replace(/([.!?])\s{2,}/g, '$1 ');
        
        // Remove leading/trailing whitespace and normalize line breaks
        formattedText = formattedText.trim();
        formattedText = formattedText.replace(/\n\s*\n/g, '\n\n');
        
        return formattedText;
    };

    // Render formatted text with proper line breaks and HTML formatting
    const renderFormattedText = (text) => {
        if (!text) return null;
        
        return text.split('\n').map((line, index) => (
            <div key={index} className={index > 0 ? 'mt-1' : ''}>
                <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
        ));
    };

    // Handle sending messages to backend
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        // Add user message to chat immediately
        addMessage({
            id: Date.now(),
            text: userInput,
            sender: 'user',
            timestamp: new Date().toISOString()
        });

        // Clear input field
        const messageToSend = userInput;
        setUserInput('');

        try {
            // Set typing indicator
            addMessage({
                id: 'typing',
                text: '',
                sender: 'typing',
                timestamp: new Date().toISOString()
            });
            
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
                message: messageToSend
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-ID': plantId || 'default_session'
                },
                withCredentials: true
            });
            
            // Remove typing indicator by filtering it out
            removeTypingIndicator();
            
            // Extract the text response from the Gemini API response
            let botResponse = '';
            
            if (typeof response.data === 'string') {
                // The backend is directly returning the text
                botResponse = response.data;
            } else {
                console.error('Unexpected response format:', response.data);
                botResponse = "I'm having trouble understanding right now. Please try again.";
            }
            
            // Add the bot response to chat without clearing existing messages
            addMessage({
                id: Date.now() + 1,
                text: formatBotMessage(botResponse),
                sender: 'plant',
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            console.error('Error sending message:', err);
            
            // Remove typing indicator if present
            removeTypingIndicator();
            
            // Show error in chat
            addMessage({
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'plant',
                timestamp: new Date().toISOString()
            });
            
            setError('Failed to get response from server');
            // Clear error after 5 seconds
            setTimeout(() => setError(null), 5000);
        }
    };

    // Quick reply options
    const quickReplies = [
        "How should I water my plants?",
        "What's a plant's ideal temperature?",
        "What is the optimum weather for my plant?"
    ];

    const handleQuickReply = (reply) => {
        setUserInput(reply);
        // Focus on input after selecting quick reply
        document.getElementById('chat-input').focus();
    };

    if (isLoading && plantId) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-green-50">
                <div className="text-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
                    />
                    <p className="text-green-800">Loading chat for {currentPlant?.name || 'Plant'}...</p>
                </div>
            </div>
        );
    }

    return (
      <motion.div
          className="flex flex-col min-h-screen bg-green-50 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-800">
                {plantId ? `Chat with ${currentPlant?.name || 'Plant'}` : 'Plant Chat Assistant'}
            </h1>
            {plantId && (
                <Link 
                    to={`/plants/${plantId}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Back to Plant Details
                </Link>
            )}
        </div>

        <div className="flex flex-col flex-grow bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 bg-green-50 min-h-96">
              {messages.length === 0 && (
                <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg viewBox="0 0 100 100" className="w-12 h-12 text-green-600">
                            <path fill="currentColor" d="M50 10 C 70 20, 85 45, 85 60 Q 85 90, 50 95 Q 15 90, 15 60 C 15 45, 30 20, 50 10 M 50 10 L 50 95"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {plantId ? `Start chatting with ${currentPlant?.name || 'your plant'}!` : 'Welcome to Plant Chat!'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        {plantId 
                            ? 'Ask about care needs, share updates, or just have a friendly conversation.'
                            : 'Get expert advice on plant care, identify issues, and learn how to keep your plants healthy.'
                        }
                    </p>
                </motion.div>
              )}
              
              {messages.map((msg) => (
                  <motion.div
                      key={msg.id}
                      className={`mb-6 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                  >
                      <div className={`flex items-start max-w-3/4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          {/* Avatar */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.sender === 'user' 
                                  ? 'bg-green-600 ml-3' 
                                  : 'bg-green-100 mr-3'
                          }`}>
                              {msg.sender === 'user' ? (
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                              ) : (
                                  <svg viewBox="0 0 100 100" className="w-6 h-6 text-green-600">
                                      <path fill="currentColor" d="M50 10 C 70 20, 85 45, 85 60 Q 85 90, 50 95 Q 15 90, 15 60 C 15 45, 30 20, 50 10 M 50 10 L 50 95"/>
                                  </svg>
                              )}
                          </div>
                          
                          {/* Message Bubble */}
                          <div 
                              className={`p-4 rounded-2xl shadow-sm ${
                                  msg.sender === 'user' 
                                      ? 'bg-green-600 text-white rounded-br-md' 
                                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                              }`}
                          >
                              <div className="leading-relaxed">
                                  {renderFormattedText(msg.text)}
                              </div>
                              <div className={`text-xs mt-2 ${
                                  msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                              }`}>
                                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                          </div>
                      </div>
                  </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                    className="flex justify-start mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg viewBox="0 0 100 100" className="w-6 h-6 text-green-600">
                                <path fill="currentColor" d="M50 10 C 70 20, 85 45, 85 60 Q 85 90, 50 95 Q 15 90, 15 60 C 15 45, 30 20, 50 10 M 50 10 L 50 95"/>
                            </svg>
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
                            <div className="flex space-x-1">
                                <motion.div 
                                    className="w-2 h-2 bg-green-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0 }}
                                />
                                <motion.div 
                                    className="w-2 h-2 bg-green-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                                />
                                <motion.div 
                                    className="w-2 h-2 bg-green-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
              )}
              <div ref={messageEndRef} />
          </div>

          {/* Quick Replies */}
          <motion.div 
              className="p-4 bg-gray-50 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
          >
              <p className="text-sm text-gray-600 mb-3 font-medium">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                      <motion.button
                          key={index}
                          className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm hover:bg-green-50 hover:text-green-700 transition-colors border border-gray-200 shadow-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuickReply(reply)}
                      >
                          {reply}
                      </motion.button>
                  ))}
              </div>
          </motion.div>

          {/* Input Form */}
          <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <input
                    id="chat-input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={plantId ? "Talk to your plant..." : "Ask about plant care..."}
                    className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                />
                <button
                    disabled={!userInput.trim()}
                    className={`px-6 py-3 rounded-full font-medium transition-all shadow-sm ${
                        userInput.trim() 
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => {
                        handleSendMessage({ preventDefault: () => {} });
                    }}
                >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                  </button>
              </div>
          </div>

          {/* Error Message */}
          {error && (
              <motion.div 
                  className="p-4 bg-red-50 text-red-800 text-center border-t border-red-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              >
                  <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                  </div>
              </motion.div>
          )}
        </div>

          {/* Chat Help Section */}
        <motion.div 
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">How to Chat Effectively</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-gray-700 mb-2">💬 Conversation Tips</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Ask specific questions about care needs
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Share recent care actions you've taken
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Describe any symptoms or concerns
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-gray-700 mb-2">🌱 What You Can Ask</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Watering schedules and techniques
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Light requirements and positioning
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Fertilization and seasonal care
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
      </motion.div>
    );
};

export default ChatPage;