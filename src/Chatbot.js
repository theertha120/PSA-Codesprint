import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [activeTab, setActiveTab] = useState('Career q&a');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMessages([]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    // Hardcoded responses
    setTimeout(() => {
      let botResponse;
      const lowerCaseInput = inputValue.toLowerCase();

      switch (true) {
        case lowerCaseInput.includes('show my gaps'):
          window.location.href = '/career-paths';
          botResponse = { text: "Sure, taking you to your career paths to see your skill gaps.", sender: 'bot' };
          break;
        case lowerCaseInput.includes('reschedule mentor'):
          window.location.href = '/mentorship';
          botResponse = { text: "No problem, let's go to the mentorship page to reschedule.", sender: 'bot' };
          break;
        case lowerCaseInput.includes('i feel stressed'):
          botResponse = { text: "I'm sorry to hear that. Taking a break and practicing mindfulness can help. I recommend our Mindfulness Workshop.", sender: 'bot' };
          break;
        default:
          botResponse = { text: "I'm not sure how to help with that yet. I'm still learning!", sender: 'bot' };
      }
      setMessages([...newMessages, botResponse]);
    }, 500);
  };

  return (
    <div className="chatbot-container-custom">
      <div className="chatbot-tabs">
        <div
          className={`chatbot-tab ${activeTab === 'Career q&a' ? 'active' : ''}`}
          onClick={() => handleTabClick('Career q&a')}
        >
          Career q&a
        </div>
        <div
          className={`chatbot-tab ${activeTab === 'Learning help' ? 'active' : ''}`}
          onClick={() => handleTabClick('Learning help')}
        >
          Learning help
        </div>
        <div
          className={`chatbot-tab ${activeTab === 'Well-being' ? 'active' : ''}`}
          onClick={() => handleTabClick('Well-being')}
        >
          Well-being
        </div>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
