---
name: youtube-summariser
description: Transform YouTube video transcripts into structured analysis documents. Use when user has a transcript (from DOC-OPS-05) and wants a comprehensive analysis. Supports multiple video types (tutorial, review, analysis, interview, news, explainer, comparison, case-study). Auto-detects type or accepts user specification.
license: Proprietary
allowed-tools: Bash,Read,Write
---

# DOC-OPS-06: YouTube Video Summariser

**Skill ID**: DOC-OPS-06
**Category**: Document Operations
**Priority**: 🟡 High
**Version**: 1.0
**Last Updated**: 2025-12-17

---

## Purpose

Transform raw YouTube transcripts into structured, actionable analysis documents tailored to the video type. This skill chains with DOC-OPS-05 (Transcript Downloader) to create a complete video-to-insights pipeline.

---

## When to Activate

**Triggers**:
- "Analyze this video transcript"
- "Summarize this YouTube video"
- "Create analysis document from transcript"
- "What are the key points from this video?"
- User provides transcript text or path
- User wants to understand a video without watching

**Prerequisites**:
- Transcript available (via DOC-OPS-05 or user-provided)
- Video URL (for metadata extraction) - optional but recommended

**Related Skills**:

| Skill | When to Use Together |
|-------|---------------------|
| `DOC-OPS-05` | Upstream - provides transcript |
| `DOC-OPS-07` | Parallel - key points extraction |
| `RESEARCH-01` | Analyzing video for research |
| `CONTENT-01/02` | Repurposing video for social media |

---

## Video Type Detection

### Priority Order

1. **User-Specified**: Accept if user provides type explicitly
2. **Auto-Detect**: Analyze transcript against detection signals
3. **Confirm with User**: "Detected as [type]. Proceed or specify different type?"

### Supported Types

| Type | Template | EverythingAI? |
|------|----------|---------------|
| `tutorial` | Step-by-step breakdown, tools, implementation plan | No |
| `review` | Pros/cons, verdict, comparisons, pricing | Yes |
| `analysis` | Market overview, levels, trade setups (Gareth style) | No |
| `interview` | Key quotes, topics, insights | No |
| `news` | Headlines, implications, timeline | No |
| `explainer` | Concept breakdown, examples | No |
| `comparison` | Head-to-head, winner per category | Yes |
| `case-study` | Problem, solution, results | No |

### Detection Logic

Read the video-types registry for detection signals:
```
CONTENT/_registry/video-types.yaml
```

Analyze first 500 words of transcript for signal matches. The type with most matches wins.

---

## Workflow

### Phase 1: Input Gathering

**Required**:
- Transcript text (plain text or VTT file path)

**Optional but Recommended**:
- Video URL (for metadata extraction)
- User-specified video type
- Channel name (for registry lookup)

### Phase 2: Video Metadata Extraction

If video URL is provided:

```bash
# Extract video metadata
yt-dlp --print "%(title)s|%(channel)s|%(channel_url)s|%(upload_date)s|%(duration)s|%(view_count)s" "VIDEO_URL"
```

Parse output:
- `title` - Video title for document heading
- `channel` - Channel name for attribution
- `channel_url` - For linking
- `upload_date` - For temporal context
- `duration` - For document metadata
- `view_count` - For context

### Phase 3: Video Type Detection

```python
# Pseudo-logic for type detection
def detect_video_type(transcript_text, video_types_registry):
    first_500_words = transcript_text[:2500]  # ~500 words

    type_scores = {}
    for video_type, config in video_types_registry['types'].items():
        score = 0
        for signal in config['detection_signals']:
            if signal.lower() in first_500_words.lower():
                score += 1
        type_scores[video_type] = score

    detected_type = max(type_scores, key=type_scores.get)
    confidence = type_scores[detected_type] / len(video_types_registry['types'][detected_type]['detection_signals'])

    return detected_type, confidence
```

**Confidence Thresholds**:
- High (>50%): Proceed with detected type
- Medium (30-50%): Confirm with user
- Low (<30%): Ask user to specify

### Phase 4: Channel Registry Lookup

Check if channel is in registry:
```
CONTENT/_registry/channel-registry.yaml
```

If found:
- Include credibility score in analysis
- Include bias notes if any
- Flag if sponsored content history

If not found:
- Note: "Channel not in registry"
- Suggest: "Consider adding to registry if this is a frequently-referenced source"

### Phase 5: Analysis Generation

Load the appropriate template:
```
CONTENT/_registry/templates/{type}-analysis.md
```

Generate analysis following template structure:

**For Tutorial**:
1. Quick Summary (2-3 paragraphs)
2. Tools & Technologies Mentioned (table)
3. Step-by-Step Breakdown (numbered with timestamps)
4. Implementation Plan (checklist)
5. Use Cases (table)
6. Full Transcript (collapsible)

**For Review**:
1. Quick Summary
2. Channel Credibility (from registry)
3. Tool Overview (table)
4. Reviewer Verdict
5. Pros/Cons (numbered lists)
6. Comparisons Made (table)
7. Pricing Discussion
8. EverythingAI Data Extract (YAML)
9. Full Transcript (collapsible)

**For Trading Analysis**:
1. Analyst Profile (from registry)
2. Market Overview (sentiment, macro factors)
3. Indices Discussed (SPY, QQQ, etc.)
4. Commodities & Crypto (Gold, Oil, BTC)
5. Specific Stocks Discussed
6. Trade Setups (table)
7. Risk Factors
8. Key Chart Moments (with timestamps)
9. Summary Checklist
10. Full Transcript (collapsible)

### Phase 6: Output & Storage

