import React, { useState } from 'react';

const BulkUploadTools = ({ expanded = false }) => {
  const [uploadType, setUploadType] = useState('csv');

  return (
    <div className={`glass-card rounded-3xl p-6 ${expanded ? 'col-span-full' : ''}`}>
      <h2 className="text-2xl font-bold mb-6">Bulk Upload Tools</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Upload Type</label>
          <select
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="csv">CSV Format</option>
            <option value="json">JSON Format</option>
            <option value="excel">Excel File</option>
          </select>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">📁</div>
          <p className="text-gray-600 mb-4">Drag & drop files here or click to browse</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Choose Files
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Supported Formats:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• CSV: Bulk notes, questions, answers</li>
            <li>• JSON: Structured content with metadata</li>
            <li>• Excel: Multiple sheets for different content types</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadTools;
