import { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import ChatBox from './components/ChatBox';
import FeedbackReport from './components/FeedbackReport';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);

  const handleResumeUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('http://localhost:5000/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload resume');

      const data = await response.json();
      
      // Start the interview with AI's first question
      setMessages([
        {
          role: 'assistant',
          text: 'Hello! I\'ve reviewed your resume. Let\'s begin the interview. ' + data.initialQuestion
        }
      ]);
      setInterviewStarted(true);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume. Please try again.');
    }
  };

  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      // Add user message to chat
      const updatedMessages = [...messages, { role: 'user', text: message }];
      setMessages(updatedMessages);

      // Send message to backend
      const response = await fetch('http://localhost:5000/api/interview/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatHistory: updatedMessages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      // Add AI response to chat
      setMessages([...updatedMessages, { role: 'assistant', text: data.reply }]);

      // If interview is complete, set feedback and transcript
      if (data.isComplete) {
        setFeedback({
          overall: data.feedback.overall,
          strengths: data.feedback.strengths,
          improvements: data.feedback.improvements,
        });
        setTranscript(data.transcript);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">AI Interview Practice</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!interviewStarted ? (
            <div className="mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Practice Your Interview Skills with AI
                </h2>
                <p className="text-lg text-gray-600">
                  Upload your resume to start a personalized interview simulation
                </p>
              </div>
              <ResumeUpload onUpload={handleResumeUpload} />
            </div>
          ) : (
            <div className="space-y-6">
              <ChatBox 
                messages={messages} 
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
              {(feedback || transcript) && (
                <FeedbackReport 
                  feedback={feedback}
                  transcript={transcript}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            AI Interview Practice Platform - Powered by OpenAI GPT
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
