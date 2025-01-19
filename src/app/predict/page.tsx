'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { predictImage } from '@/utils/api';

const PredictionPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload an image.');
      return;
    }
    try {
      const result = await predictImage(file);
      setPrediction(result.prediction);
    } catch (error) {
      console.error(error);
      alert('Error during prediction.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <header className="w-full bg-gray-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Prediction</h2>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center text-center mt-10 px-6">
        <h2 className="text-4xl font-extrabold text-white">Run Prediction</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="mb-4 text-gray-900"
          />
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Predict
          </button>
        </form>
        {prediction && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-400">Prediction Result:</h3>
            <p className="text-gray-400 mt-2">{prediction}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PredictionPage;
