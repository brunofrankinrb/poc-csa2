"use client"

import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log(selectedFile);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form className="flex items-center space-x-6">
        <label className="block">
          <span className="sr-only">Choose a mp3</span>
          <input
            type="file"
            accept=".mp3"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </label>
      </form>
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
      >
        Upload
      </button>
      {selectedFile && (
        <div className="mt-4">
          <p className="font-semibold">Selected File:</p>
          <p>{selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;