**File Naming**:
```
[Video-Title-Sanitized]-Analysis.md
```

Sanitization rules:
- Replace spaces with hyphens
- Remove special characters: `? / \ : * " < > |`
- Capitalize each word
- Limit to 50 characters before `-Analysis.md`

**Storage Location**:
```
CONTENT/youtube/{type}/YYYY-MM/[Video-Title]-Analysis.md
```

Create monthly folder if doesn't exist:
```bash
mkdir -p "CONTENT/youtube/{type}/$(date +%Y-%m)"
```

---

## Output Format

### Document Frontmatter

```yaml
---
title: "[Video Title] - Analysis"
video_url: "https://youtube.com/watch?v=..."
channel: "[Channel Name]"
channel_url: "https://youtube.com/@..."
upload_date: "YYYY-MM-DD"
analyzed_date: "YYYY-MM-DD"
duration: "HH:MM:SS"
video_type: "[type]"
channel_in_registry: true|false
channel_credibility: X|null
everythingai_relevant: true|false
tags: ["tag1", "tag2"]
---
```

### Transcript Format

Always include full transcript in collapsible section:

```markdown
## Full Transcript

<details>
<summary>Click to expand full transcript</summary>

[00:00:00] [Transcript text...]

[00:01:30] [Transcript text...]

</details>
```

If VTT file available, preserve timestamps. If plain text only, note timestamps are unavailable.

---

## EverythingAI Integration

**For `review` and `comparison` types only:**

Add EverythingAI Data Extract section with structured YAML:

```yaml
# For aggregation into EverythingAI tool profiles
tool_name: "[Tool]"
tool_category: "[Category]"
tool_url: "[URL]"

reviewer:
  channel_id: "[channel-id]"
  channel_name: "[Channel]"
  credibility_score: [X]

review_data:
  review_date: "YYYY-MM-DD"
  video_url: "[URL]"
  sentiment: "positive|mixed|negative"
  rating: null

  pros:
    - "[Pro 1]"
    - "[Pro 2]"

  cons:
    - "[Con 1]"
    - "[Con 2]"

  use_cases_recommended:
    - "[Use case 1]"

  pricing:
    mentioned: true|false
    verdict: "[assessment]"

  comparisons:
    - tool: "[Tool]"
      verdict: "better|worse|equal"
```

This enables automated aggregation into EverythingAI tool rankings.

---

## Quick Reference Commands

### Extract Metadata
```bash
yt-dlp --print "%(title)s|%(channel)s|%(upload_date)s|%(duration)s" "URL"
```

### Create Output Directory
```bash
mkdir -p "/path/to/wiki/CONTENT/youtube/{type}/$(date +%Y-%m)"
```

### Sanitize Filename
```bash
echo "Video Title: With Special? Characters!" | tr -d '?/:*"<>|' | tr ' ' '-'
```

---

## Integration

| Skill | Relationship |
|-------|--------------|
| DOC-OPS-05 | Upstream - provides transcript input |
| DOC-OPS-07 | Parallel - key points extraction |
| RESEARCH-01 | Can use analyses for competitive research |
| CONTENT-01/02 | Downstream - repurposing for social |

---

## Anti-Patterns

❌ **Do not** summarize without confirming video type
❌ **Do not** skip metadata extraction when URL is available
❌ **Do not** ignore channel registry for credibility context
❌ **Do not** create files outside CONTENT/ folder
❌ **Do not** generate EverythingAI extract for non-review types
❌ **Do not** lose timestamps when they're available

---

## Best Practices

✅ **Always** confirm video type with user when detection confidence is low
✅ **Always** check channel registry for credibility scores
✅ **Always** include full transcript in collapsible section
✅ **Always** use appropriate template for video type
✅ **Always** create proper folder structure before saving
✅ **Always** flag new channels for potential registry addition
✅ **Always** preserve timestamps when available

---

## Error Handling

### No Transcript Available
- Suggest using DOC-OPS-05 to download transcript first
- Offer to chain skills: "Would you like me to download the transcript first?"

### Unknown Video Type
- List available types
- Ask user to specify
- Offer to analyze transcript and suggest most likely type

### Channel Not in Registry
- Note in output document
- Continue with analysis (don't block)
- Suggest adding to registry if relevant

### Missing Video URL
- Can still analyze transcript
- Skip metadata extraction
- Note in output that metadata was unavailable

---

## Complete Workflow Example

```
User: "Analyze this Gareth Soloway video: https://youtube.com/watch?v=xyz"

Claude:
1. Check for transcript
   - Not found locally
   - [DOC-OPS-05] Download transcript

2. Extract metadata
   - Title: "Market Update December 17"
   - Channel: "Verified Investing"
   - Duration: 45:23

3. Detect video type
   - Signals: "support", "resistance", "chart", "bullish", "target"
   - Detected: "analysis" (confidence: 85%)

4. Check channel registry
   - Found: gareth-soloway
   - Credibility: 9/10
   - Style: Technical

5. Load template
   - CONTENT/_registry/templates/trading-analysis.md

6. Generate analysis
   - Market Overview
   - Indices (SPY, QQQ)
   - Commodities (Gold, Oil)
   - Crypto (BTC)
   - Stocks mentioned
   - Trade setups table
   - Key chart moments

7. Save output
   - CONTENT/youtube/analysis/2025-12/Market-Update-December-17-Analysis.md

8. Confirm with user
   - "Analysis saved to: [path]"
   - "Found 5 trade setups, 3 stocks to watch"
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-17 | Initial release |

---

**Skill DOC-OPS-06 v1.0 | Document Operations | 2025-12-17**
