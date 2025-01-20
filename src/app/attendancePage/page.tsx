'use client';

import React, { useEffect, useRef, useState } from 'react';

const AttendancePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [attendanceLog, setAttendanceLog] = useState<string[]>([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('Unable to access the camera.');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const sendFrameToServer = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const formData = new FormData();
        formData.append('image', blob, 'frame.jpg');

        try {
          const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();

          if (data.prediction && !attendanceLog.includes(data.prediction)) {
            setAttendanceLog((prevLog) => [...prevLog, data.prediction]);
          }
        } catch (error) {
          console.error('Error sending frame:', error);
        }
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
    const interval = setInterval(sendFrameToServer, 3000); // Capture frame every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-6">Live Attendance</h1>
      <video ref={videoRef} className="mt-6 w-3/4 border-4 border-gray-700 rounded" />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Attendance Log:</h2>
        <ul className="mt-4 text-gray-400">
          {attendanceLog.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendancePage;
