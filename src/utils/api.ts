import axios from 'axios';


interface PredictionResponse {
  prediction: string;
}

export const predictImage = async (imageFile: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post<PredictionResponse>(
      'http://127.0.0.1:5000/predict',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error during prediction:', error);
    throw new Error('Failed to get prediction.');
  }
};
