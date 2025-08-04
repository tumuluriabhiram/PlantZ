import React, { createContext, useContext, useState, useCallback } from 'react';

// Create context
const PlantChatContext = createContext();

// Provider component
export const PlantChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentPlant, setCurrentPlant] = useState(null);

  // Add a message to the chat
  const addMessage = useCallback((message) => {
    setMessages(prevMessages => {
      // If adding a non-typing message, remove any existing typing indicators first
      if (message.sender !== 'typing') {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing');
        return [...filteredMessages, message];
      }
      // If it's a typing message, just add it normally
      return [...prevMessages, message];
    });
  }, []);

  // Remove typing indicator
  const removeTypingIndicator = useCallback(() => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== 'typing'));
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Set the current plant
  const setPlant = useCallback((plant) => {
    setCurrentPlant(plant);
  }, []);

  // Context value
  const value = {
    messages,
    addMessage,
    clearMessages,
    removeTypingIndicator,
    currentPlant,
    setPlant
  };

  return (
    <PlantChatContext.Provider value={value}>
      {children}
    </PlantChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const usePlantChat = () => {
  const context = useContext(PlantChatContext);
  if (context === undefined) {
    throw new Error('usePlantChat must be used within a PlantChatProvider');
  }
  return context;
};