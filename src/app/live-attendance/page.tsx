"use client"

import { useState } from 'react';
import {setDoc} from 'firebase/firestore';

export default function LiveAttendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [predictedName, setPredictedName] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleLogAttendance = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) return;

    setLoading(true);
    setMessage('');
    setPredictedName('');

    const formData = new FormData();
    formData.append('file', selectedImage);

    // Send image to backend for attendance logging
    const response = await fetch('http://localhost:8000/log-attendance', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setMessage('Attendance logged successfully!');
      setPredictedName(data.name); // Set the predicted name
    } else {
      setMessage('Face not recognized!');
      setPredictedName('');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Log Attendance</h1>
      <form onSubmit={handleLogAttendance} className="my-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Logging attendance...' : 'Log Attendance'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {predictedName && <p>Predicted Name: {predictedName}</p>}
    </div>
  );
}
