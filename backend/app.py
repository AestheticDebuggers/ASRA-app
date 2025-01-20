from fastapi import FastAPI, UploadFile
import onnxruntime
import numpy as np
from PIL import Image

app = FastAPI()
model = onnxruntime.InferenceSession("face_recognition_model.onnx")

def preprocess(image: Image.Image):
    image = image.resize((224, 224))
    image = np.array(image).astype("float32")
    image = np.transpose(image, (2, 0, 1)) / 255.0  # Normalize
    return np.expand_dims(image, axis=0)

@app.post("/predict/")
async def predict(file: UploadFile):
    image = Image.open(file.file)
    input_data = preprocess(image)
    outputs = model.run(None, {"input": input_data})
    return {"prediction": outputs[0].tolist()}
