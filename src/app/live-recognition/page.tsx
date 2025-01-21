"use client"

import { useEffect, useRef, useState } from 'react';

export default function LiveRecognition() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Set up webcam stream on mount
  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setIsStreaming(true);
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
          setMessage("Unable to access webcam.");
        });
    } else {
      setMessage("Webcam not supported.");
    }
  }, []);

  const handleCaptureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Capture the current frame from the video
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/jpeg'); // Get base64-encoded image data

      // Send captured frame to backend for attendance logging
      setLoading(true);
      setMessage('');

      const response = await fetch('http://localhost:8000/log-attendance', {
        method: 'POST',
        body: JSON.stringify({ image_data: imageData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Attendance logged successfully!');
      } else {
        setMessage('Face not recognized!');
      }
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Live Face Recognition</h1>
      <div className="my-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="100%"
          height="auto"
          style={{ border: '1px solid black' }}
        />
      </div>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: 'none' }}
      />
      <div className="my-4">
        {isStreaming ? (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleCaptureFrame}
          >
            Capture Frame & Log Attendance
          </button>
        ) : (
          <p>Waiting for camera feed...</p>
        )}
      </div>
      {loading ? (
        <p>Logging attendance...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
