import React, { FC, useRef, useState } from "react";

export type UploadFileProps = {
  onUploadComplete: (filename?: string) => void;
};

let filename: string;

const FileUpload: FC<UploadFileProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<string>();
  const [uploadStatus, setUploadStatus] = useState<string>();
  const [progress, setProgress] = useState<number>(0);
  const [loadTotal, setLoadTotal] = useState<string>();
  const uploadRef = useRef<HTMLInputElement>(null);

  const UploadFile = () => {
    const file =
      uploadRef.current && uploadRef.current.files
        ? uploadRef.current.files[0]
        : null;
    if (!file) return;
    filename = file.name;
    var formData = new FormData();
    formData.append("file", file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", ProgressHandler, false);
    xhr.addEventListener("load", SuccessHandler, false);
    xhr.addEventListener("error", ErrorHandler, false);
    xhr.addEventListener("abort", AbortHandler, false);
    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  };

  const ProgressHandler = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
    setLoadTotal(`uploaded ${e.loaded} bytes of ${e.total}`);
    var percent = (e.loaded / e.total) * 100;
    setProgress(Math.round(percent));
    setUploadStatus(Math.round(percent) + "% uploaded...");
  };

  const SuccessHandler = () => {
    setUploadStatus("upload complete!!");
    console.log("file upload complete", filename);
    onUploadComplete(filename);
  };
  const ErrorHandler = () => {
    setUploadStatus("upload failed!!");
  };
  const AbortHandler = () => {
    setUploadStatus("upload aborted!!");
  };

  return (
    <div className="App">
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-8"
        role="alert"
      >
        <p className="font-bold">File to use</p>
        <p>
          Use{" "}
          <u>
            <a href="/radio-RMC-001824.mp3">radio-RMC-001824.mp3</a>
          </u>{" "}
          for the POC.
        </p>
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="file"
            ref={uploadRef}
            accept=".mp3"
            onChange={UploadFile}
            className="hidden"
          />
        </label>
      </div>

      {progress > 0 && (
        <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 mt-8">
          <div
            className="h-4 bg-blue-600 rounded-full dark:bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <p>{uploadStatus}</p>
      <p>{loadTotal}</p>
    </div>
  );
};

export default FileUpload;
