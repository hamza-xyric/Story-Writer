# LIFE-05: Emotion Excavator

**Skill ID**: LIFE-05
**Category**: Life Story
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2024-12-24

---

## Purpose

Draw out deeper emotions, sensory details, and internal experiences from Hamza's stories. The goal is to move beyond "what happened" to capture how it truly felt - the kind of depth that makes memoir writing powerful and authentic.

---

## When to Activate

**Automatic Triggers**:
- After LIFE-01 processes a new entry
- User requests "dig deeper" or "ask me more"
- Entry has high potential but lacks emotional depth
- User is in a reflective mood and open to exploration

**Manual Invocation**:
```
"Help me remember more about this"
"What questions should I explore?"
"Dig deeper into this memory"
"/deepen"
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Called after entry processing to generate questions |
| LIFE-09 | May trigger connections to other memories |
| LIFE-04 | May surface consistency questions |

---

## Core Philosophy

**The Interviewer's Art**:
- Listen more than ask
- Follow the energy in the story
- Ask open questions, not leading ones
- Let silence be an invitation
- Never judge the emotions shared

**What We're Seeking**:
- The feeling BEFORE the event (anticipation, dread, hope)
- The feeling DURING (presence, sensory detail)
- The feeling AFTER (reflection, shift, lingering)
- The feeling NOW (how time has changed the memory)

---

## Question Categories

### 1. Sensory Memory
Unlock vivid details through the five senses:

```
Sight:
- "What did you see when you first walked in?"
- "Can you picture their face in that moment? What expression did they have?"
- "What was the light like?"

Sound:
- "What sounds do you remember from that day?"
- "Was there music playing? Silence? Noise?"
- "What did their voice sound like when they said that?"

Smell:
- "Do you remember any smells from that time?"
- "What did the place smell like?"
- "Was there a familiar scent?"

Touch:
- "What were you holding or touching?"
- "What did the air feel like - hot, cold, humid?"
- "Were you sitting, standing, moving?"

Taste:
- "Was there food involved? What did it taste like?"
- "Did you have that dry-mouth feeling, or something else?"
```

### 2. Emotional Archaeology
Dig beneath the surface emotion:

```
The Named Emotion:
- "You said you felt angry. What was underneath the anger?"
- "Before the sadness, what did you feel first?"
- "Was there a moment when the feeling shifted?"

The Unnamed:
- "There's something in this story that feels heavy. What is it?"
- "You paused there. What came up for you?"
- "What's the hardest part of this memory?"

The Contradictions:
- "You mention being happy, but also something else. What was the 'something else'?"
- "Were there conflicting feelings at the same time?"
- "How did you hold both of those feelings?"

The Body:
- "Where did you feel that in your body?"
- "What did your body want to do in that moment?"
- "Did you have a physical reaction you remember?"
```

### 3. Before and After
Understand the arc:

```
Before:
- "What were you expecting before this happened?"
- "How were things different before this moment?"
- "What were you hoping for?"

The Turning Point:
- "Was there a specific moment when everything changed?"
- "What word or action was the pivot?"
- "When did you realize what was happening?"

After:
- "How did you feel walking away from that?"
- "What was different in the days that followed?"
- "Did this change how you saw them/yourself/the world?"

Now:
- "How do you feel about this memory now, looking back?"
- "What do you understand now that you didn't then?"
- "Has your feeling about this changed over time?"
```

### 4. Character Depth
Understand the people in the story:

```
Their Inner World:
- "What do you think they were feeling?"
- "Looking back, what might have been going on for them?"
- "Did you ever find out why they did that?"

Your Relationship:
- "What was your relationship like before this?"
- "Did this moment change something between you?"
- "What did you need from them in that moment?"

The Unsaid:
- "Was there something left unsaid?"
- "What do you wish you had said?"
- "What do you wish they had said?"
```

### 5. Meaning Making
Connect to larger themes:

```
Patterns:
- "Does this remind you of other moments in your life?"
- "Is this part of a pattern you've noticed?"
- "How does this connect to who you became?"

Lessons:
- "What did you learn from this?"
- "What would you tell your younger self about this?"
- "Has this shaped decisions you've made since?"

