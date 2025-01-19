from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image

app = Flask(__name__)

# Enable CORS for all origins
CORS(app)

# Load the model
try:
    model = torch.load('new-model.pth', map_location=torch.device('cpu'))
    model.eval()
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading the model: {e}")
    model = None

# Define image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded successfully.'}), 500
    
    try:
        # Check if image file is included in the request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided.'}), 400
        
        # Process the image
        file = request.files['image']
        image = Image.open(file).convert('RGB')
        image = transform(image).unsqueeze(0)  # Add batch dimension
        
        # Run inference
        with torch.no_grad():
            output = model(image)
            _, predicted = torch.max(output, 1)
        
        # Return the prediction
        return jsonify({'prediction': int(predicted.item())})
    except Exception as e:
        return jsonify({'error': f"Error processing request: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
