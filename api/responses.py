# api/responses.py

INTENTS = {
    # --- Greetings & Civilities (Includes informal chat variations) ---
    "hello": "Hello! Welcome to the DecodeLabs AI Assistant. How can I help you today?",
    "hi": "Hey there! What can I assist you with today?",
    "hey": "Hey! Ready to explore DecodeLabs projects or learn about AI?",
    "heyy": "Hey! Ready to explore DecodeLabs projects or learn about AI?",
    "yo": "Yo! What can I help you with today?",
    "good morning": "Good morning! Hope you're having a productive day. How can I help?",
    "good evening": "Good evening! How can I assist you tonight?",
    "how are you": "I'm doing great, thanks for asking! Running smoothly and ready to help.",

    # --- Bot Identity & Capabilities ---
    "who are you": "I am a deterministic, rule-based AI chatbot built for the DecodeLabs internship program.",
    "what is your name": "I'm the DecodeLabs Logic Engine Bot! Your automated project assistant.",
    "what can you do": "I can answer questions about DecodeLabs, explain rule-based vs. probabilistic AI, and guide you through internship projects.",
    "how do you work": "I process your text using input sanitization (.strip().lower()) and perform instant O(1) dictionary lookups!",
    "are you real ai": "I am a rule-based deterministic AI! I don't guess or hallucinate—I match your exact intent against my knowledge base.",

    # --- DecodeLabs & Internship Info ---
    "what is decodelabs": "DecodeLabs offers hands-on internships and practical learning tracks in AI, software engineering, and web development.",
    "project 1": "Project 1 focuses on building a Rule-Based AI Engine—teaching deterministic logic, input sanitization, and dictionary lookups.",
    "internship": "The DecodeLabs internship gives you practical, real-world project experience to build a standout portfolio.",
    "python": "Python is the primary language for our AI track because of its clean syntax and powerful data handling capabilities.",
    "react": "React is a JavaScript frontend library used for building modern, fast web user interfaces.",
    "fastapi": "FastAPI is a high-performance Python framework used to build backend REST APIs quickly.",
    "vercel": "Vercel is a cloud deployment platform that hosts both React web apps and serverless Python functions.",
    "submission": "Ensure your project repository includes clean Python code, proper input sanitization, and a clear README before submitting.",

    # --- AI & Tech Concepts ---
    "deterministic ai": "Deterministic AI gives exact, predictable outputs for specific inputs, making it 100% controllable and safe for guardrails.",
    "probabilistic ai": "Probabilistic AI predicts the most likely next word based on statistics (like LLMs). It is flexible, but can hallucinate.",
    "what is a guardrail": "Guardrails are rule-based filters that sanitize user inputs and safety-check AI model outputs.",
    "what is time complexity": "Time complexity measures execution speed. Dictionary lookups take O(1) constant time, making them lightning fast!",
    "why dictionaries": "Dictionaries perform O(1) instant key lookups, avoiding slow O(n) if-elif chains as your data grows.",
    "input sanitization": "Input sanitization cleans raw text (stripping spaces and lowering case) so matching works consistently regardless of user formatting.",

    # --- Help & Guidance ---
    "help": "You can ask me about 'DecodeLabs', 'Project 1', 'Deterministic AI', 'Time Complexity', or type 'topics' to see what I know!",
    "topics": "I know about: Greetings, Bot Identity, DecodeLabs Info, AI Concepts (Deterministic/Probabilistic), Stack Details, and Help Commands.",
    "menu": "Try asking: 'What is DecodeLabs?', 'Explain deterministic AI', 'Why dictionaries?', or 'Project 1'.",

    # --- Fun & Easter Eggs ---
    "tell me a joke": "Why do Python programmers prefer dictionaries over if-elif chains? Because they hate waiting in O(n) lines!",
    "who made you": "I was built by a talented DecodeLabs intern using Python and React!",
    "thank you": "You're very welcome! Let me know if you need anything else.",
    "thanks": "Happy to help! Let's keep building great projects.",

    # --- Farewells & Exit Commands ---
    "bye": "Goodbye! Best of luck with your DecodeLabs internship!",
    "exit": "Session ending... Farewell and happy coding!",
    "quit": "Shutting down the chat session. Have a great day!"
}

DEFAULT_FALLBACK = (
    "I'm not sure I understand that yet. You can ask me about 'DecodeLabs', "
    "'Project 1', 'Deterministic AI', or type 'help' to see what I can do!"
)