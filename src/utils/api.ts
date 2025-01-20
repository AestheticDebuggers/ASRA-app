export async function predict(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/predict", {
      method: "POST",
      body: formData,
  });

  if (!response.ok) {
      throw new Error("Error predicting face.");
  }

  return response.json();
}
