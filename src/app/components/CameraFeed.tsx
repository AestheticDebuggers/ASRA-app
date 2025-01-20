"use client";

import { useRef, useEffect } from "react";

const CameraFeed = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        if (navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } else {
            alert("Camera not supported.");
        }
    };

    const captureImage = async () => {
        const canvas = document.createElement("canvas");
        if (videoRef.current) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

            const imageBlob = await new Promise<Blob | null>((resolve) =>
                canvas.toBlob((blob) => resolve(blob))
            );
            if (!imageBlob) return;

            const formData = new FormData();
            formData.append("file", new File([imageBlob], "capture.jpg"));

            const response = await fetch("/api/predict", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log("Prediction:", result);
        }
    };

    useEffect(() => {
        startCamera();
    }, []);

    return (
        <div>
            <video ref={videoRef} style={{ width: "100%", maxHeight: "400px" }} />
            <button onClick={captureImage}>Capture and Predict</button>
        </div>
    );
};

export default CameraFeed;