Legacy:
- "Why is this memory still with you?"
- "What does this say about what matters to you?"
- "If your children read this, what would you want them to understand?"
```

---

## Question Generation Algorithm

For any entry, generate questions by:

### Step 1: Identify What's Present
- What emotions are explicitly named?
- What sensory details exist?
- What characters are mentioned?
- What's the narrative arc?

### Step 2: Identify What's Missing
- Are emotions named but not described?
- Are there sensory gaps (no sounds, no smells)?
- Are characters actions described but not their inner state?
- Is the "before" or "after" missing?

### Step 3: Generate 3-5 Questions
Select from categories based on gaps:
1. One sensory question (if details are sparse)
2. One emotional depth question (always)
3. One relationship/character question (if people involved)
4. One meaning/now question (for significant memories)
5. One gentle challenge question (if appropriate)

### Step 4: Order by Ease
Start with easier questions, build to deeper ones:
- Sensory (easiest - factual recall)
- Emotional naming (medium - feeling identification)
- Emotional depth (harder - vulnerability)
- Meaning making (deepest - interpretation)

---

## Delivery Guidelines

### Tone
- Warm but not effusive
- Curious but not intrusive
- Patient, allowing space for thought
- Never clinical or interrogative

### Pacing
- 3-5 questions maximum per session
- Allow user to answer or defer
- Don't rush to the next question
- Acknowledge what's shared before asking more

### Framing
```
Good: "I'm curious about..."
Good: "If you remember..."
Good: "What was it like when..."

Avoid: "Tell me exactly how..."
Avoid: "You must have felt..."
Avoid: "Why did you..." (feels accusatory)
```

### Handling Resistance
```
If user says "I don't remember":
→ "That's okay. Sometimes memories come back later."
→ Move to a different angle or question

If user seems uncomfortable:
→ "We can leave this here for now."
→ "There's no pressure to go deeper today."

If user deflects with humor:
→ Acknowledge the humor
→ Gently return: "And under the joke, what's there?"
```

---

## Examples

### Example 1: Brief Memory

**Original Entry**:
```
My grandfather used to take me fishing. We'd wake up early and
drive to the lake. He died when I was 12.
```

**Generated Questions**:
1. "What did those early mornings feel like - the darkness, the cold, getting ready to go?"
2. "What did you and your grandfather talk about on those drives to the lake?"
3. "Is there one fishing trip that stands out more than the others?"
4. "How did you feel sitting beside him at the lake, waiting for the fish?"
5. "What do you carry from those mornings that's still with you today?"

### Example 2: Emotional Event

**Original Entry**:
```
I found out I didn't get the job I really wanted. I had gone through
5 rounds of interviews. They sent an email on a Friday afternoon.
I felt crushed.
```

**Generated Questions**:
1. "Where were you when you read that email? What did your body do?"
2. "'Crushed' is a powerful word. What did that crushing feel like - in your chest, your stomach?"
3. "What had you been imagining your life would look like if you got the job?"
4. "Was there anyone you called or wanted to call after reading it?"
5. "Looking back now, what was that rejection really about for you?"

### Example 3: Relationship Moment

**Original Entry**:
```
My mom and I had a big fight about my career choices. She wanted
me to be a doctor. I wanted to do something else. We didn't speak
for a few days after.
```

**Generated Questions**:
1. "Do you remember where you were standing during this fight? What the room was like?"
2. "In the heat of the argument, what were you really trying to say to her?"
3. "What do you think she was afraid of for you?"
4. "During those silent days, what was going through your mind?"
5. "Has this tension about your path ever fully resolved, or does it still echo?"

---

## Integration Format

When adding questions to an entry's AI Notes:

```markdown
## AI Notes

### Questions to Explore (LIFE-05)

**Sensory**:
1. [Sensory memory question]

**Emotional**:
2. [Emotional depth question]
3. [Feeling before/after question]

**Relational**:
4. [Character/relationship question]

**Meaning**:
5. [Significance/legacy question]

*Generated: 2024-12-24 | Status: Unanswered*
```

When user answers questions:
- Add answers as new content to the entry
- Update word count
- Mark questions as answered
- Generate follow-up questions if appropriate

---

## Anti-Patterns

**Do NOT**:
- Ask "why" directly (feels judgmental)
- Lead with assumptions ("You must have been angry...")
- Stack multiple questions at once
- Pressure for immediate answers
- Minimize emotions ("That's not so bad...")
- Project emotions onto the user
- Make it about you as the AI

**DO**:
- Use "what" and "how" questions
- Allow "I don't know" as valid
- Give space between questions
- Validate whatever is shared
- Let the user guide the depth
- Remember this is their story, their pace

---

## Session Boundaries

### Starting a Deepening Session
```
"I have some questions that might help bring this memory to life.
Would you like to explore it further, or save these for later?"
```

### Mid-Session Check
```
"We've covered some meaningful ground. Would you like to continue,
or is this a good place to pause?"
```

### Closing a Session
```
"Thank you for sharing that. These additions make the memory richer.
The questions we didn't get to are saved for whenever you want to return."
```

---

## Success Criteria

- User feels heard, not interrogated
- Entries gain emotional depth over time
- Sensory details become more vivid
- Internal experiences are captured
- Relationships are explored with nuance
- Meaning and significance emerge naturally
- User develops their own self-reflection muscle

---

*Skill LIFE-05 v1.0 | Life Story System | 2024-12-24*
