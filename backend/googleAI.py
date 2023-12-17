import google.generativeai as genai
import argparse
import os
import re

MAX_INPUT_LENGTH = 12


def main():
    print("Running Google AI")

    parser = argparse.ArgumentParser()
    # python googleAI.py -i "yoga mats"
    parser.add_argument("--input", "-i", type=str,
                        help="Input text", required=True)
    args = parser.parse_args()
    user_input = args.input

    if len(user_input) > MAX_INPUT_LENGTH:
        raise ValueError(
            f"Input too long. Please enter a shorter input.\nMax length: {MAX_INPUT_LENGTH} characters.\nInput length: {len(user_input)} characters")

    generate_branding_snippet(user_input)
    generate_keywords(user_input)


def bard_api(prompt: str):
    genai.configure(api_key=os.environ['PALM_API_KEY'])
    model = genai.GenerativeModel('gemini-pro')

    response = model.generate_content(prompt)
    return response


def generate_branding_snippet(user_input: str):
    prompt = f"Generate an upbeat branding snippet (phrase) for: {user_input}"
    print(prompt)

    response = bard_api(prompt)
    print(f"Snippet: {response.text}")
    return response.text


def generate_keywords(user_input: str):
    prompt = f"Generate related branding keywords for: {user_input}. Seperate each keywords with a comma."
    print(prompt)

    response = bard_api(prompt)

    # Split by comma, asterisk, and newline and Strip whitespace
    keywords_arr = re.split(",|\*|\n", response.text)
    keywords_arr = [x.lower().strip()
                    for x in keywords_arr if len(x.strip()) > 0]

    # Remove last period if it exists
    keywords_arr = [x[:(len(x)-2)] if x[-1] ==
                    "." else x for x in keywords_arr]

    print(f"Keywords: {keywords_arr}")
    return keywords_arr


if __name__ == "__main__":
    main()
