import { useState } from "react";

export default function ResumeUpload({ onUpload }) {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) throw new Error("No file selected.");
      
      if (!["application/pdf", "text/plain"].includes(file.type)) {
        throw new Error("Unsupported file format. Please upload a PDF or TXT file.");
      }

      setUploading(true);
      setError(null);
      await onUpload(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-6 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF or TXT files only</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.txt"
              onChange={handleChange}
              disabled={uploading}
            />
          </label>
        </div>
        {error && (
          <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50">
            {error}
          </div>
        )}
        {uploading && (
          <div className="text-center text-gray-500">
            Uploading...
          </div>
        )}
      </div>
    </div>
  );
}
