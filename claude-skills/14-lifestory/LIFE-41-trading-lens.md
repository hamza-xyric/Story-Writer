# LIFE-41: Trading Lens

**Skill ID**: LIFE-41
**Category**: Domain Lens
**Priority**: Standard
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Detect trading-related content in entries and journals, then contribute domain-specific questions that explore emotional patterns, decision-making processes, and lessons from market experiences.

---

## When to Activate

**Triggered by**: LIFE-01 (Entry Processor) during domain detection phase

**Detection signals** (case-insensitive):

Keywords:
- trade, trading, traded, trader
- market, markets
- position, positions
- profit, loss, P&L, PnL
- entry, exit, stop loss, stop-loss, take profit
- chart, charts, candle, candles
- stock, stocks, ticker
- options, calls, puts
- futures, forex, crypto
- long, short (in trading context)
- win, loss, green, red (in trading context)

Casual Keywords (often missed):
- "my trading" (e.g., "my trading was going well")
- "trades" (plural mention)
- "portfolio"
- "investment", "investing"
- "made money", "lost money" (general context)

Phrases:
- "took a trade"
- "entered a position"
- "got stopped out"
- "hit my target"
- "blew up"
- "made money" / "lost money" (market context)
- "trading was going well/badly"
- "trading is..."
- "on the charts"

---

## Processing Workflow

### Phase 1: Confirm Detection

Verify trading content is substantial:
- Not just a casual mention
- Actual trading experience or reflection
- Enough context to warrant exploration

If false positive (e.g., "trade-off" or "traded jokes"), do not add domain tag.

### Phase 2: Analyze Trading Content

Identify what's present in the description:
- **Outcome**: Win, loss, breakeven, or uncertain
- **Emotional state**: Before, during, after
- **Decision type**: Planned vs impulsive
- **Rules adherence**: Followed system or deviated
- **Learning**: Explicit lessons mentioned
- **Time context**: Specific trade or general reflection

### Phase 3: Select Questions

From the question bank, select 2-3 most relevant questions based on content.

**Question Bank:**

| Category | Questions |
|----------|-----------|
| Pre-trade | What was your emotional state before entering? |
| Pre-trade | Were you following your plan or reacting to the market? |
| Pre-trade | Was this a planned trade or impulsive? |
| During | How did you feel while in the position? |
| During | Did you stick to your rules or adjust on the fly? |
| During | What was going through your mind? |
| Post-trade | How did you feel after the outcome? |
| Post-trade | What would you do differently? |
| Post-trade | What lesson can you take from this? |
| Patterns | Is this similar to trades you've made before? |
| Patterns | Do you notice any emotional patterns in your trading? |
| Patterns | Are there conditions where you trade better or worse? |
| Discipline | Did you follow your trading rules? |
| Discipline | If you deviated, what made you? |
| Discipline | How can you reinforce discipline next time? |
| Big picture | How does this trade fit into your overall journey? |
| Big picture | What does this experience teach you about yourself? |
| Big picture | Is trading serving your larger goals? |

**Selection criteria:**
- If loss mentioned → include Post-trade reflection
- If win mentioned → include Patterns or Big picture
- If emotional language → include emotional state questions
- If mentions deviation → include Discipline question
- If general reflection → include Big picture question

### Phase 4: Return Questions

Return selected questions to LIFE-01 for merging into "Questions to Explore".

Format:
```yaml
lens: trading
questions:
  - "What was your emotional state before entering?"
  - "Did you follow your trading rules?"
  - "What lesson can you take from this?"
```

---

## Output Integration

Questions are added to entry under "Questions to Explore" with domain context:

```markdown
### Questions to Explore

**From your trading experience:**
- What was your emotional state before entering?
- Did you follow your trading rules?
- What lesson can you take from this?
```

---

## Entry Metadata

When this lens matches, add to entry frontmatter:

```yaml
domains:
  - trading
```

---

## Examples

### Example 1: Loss Trade

**Input:**
> "Got stopped out on that NVDA trade. Entered on emotion after seeing it spike. Knew I shouldn't have but did it anyway."

**Analysis:**
- Outcome: Loss (stopped out)
- Decision: Impulsive ("entered on emotion")
- Self-awareness: Present ("knew I shouldn't have")
- Rule adherence: Deviated

**Selected Questions:**
1. "What was your emotional state before entering?"
2. "What made you deviate from your rules?"
3. "What lesson can you take from this?"

### Example 2: Winning Trade

**Input:**
> "Finally hit my target on the swing trade I've been holding. Feels good to see the plan work out."

**Analysis:**
- Outcome: Win
- Decision: Planned ("swing trade", "the plan")
- Emotion: Positive, vindicated

**Selected Questions:**
1. "What conditions made this trade work?"
2. "Is there a pattern you can replicate?"
3. "How does this fit into your overall trading journey?"

### Example 3: Reflection

**Input:**
> "Been thinking about my trading lately. Feel like I'm stuck in a cycle of overtrading when I'm frustrated."

**Analysis:**
- No specific trade
- Pattern recognition: Overtrading when frustrated
- Self-reflection mode

**Selected Questions:**
1. "What triggers the frustration that leads to overtrading?"
2. "Have you noticed what breaks this cycle?"
3. "Is trading serving your larger goals right now?"

### Example 4: False Positive (Skip)

**Input:**
> "Had to make a trade-off between the gym and meeting Sarah for coffee."

**Analysis:**
- "Trade-off" is not trading context
- No market/financial content

**Action:** Do not activate lens, do not add domain tag.

---

## Anti-Patterns

**Do NOT:**
- Add all questions from the bank (select 2-3 max)
- Judge the trading decision
- Offer trading advice
- Focus only on outcomes (process matters more)
- Make profitable trades seem less worth exploring

**DO:**
- Explore emotional patterns regardless of outcome
- Treat losses as learning opportunities, not failures
- Ask about process, not just results
- Respect trading as part of their identity journey

---

## Philosophy

Trading isn't just about money—it's a mirror for emotions, discipline, and self-knowledge. Wins and losses are both teachers. This lens invites reflection on the person behind the trades, not just the P&L.

---

*Skill LIFE-41 v1.0 | Domain Lens System | 2024-12-27*
