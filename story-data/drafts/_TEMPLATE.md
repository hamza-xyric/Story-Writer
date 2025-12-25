---
# DRAFT TEMPLATE
# Drafts are raw captures that haven't been processed into entries yet

draft_id: D-YYYY-NNN
capture_type: freeform | conversation | voice | freeform-session | voice-conversation
captured_at: YYYY-MM-DDTHH:MM:SS
session_id: null                      # Set if multiple captures in same session
source: freeform | biographer | voice-transcript
status: raw | in_progress | processed
word_count: 0

# === FOR CONVERSATIONS ===
conversation_state:
  topic: ""
  starting_question: ""
  questions_asked: 0
  estimated_time_period: ""
  characters_mentioned: []
  locations_mentioned: []
  emotional_tone: ""
  tangents_noted: []

# === FOR VOICE ===
transcription_tool: ""                # whisper | macos-dictation | otter | other
original_audio_file: ""               # Optional reference to source file
cleanup_level: raw | light | processed
speaking_duration_estimate: ""

# === FOR SESSIONS (multiple fragments) ===
fragments:
  - timestamp: ""
    word_count: 0

# === AFTER PROCESSING ===
processed_at: null
resulting_entries: []
---

[Content goes here - exactly as captured, no modifications]

---

*Captured: YYYY-MM-DD HH:MM | Mode: [mode] | Status: [status]*
