import google.generativeai as genai
import argparse
import os


def main():
    print("Running Google AI")

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str,
                        help="Input text", required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    generate_branding_snippet(user_input)


def generate_branding_snippet(user_input: str):
    print("Generating branding snippet")

    genai.configure(api_key=os.environ['PALM_API_KEY'])
    model = genai.GenerativeModel('gemini-pro')

    prompt = f"Generate an upbeat branding snipper for: {user_input}"

    response = model.generate_content(prompt)

    print(response.text)


if __name__ == "__main__":
    main()
