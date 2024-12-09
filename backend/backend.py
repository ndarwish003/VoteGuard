from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import cv2
import numpy as np
import os
from io import BytesIO
from PIL import Image
import base64

app = Flask(__name__)
CORS(app)

# Load known faces
known_face_encodings = []
known_face_names = []

folder_dir = "images"  # Folder containing your known faces

for image in os.listdir(folder_dir):
    if image.endswith(".jpg"):
        face_image = face_recognition.load_image_file(f"{folder_dir}/{image}")
        face_encoding = face_recognition.face_encodings(face_image)[0]
        known_face_encodings.append(face_encoding)
        known_face_names.append(image.removesuffix(".jpg"))

@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.json
    image_data = data['image'].split(",")[1]
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # Resize frame for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    face_locations = face_recognition.face_locations(small_frame)
    face_encodings = face_recognition.face_encodings(small_frame, face_locations)

    response = {"authenticated": False, "name": None}
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            response["authenticated"] = True
            response["name"] = known_face_names[best_match_index]
            break
        else:
            response["authenticated"] = False
            response["name"] = None

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)