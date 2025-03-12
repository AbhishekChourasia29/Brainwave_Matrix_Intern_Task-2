from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

app = Flask(__name__)

# Stability AI API Configuration
STABILITY_API_KEY = os.getenv('STABILITY_API_KEY')
STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image"

# Store the last prompt
previous_prompt = None

@app.route('/')
def home():
    return render_template('index.html', previous_prompt=previous_prompt)

@app.route('/generate', methods=['POST'])
def generate_image():
    global previous_prompt
    try:
        prompt = request.json.get('prompt')
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        
        headers = {
            "Authorization": f"Bearer {STABILITY_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "text_prompts": [{"text": prompt}],
            "cfg_scale": 7,
            "height": 512,
            "width": 512,
            "samples": 1,
            "steps": 30
        }
        
        response = requests.post(STABILITY_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        
        image_data = response.json()
        image_url = image_data['artifacts'][0]['base64']  # Base64 encoded image
        
        # Store the current prompt as previous prompt
        previous_prompt = prompt
        
        return jsonify({"image_url": f"data:image/png;base64,{image_url}", "previous_prompt": previous_prompt})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/history', methods=['GET'])
def get_history():
    return jsonify({"previous_prompt": previous_prompt})

if __name__ == '__main__':
    app.run(debug=True)
