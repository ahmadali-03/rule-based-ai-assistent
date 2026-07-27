# api/engine.py

import re
import difflib
from .responses import INTENTS, DEFAULT_FALLBACK

def process_message(user_input: str) -> dict:
    """
    Error-Free Processing Pipeline:
    1. Input sanitization (.strip().lower())
    2. Exit command check
    3. Punctuation cleaning (removes ?, !, commas)
    4. Exact O(1) dictionary match
    5. Clean keyword extraction (handles "hello bot", "hii bot", "what is react?")
    6. Typo match (triggers ONLY for real misspellings like "helooo" or "ract")
    7. Fallback response
    """
    # 1. Input Sanitization (PDF Requirement)
    raw_clean = user_input.strip().lower()

    if not raw_clean:
        return {"response": "Please type a message so I can assist you!", "is_exit": False}

    # 2. Exit Command Check (PDF Requirement)
    if raw_clean in ["exit", "quit", "bye"]:
        return {"response": INTENTS.get(raw_clean, "Goodbye! Have a great day!"), "is_exit": True}

    # 3. Punctuation Cleaning (e.g., "hello!", "what is react?", "hi, bot")
    clean_input = re.sub(r'[^\w\s]', '', raw_clean)

    # 4. Exact Match O(1)
    if clean_input in INTENTS:
        return {"response": INTENTS[clean_input], "is_exit": False}

    # 5. Whole-Word Keyword Matching
    matched_keys = []
    sorted_keys = sorted(INTENTS.keys(), key=len, reverse=True)

    for key in sorted_keys:
        pattern = r'\b' + re.escape(key) + r'\b'
        if re.search(pattern, clean_input):
            if not any(key in parent_key for parent_key in matched_keys):
                matched_keys.append(key)

    # Single intent match (e.g., "hello bot", "hii bot", "tell me about python")
    if len(matched_keys) == 1:
        return {"response": INTENTS[matched_keys[0]], "is_exit": False}

    # Multiple intents match (e.g., "topics and help")
    if len(matched_keys) > 1:
        combined = "\n\n".join([f"**[{k.title()}]**\n{INTENTS[k]}" for k in matched_keys])
        return {"response": combined, "is_exit": False}

    # 6. Typo Matcher (Triggers ONLY when NO keywords match at all)
    words = clean_input.split()
    fluff_words = {"bot", "ai", "please", "can", "you", "tell", "me", "about", "the", "is", "a", "what", "whats", "how"}

    for word in words:
        if word in fluff_words or len(word) < 2:
            continue
        
        close_matches = difflib.get_close_matches(word, INTENTS.keys(), n=1, cutoff=0.6)
        if close_matches:
            matched_key = close_matches[0]
            return {
                "response": f"*(Assuming you meant '{matched_key}')*\n\n{INTENTS[matched_key]}",
                "is_exit": False
            }

    # 7. Fallback Handler (PDF Requirement)
    return {"response": DEFAULT_FALLBACK, "is_exit": False}