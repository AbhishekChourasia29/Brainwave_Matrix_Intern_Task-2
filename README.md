# Barinwave Matrix Internship AI/ML Intern Task -2 by Abhishek Chourasia

# VisionForge AI - Project Report

# Text to Image Generator Application

## 1. Project Overview
Cognitive image synthesis platform enabling text-to-image generation using Stability.ai's API with history tracking and responsive UI.

## 2. Dataset and Model Development
### Data Collection and Pre-processing
- Utilizes Stability.ai's pre-trained Stable Diffusion v1.6 model
- No local dataset required (API-based solution)

### Model Training and Evaluation
- Leverages Stability.ai's enterprise-grade model
- Evaluation metrics handled by API provider

## 3. Application Architecture
### Backend – Flask Application
- REST API endpoints for image generation
- Session-based history storage
- Error handling middleware

### Frontend – HTML/CSS/JavaScript
- Responsive grid layout
- Client-side interaction management
- History visualization system

## 4. Deployment
1. Install requirements: `pip install flask python-dotenv requests`
2. Create `.env` with `STABILITY_API_KEY`
3. Run `python app.py`
4. Access `http://localhost:5000`

## 5. System Architecture

## 6. Future Enhancements
- User authentication system
- Batch generation capabilities
- Style presets selector
- Cloud deployment with Docker

## 7. References
- Stability API Documentation: https://platform.stability.ai
- Flask Framework: https://flask.palletsprojects.com
