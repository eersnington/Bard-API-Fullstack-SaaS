import google.generativeai as genai
import os 

genai.configure(api_key = os.environ['PALM_API_KEY'])
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("List 5 planets each with an interesting fact")

print(response.text)