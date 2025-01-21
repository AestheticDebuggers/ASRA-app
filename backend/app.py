from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from model_inference import run_inference_on_image
from io import BytesIO
import base64

app = FastAPI()

# Allow cross-origin requests from your frontend (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/log-attendance")
async def log_attendance(request: Request, file: UploadFile = File(None)):
    try:
        if file:  # If the file is uploaded (LiveAttendance)
            image_data = await file.read()
            image = BytesIO(image_data)
        else:  # If base64 image data is sent (LiveRecognition)
            data = await request.json()
            image_data = data.get("image_data")
            if not image_data:
                raise HTTPException(status_code=400, detail="No image data provided")
            # Convert base64 image data to binary
            image_bytes = base64.b64decode(image_data.split(",")[1])
            image = BytesIO(image_bytes)

        result = run_inference_on_image(image)

        if result["success"]:
            return {"message": "Attendance logged", "success": True}
        else:
            return {"message": "Face not recognized", "success": False}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
