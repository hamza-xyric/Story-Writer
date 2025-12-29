import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env.js';
import type { VoiceProfile } from '../types/index.js';
import type { Tool, MessageParam, ContentBlock } from '@anthropic-ai/sdk/resources/messages.js';

const client = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

// Tool definitions for Claude
export const freeformTools: Tool[] = [
  {
    name: 'save_draft',
    description: 'Save raw capture (freeform, voice, conversation) as a draft. Call this when user finishes sharing their content.',
    input_schema: {
      type: 'object' as const,
      properties: {
        content: {
          type: 'string',
          description: 'The raw user content exactly as they wrote it',
        },
        capture_type: {
          type: 'string',
          enum: ['freeform', 'conversation', 'voice', 'journal'],
          description: 'The type of capture',
        },
        topic: {
          type: 'string',
          description: 'Optional topic tag if detected',
        },
        word_count: {
          type: 'number',
          description: 'Number of words in the content',
        },
      },
      required: ['content', 'capture_type', 'word_count'],
    },
  },
];

export const biographerTools: Tool[] = [
  {
    name: 'save_draft',
    description: 'Save the conversation as a draft for later processing. Call when user wants to stop, save, or the conversation reaches a natural conclusion.',
    input_schema: {
      type: 'object' as const,
      properties: {
        content: {
          type: 'string',
          description: 'The formatted conversation content',
        },
        capture_type: {
          type: 'string',
          enum: ['conversation'],
          description: 'Always "conversation" for biographer sessions',
        },
        topic: {
          type: 'string',
          description: 'The main topic that emerged from the conversation',
        },
        word_count: {
          type: 'number',
          description: 'Number of words in the content',
        },
      },
      required: ['content', 'capture_type', 'word_count'],
    },
  },
  {
    name: 'read_leads',
    description: 'Get unexplored story leads to suggest to the user as conversation starters.',
    input_schema: {
      type: 'object' as const,
      properties: {
        status: {
          type: 'string',
          enum: ['unexplored', 'questioned', 'captured', 'dismissed'],
          description: 'Filter by lead status. Default: unexplored',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of leads to return. Default: 3',
        },
      },
      required: [],
    },
  },
  {
    name: 'update_lead',
    description: 'Update a lead status after exploring it in conversation.',
    input_schema: {
      type: 'object' as const,
      properties: {
        lead_id: {
          type: 'string',
          description: 'The lead ID (e.g., L-2025-001)',
        },
        status: {
          type: 'string',
          enum: ['unexplored', 'questioned', 'captured', 'dismissed'],
          description: 'New status for the lead',
        },
        captured_in: {
          type: 'string',
          description: 'Entry ID if the lead was captured into an entry',
        },
        notes: {
          type: 'string',
          description: 'Notes about the exploration',
        },
      },
      required: ['lead_id', 'status'],
    },
  },
];

// Legacy export for backward compatibility
export const tools = freeformTools;

// Build the freeform capture system prompt
export function buildFreeformPrompt(voiceProfile?: VoiceProfile): string {
  const profileContext = voiceProfile
    ? `
## User Voice Profile
Name: ${voiceProfile.preferredName}
Writing Style: ${voiceProfile.writingStyle.tone}
Preferences: ${voiceProfile.preferences.deepeningStyle}
`
    : '';

  return `You are a patient, silent listener helping someone capture their life story.

## FREEFORM CAPTURE MODE

You are in freeform capture mode. Your job is simple:
1. Receive their words in silence
2. Save exactly what they write
3. Preserve their voice perfectly

## CRITICAL RULES

**DO NOT:**
- Ask clarifying questions
- Suggest improvements or additions
- Add structure or formatting
- Extract metadata or dates
- Offer to expand or clarify
- Process or organize content
- Add any commentary on their words

**DO:**
- Receive in complete silence while they write
- Acknowledge with just word count when done
- Save their words exactly as written
- Respect messy grammar and fragments
- Preserve line breaks and formatting

## INTERACTION PATTERN

When user starts: Say "Go ahead. I'm just listening - no questions, no processing."

During capture: Say NOTHING. Let them write.

When user signals done (says "done", "that's it", "okay", stops writing):
1. Call the save_draft tool with their content
2. Respond: "Captured. [X] words saved as a draft.

   When you're ready, I can:
   - Add more to this
   - Process it into a story entry
   - Leave it raw for now

   No rush."

${profileContext}

Remember: The blank page should feel like a trusted notebook, not a form.`;
}

// Build the processing prompt (for future use)
export function buildProcessingPrompt(voiceProfile?: VoiceProfile): string {
  const profileContext = voiceProfile
    ? `
## User Voice Profile
Name: ${voiceProfile.preferredName}
Writing Style: ${voiceProfile.writingStyle.tone}
Signature Phrases: ${voiceProfile.vocabularyPatterns.signaturePhrases.join(', ')}
Sensory Tendencies: Visual ${voiceProfile.sensoryTendencies.visual}, Auditory ${voiceProfile.sensoryTendencies.auditory}, Conceptual ${voiceProfile.sensoryTendencies.conceptualEmotional}
`
    : '';

  return `You are a patient biographer helping someone capture their life story.

## ENTRY PROCESSING MODE

You are processing a raw draft into a structured story entry.

Your job:
1. Extract metadata (time period, characters, locations, themes, emotions)
2. Preserve the original voice exactly
3. Generate deepening questions for future exploration
4. Detect domains (dreams, trading, problems) for specialized questions

${profileContext}

Never rewrite their words. Organize and structure, don't edit.`;
}

export interface ClaudeResponse {
  text: string;
  toolCalls: Array<{
    name: string;
    input: Record<string, unknown>;
  }>;
  stopReason: string;
}

// Call Claude with tool use
export async function callClaude(
  systemPrompt: string,
  messages: MessageParam[],
  enableTools: Tool[] | boolean = true
): Promise<ClaudeResponse> {
  const toolsToUse = Array.isArray(enableTools)
    ? enableTools
    : enableTools
      ? freeformTools
      : undefined;

  const response = await client.messages.create({
    model: env.CLAUDE_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages,
    tools: toolsToUse,
  });

  // Extract text and tool calls from response
  let text = '';
  const toolCalls: Array<{ name: string; input: Record<string, unknown> }> = [];

  for (const block of response.content) {
    if (block.type === 'text') {
      text += block.text;
    } else if (block.type === 'tool_use') {
      toolCalls.push({
        name: block.name,
        input: block.input as Record<string, unknown>,
      });
    }
  }

  return {
    text,
    toolCalls,
    stopReason: response.stop_reason ?? 'unknown',
  };
}

// Handle freeform capture conversation
export async function handleFreeformCapture(
  userContent: string,
  voiceProfile?: VoiceProfile,
  isStart = false
): Promise<ClaudeResponse> {
  const systemPrompt = buildFreeformPrompt(voiceProfile);

  const messages: MessageParam[] = [];

  if (isStart) {
    // First message - just the start signal
    messages.push({
      role: 'user',
      content: 'I want to write something down.',
    });
    messages.push({
      role: 'assistant',
      content: "Go ahead. I'm just listening - no questions, no processing.",
    });
  }

  // User's actual content
  messages.push({
    role: 'user',
    content: userContent,
  });

  return callClaude(systemPrompt, messages);
}

// Handle biographer conversation
export async function handleBiographerConversation(
  systemPrompt: string,
  conversationHistory: MessageParam[],
  userMessage: string
): Promise<ClaudeResponse> {
  const messages: MessageParam[] = [
    ...conversationHistory,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  return callClaude(systemPrompt, messages, biographerTools);
}
