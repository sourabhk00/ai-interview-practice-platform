import { useState } from "react";

export default function FeedbackReport({ feedback, transcript }) {
  const [activeTab, setActiveTab] = useState('feedback');

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "interview-transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Interview Results</h2>
      
      {/* Tab Navigation */}
      <div className="border-b mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'feedback'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transcript'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Transcript
          </button>
        </nav>
      </div>

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          {feedback ? (
            <>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Overall Assessment</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{feedback.overall}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {feedback.strengths?.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {feedback.improvements?.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Feedback will appear here after the interview is complete.
            </div>
          )}
        </div>
      )}

      {/* Transcript Tab */}
      {activeTab === 'transcript' && (
        <div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm">
              {transcript || "Transcript will appear here after the interview is complete."}
            </pre>
          </div>
          
          {transcript && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg 
                className="mr-2 -ml-1 h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Download Transcript
            </button>
          )}
        </div>
      )}
    </div>
  );
}
