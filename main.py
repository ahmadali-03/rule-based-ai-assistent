# main.py

import sys
import os

# Allow direct imports from api directory
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'api')))

from api.engine import process_message

def run_cli():
    print("==================================================")
    print("   DecodeLabs Rule-Based AI Chatbot (CLI Mode)   ")
    print("==================================================")
    print("Type your message below. Type 'exit' to quit.\n")

    while True:
        try:
            user_input = input("You: ")
            result = process_message(user_input)
            print(f"Bot: {result['response']}\n")

            if result["is_exit"]:
                break
        except (KeyboardInterrupt, EOFError):
            print("\nGoodbye!")
            break

if __name__ == "__main__":
    run_cli()