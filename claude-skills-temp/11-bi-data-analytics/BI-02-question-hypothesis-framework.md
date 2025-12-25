# BI-02: Business Question & Hypothesis Generation Framework

**Skill ID**: BI-02
**Category**: BI & Data Analytics
**Priority**: 🔴 Critical
**Version**: 1.0
**Last Updated**: 2025-12-02
**Document Type**: Internal Knowledge Base – Methodology

---

## Purpose

Establishes a **universal and repeatable framework** for formulating high-quality business questions and hypotheses that lead to powerful insights. This skill captures how Xyric thinks, analyzes, and extracts insights from any business model — regardless of industry, size, maturity, or data availability.

**Core Principle**: Insight begins before data. We determine what we want to know, then test if the data supports or rejects our hypothesis.

---

## When to Activate

**Automatic Triggers**:
- Beginning any BI or analytics project
- Client discovery phase for dashboard projects
- "Help me understand [business problem]"
- "What questions should we ask about [business]?"
- "Analyze [company/process/metric]"
- Before designing dashboards (pre-BI-01 phase)

**Manual Invocation**:
```
"Use the question & hypothesis framework"
"Apply BI-02 methodology to generate business questions"
"Help me formulate hypotheses for this analysis"
"Structure my thinking using Xyric's insight framework"
```

---

## Core Philosophy: Xyric's Insight Principles

### The Foundational Belief

> Every insight, recommendation, and decision begins with one thing: **The quality of the questions we ask.**

### Three Core Beliefs

#### 1. Insight is Not a Report
```
Report: Tells you what happened
Insight: Tells you why it happened and what to do about it
```

#### 2. Insight Begins Before Data
```
Wrong: Wait for data to "tell us something"
Right: Determine what we want to know, then test with data
```

#### 3. The Right Question > The Right Metric
```
Most companies struggle not because they lack dashboards,
but because they lack clarity on what questions matter.

Insight is 80% thought and 20% SQL.
```

---

## The Xyric Insight Blueprint

This framework contains **5 foundational layers**:

```
Layer 1: Business Understanding (Context)
    ↓
Layer 2: Question Generation (Thinking)
    ↓
Layer 3: Hypothesis Formation (Logic)
    ↓
Layer 4: Segmentation Triggers (Depth)
    ↓
Layer 5: Quality Check (Validation)
```

These layers ensure every question and hypothesis has strategic value, is testable, and can lead to real-world actions.

---

## Layer 1: Business Understanding (The Context Layer)

Before generating questions or hypotheses, gather minimal essential context.

### 1.1 What is the Business Trying to Achieve?

**Typical Objectives:**
- Increase retention
- Reduce churn
- Improve operational efficiency
- Increase revenue / GMV
- Improve user experience
- Reduce manual work
- Optimize supply chain
- Improve sales conversion
- Increase product adoption

**Note**: We do not need deep domain expertise — only the core objectives.

---

### 1.2 Who Are the Key Actors?

**Examples:**
- Customers
- Suppliers
- Projects
- Accounts
- Vendors
- Agents
- Drivers
- Managers
- Branches
- Users & app roles
- Sales teams
- Partners

**Why This Matters**: Questions will focus on how these actors behave and interact.

---

### 1.3 What Are the Key Processes?

**Examples:**
- Order lifecycle
- Project lifecycle
- Loan approval process
- Claim submission
- Activation funnel
- Customer onboarding
- Sales pipeline
- Support ticket flow
- Fulfillment process

**Why This Matters**: Processes contain friction points that generate insights.

---

### 1.4 What Data Exists?

Align initial questions with available data sources:
- Transactional data
- Event logs
- CRM records
- Financial data
- User behavior data
- Time-series data
- Categorical data

**Pragmatic Approach**: Start with what's available, identify gaps later.

---

## Layer 2: Question Generation (The Thinking Layer)

This is the **core of the framework**: How Xyric generates questions that lead to insights.

We use **12 question categories**. Every business can produce powerful insights across these.

---

### Category 1: Performance & Ranking Questions

**Purpose**: Identify top/bottom performers.

**Question Patterns:**
- Who are our top [entities] by [metric]?
- Which [actors] generate the highest [outcome]?
- Which [groups] influence [results] the most?

**Examples:**
```
Who are our top brands, suppliers, customers, or branches?
Which accounts generate the highest GMV?
Which employees or partners influence outcomes the most?
Which projects are most profitable?
Which sales reps close the most deals?
```

**Why This Matters**: Identifies leverage points and outliers worth studying.

---

### Category 2: Behavioral Questions

**Purpose**: Explore how entities actually behave.

**Question Patterns:**
- Do [actors] perform [action] consistently or sporadically?
- How do [entities] respond to [event]?
- What patterns exist in [behavior]?

**Examples:**
```
Do brands order everything or selectively order certain products?
Do users approve orders quickly or delay them?
Do suppliers respond on time?
Do customers reorder at predictable intervals?
Do users complete tasks in one session or multiple?
Do managers review requests immediately or batch them?
```

**Why This Matters**: Behavior reveals efficiency, satisfaction, and friction.

---

### Category 3: Risk & Churn Questions

**Purpose**: Reveal why entities stop using the service.

**Question Patterns:**
- Do [events] lead to higher churn?
- What patterns correlate with [churn/failure]?
- Are [groups] more likely to [stop/fail]?

**Examples:**
```
Do delays in approval lead to higher churn?
Do app usage patterns correlate with churn?
Is churn higher among customers with low platform understanding?
Are multi-branch brands less likely to churn than single-branch brands?
Do projects with unclear requirements fail more often?
Do users who encounter errors early churn faster?
```

**Why This Matters**: Churn prevention has immediate ROI impact.

---

### Category 4: Growth & Adoption Questions

**Purpose**: Measure involvement with the product over time.

**Question Patterns:**
- How does [usage] trend after [event]?
- What [growth] can we expect after [time period]?
- Is there a point where [behavior] stabilizes?

**Examples:**
```
How does ordering trend after activation?
What growth can we expect after 1 month, 3 months, 6 months?
Is there a point where usage stabilizes?
Do users who hit milestone X continue growing?
What defines a "power user" lifecycle?
```

**Why This Matters**: Growth patterns inform retention strategy and forecasting.

---

### Category 5: Efficiency Questions

**Purpose**: Uncover bottlenecks and friction.

**Question Patterns:**
- Which steps slow down [process]?
- Do [differences] impact [speed/efficiency]?
- Where does [process] experience delays?

**Examples:**
```
Which steps slow down the pipeline (approval delays, manager bottlenecks, manual tasks)?
Do mobile/desktop differences impact order time?
Do users take too long to complete a task?
Which part of the sales process creates the longest delays?
Do certain teams process faster than others?
```

**Why This Matters**: Efficiency improvements directly impact user satisfaction and costs.

---

### Category 6: Conversion Funnel Questions

**Purpose**: Identify where entities drop off.

**Question Patterns:**
- Where do [entities] drop off in [funnel]?
- What is the biggest drop between [step A] and [step B]?
- Does [factor] affect [conversion]?

**Examples:**
```
Where do users drop off in the onboarding funnel?
What is the biggest conversion drop?
Does onboarding quality affect conversion?
Do users who skip step X complete step Y?
Which funnel stage has the worst performance?
```

**Why This Matters**: Funnel optimization has multiplicative impact on outcomes.

---

### Category 7: Segmentation Questions

**Purpose**: Understand differences between groups.

**Question Patterns:**
- Do [group A] behave differently from [group B]?
- Are trends different between [segments]?
- Do [categories] behave differently?

**Examples:**
```
Do big brands behave differently from small ones?
Are trends different between cities or markets?
Do certain cuisines/types behave differently?
Do enterprise customers have different patterns than SMBs?
Do new users behave differently than returning users?
```

**Why This Matters**: Segmentation turns generic insights into targeted actions.

---

### Category 8: Operational Quality Questions

**Purpose**: Measure service delivery quality.

**Question Patterns:**
- Are [actors] performing [action] on time?
- Which steps fail most often?
- Does [poor quality] cause [negative outcome]?

**Examples:**
```
Are suppliers approving on time?
Which operational steps fail most often?
Does poor operational performance cause churn?
Do fulfillment delays increase support tickets?
Are SLA breaches correlated with contract cancellations?
```

**Why This Matters**: Operational quality directly impacts retention and reputation.

---

### Category 9: Experience & Satisfaction Questions

**Purpose**: Understand user perception and satisfaction.

**Question Patterns:**
- Does [confusion/misunderstanding] cause [problem]?
- How often do users [indicate satisfaction]?
- Are users satisfied after [milestone]?

**Examples:**
```
Does misunderstanding of the app cause churn?
How often do users complete satisfaction actions?
Are users satisfied after order completion?
Do users who contact support have lower satisfaction?
Do onboarding quality scores predict retention?
```

**Why This Matters**: Satisfaction is a leading indicator of retention.

---

### Category 10: Pricing & Value Questions

**Purpose**: Understand value perception and price sensitivity.

**Question Patterns:**
- Does [pricing] impact [retention/adoption]?
- Do [segments] respond differently to [price]?
- Are certain [categories] more price-sensitive?

**Examples:**
```
Does pricing impact retention?
Do brands that compare prices churn more?
Are certain product categories more price-sensitive?
Do discounts increase long-term retention or just short-term usage?
Does perceived value correlate with pricing tier?
```

**Why This Matters**: Pricing strategy has direct revenue and retention impact.

---

### Category 11: Organizational Impact Questions

**Purpose**: Understand human/team influence on outcomes.

**Question Patterns:**
- Do [team members] influence whether [outcome occurs]?
- Do [roles] with [condition] have [different results]?
- Does [quality of interaction] matter?

**Examples:**
```
Do BDs/AMs influence whether brands stick?
Do AMs with too many accounts have higher churn?
Does onboarding quality matter?
Do sales reps with longer tenure close larger deals?
Does manager approval speed affect team satisfaction?
```

**Why This Matters**: People are often the most important variable.

---

### Category 12: Market & Competition Questions

**Purpose**: Understand external factors and competitive dynamics.

**Question Patterns:**
- Are [customers] using [competitors]?
- How does our [service] compare to [alternatives]?
- What external factors influence [behavior]?

**Examples:**
```
Are brands splitting orders between us and offline suppliers?
How does our service compare to industry alternatives?
Do seasonality or market trends affect usage patterns?
What percentage of wallet share do we capture?
```

**Why This Matters**: Competitive context informs positioning and strategy.

---

## Layer 3: Hypothesis Generation (The Logic Layer)

This is where **Xyric shines**: Converting questions into testable theories.

### 3.1 What is a Good Hypothesis?

A good hypothesis is:
- ✅ **Testable** (can be validated with data)
- ✅ **Predictive** (states expected outcome)
- ✅ **Logical** (has clear reasoning)
- ✅ **Rooted in business understanding** (not random)
- ✅ **Action-driving** (leads to decisions)

---

### 3.2 Xyric Hypothesis Template

```
If [X happens], then we expect [Y outcome] because [Z behavior/logic] drives that pattern.
```

**Components:**
- **X** = Condition or event
- **Y** = Expected outcome
- **Z** = Behavioral or logical explanation

---

### 3.3 Hypothesis Examples (Inspired by Real Business Problems)

#### Example 1: Churn & Operational Speed
**Question**: Do delayed supplier approvals lead to higher churn?

**Hypothesis**:
```
If suppliers take longer than 5-10 minutes to approve orders,
then churn likelihood increases
because users perceive the service as slower and less reliable than calling suppliers directly.
```

**Behavioral Logic**: Speed is the value proposition. Delays break the promise.

---

#### Example 2: Product Selection & Usage
**Question**: Which cuisines are more likely to use the platform?

**Hypothesis**:
```
If certain cuisines (e.g., Arabic, Indian) have high ingredient volatility,
then they place frequent orders
because inventory unpredictability makes them rely on online ordering platforms.
```

**Behavioral Logic**: Pain point (volatility) drives platform dependency.

---

#### Example 3: Onboarding Quality & Retention
**Question**: Does the BD influence whether brands stick?

**Hypothesis**:
```
If BDs give clearer app explanations during onboarding,
then brands have lower churn
because users understand the flow and trust the process.
```

**Behavioral Logic**: Confusion creates abandonment; clarity creates confidence.

---

#### Example 4: Early Behavior & Power Users
**Question**: Which brands become power users?

**Hypothesis**:
```
If brands place 3-5 orders in the first 10 days,
then they are more likely to become long-term users
because early habit formation reduces fallback to manual methods.
```

**Behavioral Logic**: Early adoption creates stickiness through habit.

---

#### Example 5: User Experience & Churn
**Question**: Is app usage time linked to churn?

**Hypothesis**:
```
If users spend too long trying to place an order,
then they are more likely to churn
because they perceive the app as complicated.
```

**Behavioral Logic**: Friction signals poor UX, reducing perceived value.

---

### 3.4 Types of Hypotheses

| Type | Focus | Example |
|------|-------|---------|
| **Behavioral** | User actions and patterns | "Users who do X are more likely to do Y" |
| **Operational** | Process efficiency | "Delays in step X cause problem Y" |
| **Psychological** | Perception and mindset | "Confusion about X leads to abandonment" |
| **Financial** | Revenue and cost drivers | "Price increase of X% reduces retention by Y%" |
| **Process-Driven** | Workflow optimization | "Removing step X improves completion rate" |
| **Market-Driven** | External factors | "Seasonality affects usage by X%" |
| **UX-Driven** | Interface and experience | "Complexity in feature X reduces adoption" |

---

## Layer 4: Segmentation Trigger Layer

**Core Principle**: Segmentation multiplies the insight value.

### 4.1 The Segmentation Question

Every question should ask:

> **"Should this be segmented by [dimension]?"**

**Common Segmentation Dimensions:**
- City / Region / Geography
- Account size (small, medium, large)
- Product type / Category
- Lifecycle stage (new, active, at-risk, churned)
- Manager / BD / AM / Team
- Cuisine / Industry / Vertical
- Frequency (low, medium, high users)
- App usage patterns
- Customer tier (enterprise, SMB, individual)
- Time period (weekday vs weekend, seasonal)

---

### 4.2 Why Segmentation Matters

**Before Segmentation:**
```
"Do delayed approvals cause churn?"
```

**After Segmentation:**
```
"Delayed approvals cause churn mostly in small, single-branch brands,
not large multi-branch ones."
```

**Result**: Actionable insight with targeted intervention strategy.

---

### 4.3 Segmentation Strategy

**Always Ask:**
1. Which groups might behave differently?
2. Which segments matter most to the business?
3. Can we take different actions for different segments?

**If yes to all three** → Segment the analysis.

---

## Layer 5: Quality Check Layer

Before finalizing each Question/Hypothesis, run it through the **Xyric Quality Filter**:

### 5.1 Value Check ✅
```
Question: Does answering this help the business achieve a real objective?

Pass: Directly impacts revenue, retention, efficiency, or satisfaction
Fail: "Interesting" but no clear business value
```

---

### 5.2 Clarity Check ✅
```
Question: Is the question specific enough to test?

Pass: "Do delayed approvals increase churn?"
Fail: "Why aren't customers happy?"
```

---

### 5.3 Testability Check ✅
```
Question: Is the hypothesis measurable with available data?

Pass: Data exists to validate the hypothesis
Fail: Requires data that doesn't exist or is impossible to collect
```

---

### 5.4 Segmentation Check ✅
```
Question: Should we break this into groups?

Pass: Groups likely behave differently, actionable insights per segment
Fail: No meaningful segmentation possible
```

---

### 5.5 Impact Check ✅
```
Question: Will this insight lead to a meaningful decision?

Pass: Clear action can be taken based on the answer
Fail: Interesting fact with no decision attached
```

---

## Question Template

Use this template for every business question:

```markdown
### Question: [Your question here]

**Description**: What we're trying to understand

**Purpose**: Why this matters to the business

**Key Entities**: Who/what is involved (customers, suppliers, processes, etc.)

**Segmentation**: Should this be broken down by [dimensions]?

**Expected Insight**: What decision this will inform
```

---

## Hypothesis Template

Use this template for every hypothesis:

```markdown
### Hypothesis: [If X, then Y because Z]

**Underlying Assumption**: What we believe to be true

**Behavioral Logic**: Why we expect this pattern

**Expected Pattern**: What the data should show if true

**Segmentation**: Which groups to analyze separately

**Action if True**: What we'll do if hypothesis is validated

**Action if False**: What we'll do if hypothesis is rejected
```

---

## Complete Example Workflow

### Business Context
**Client**: Food supply platform (B2B marketplace connecting restaurants with suppliers)
**Objective**: Reduce customer churn
**Key Actors**: Brands (restaurants), Suppliers, Account Managers (AMs)
**Process**: Order placement → Supplier approval → Fulfillment → Receipt confirmation

---

### Step 1: Generate Questions (Using Categories)

**Category 3 (Risk & Churn):**
```
Question: Do delayed supplier approvals increase churn?
```

**Category 7 (Segmentation):**
```
Follow-up: Does this pattern differ between small vs. large brands?
```

---

### Step 2: Formulate Hypothesis

```
Hypothesis:
If suppliers take longer than 5-10 minutes to approve orders,
then churn likelihood increases
because users perceive the service as slower than calling suppliers directly.

Behavioral Logic:
Speed is the core value proposition. The platform promises efficiency.
Delays break that promise and cause users to revert to manual ordering.
```

---

### Step 3: Add Segmentation

```
Segmentation Dimensions:
1. Brand size (small, medium, large)
2. Cuisine type (Arabic, Indian, Italian, etc.)
3. City
4. New vs. experienced users
5. Single-branch vs. multi-branch brands
```

**Refined Hypothesis:**
```
Delayed approvals cause churn more significantly in:
- Small, single-branch brands (less patience, more price-sensitive)
- New users (no established trust yet)
- High-frequency cuisines (need speed for daily operations)
```

---

### Step 4: Quality Check

✅ **Value Check**: Directly impacts churn (primary objective)
✅ **Clarity Check**: Specific, testable question
✅ **Testability Check**: Data available (approval timestamps, churn events)
✅ **Segmentation Check**: Multiple meaningful segments identified
✅ **Impact Check**: Clear action → Prioritize fast approvals for at-risk segments

**Result**: High-quality hypothesis ready for analysis.

---

## How Xyric Analysts Should Think

When approaching any business problem, actively look for:

### 🔍 Look for Friction
- Where do processes slow down?
- Where do users get stuck?
- What causes delays?

### 🔍 Look for Behavior
- How do different groups act?
- What patterns emerge over time?
- What early signals predict outcomes?

### 🔍 Look for Inefficiencies
- Where is manual work happening?
- What steps could be eliminated?
- Where do errors occur?

### 🔍 Look for Differences Between Groups
- Do segments behave differently?
- Which groups are most profitable?
- Which groups need different treatment?

### 🔍 Look for Signals Early in the Lifecycle
- What predicts long-term success?
- What early behaviors correlate with outcomes?
- Can we identify at-risk users earlier?

### 🔍 Look for Operational Dependencies
- What external factors influence outcomes?
- Which teams/people drive results?
- What bottlenecks exist?

### 🔍 Look for Psychological Triggers
- What creates confusion?
- What builds trust?
- What causes frustration?

---

## Integration with Other Skills

### With BI-01 (Dashboard Philosophy)
- **Use BI-02 BEFORE BI-01**: Generate questions and hypotheses first, then design dashboards
- BI-02 defines WHAT to measure, BI-01 defines HOW to display it
- Questions from BI-02 inform the metrics hierarchy in BI-01

### With CLIENT-01 (Proposal Generator)
- Use BI-02 framework during discovery phase
- Include sample questions in proposals to demonstrate strategic thinking
- Show clients how you structure thinking, not just deliver charts

### With CORE-02 (Research-First Workflow)
- BI-02 IS the research methodology for business problems
- Apply BI-02 before data analysis
- Use to structure discovery research

### With RESEARCH-01 (Competitive Analysis)
- Apply Category 12 (Market & Competition) questions to competitive research
- Generate hypotheses about competitor strategies
- Segment competitive landscape using BI-02 framework

### With DEV-01 (Code Review)
- Validate that analytics code tests the right hypotheses
- Ensure segmentation logic is correctly implemented
- Review whether analysis addresses the core question

---

## Anti-Patterns to Avoid

### ❌ Data-First Thinking
```
Wrong: "Let me explore the data and see what I find"
Right: "Let me define what I want to know, then look for evidence"
```

### ❌ Generic Questions
```
Wrong: "Why are customers unhappy?"
Right: "Do delayed approvals increase churn among small brands?"
```

### ❌ Untestable Hypotheses
```
Wrong: "Users probably want a better experience"
Right: "If approval time exceeds 10 minutes, churn increases by X%"
```

### ❌ Analysis Without Purpose
```
Wrong: "Let's analyze everything and see what's interesting"
Right: "Let's test whether X causes Y, then decide what to do"
```

### ❌ Ignoring Segmentation
```
Wrong: "Delayed approvals increase churn" (generic)
Right: "Delayed approvals increase churn in small brands, not large ones" (actionable)
```

### ❌ Skipping the "Why"
```
Wrong: "Churn is high" (report)
Right: "Churn is high because approvals are slow" (insight)
```

### ❌ Questions Without Business Context
```
Wrong: "Which users are most active?" (so what?)
Right: "Which early behaviors predict long-term retention?" (informs onboarding strategy)
```

---

## Best Practices

### ✅ Discovery Phase
- **Do** spend 30-60 minutes understanding business context before generating questions
- **Do** ask "what decisions need to be made?" before "what data exists?"
- **Do** involve business stakeholders in question generation
- **Do** prioritize questions by business impact

### ✅ Question Generation
- **Do** use all 12 categories systematically
- **Do** generate 20-30 questions, then prioritize
- **Do** make questions specific and testable
- **Do** connect each question to a business objective

### ✅ Hypothesis Formation
- **Do** use the "If X, then Y, because Z" template consistently
- **Do** explain the behavioral logic clearly
- **Do** make hypotheses falsifiable
- **Do** state expected patterns explicitly

### ✅ Segmentation
- **Do** default to segmentation unless there's a reason not to
- **Do** choose segments that enable different actions
- **Do** test whether segments behave differently before committing

### ✅ Quality Control
- **Do** run every question through the 5-check quality filter
- **Do** eliminate questions that don't pass all checks
- **Do** refine vague questions until they're specific

---

## Success Criteria

### Framework Application
✅ All BI projects start with BI-02 methodology
✅ Questions generated before data exploration
✅ Hypotheses documented and testable
✅ Segmentation strategy defined upfront

### Question Quality
✅ Questions are specific, not generic
✅ Questions pass all 5 quality checks
✅ Questions connect to business objectives
✅ Questions are prioritized by impact

### Hypothesis Quality
✅ Hypotheses follow "If X, then Y, because Z" template
✅ Behavioral logic is clear and logical
✅ Hypotheses are testable with available data
✅ Expected patterns are explicitly stated

### Business Impact
✅ Insights lead to clear actions
✅ Segmentation enables targeted interventions
✅ Analysis answers the original questions
✅ Decisions are made based on validated hypotheses

---

## Quick Reference: The 12 Question Categories

| # | Category | Focus | Example Question |
|---|----------|-------|------------------|
| 1 | **Performance & Ranking** | Top/bottom performers | "Who are our highest-value customers?" |
| 2 | **Behavioral** | How entities act | "Do users complete tasks quickly or slowly?" |
| 3 | **Risk & Churn** | Why entities leave | "Do delays cause churn?" |
| 4 | **Growth & Adoption** | Usage over time | "How does usage trend after activation?" |
| 5 | **Efficiency** | Bottlenecks and friction | "Which process steps slow things down?" |
| 6 | **Conversion Funnel** | Where drop-offs occur | "Where do users abandon the funnel?" |
| 7 | **Segmentation** | Group differences | "Do small brands behave differently?" |
| 8 | **Operational Quality** | Service delivery | "Are we meeting SLAs?" |
| 9 | **Experience & Satisfaction** | User perception | "Do confused users churn more?" |
| 10 | **Pricing & Value** | Price sensitivity | "Does pricing affect retention?" |
| 11 | **Organizational Impact** | People influence | "Do certain AMs have better retention?" |
| 12 | **Market & Competition** | External factors | "Are customers using competitors?" |

---

## Deliverables of This Framework

Using this methodology, Xyric delivers:

1. **Structured List of Business Questions**
   - Organized by the 12 categories
   - Prioritized by business impact
   - Connected to business objectives

2. **Refined Set of High-Quality Hypotheses**
   - Testable and falsifiable
   - Clear behavioral logic
   - Expected patterns documented

3. **Segmentation Plan**
   - Dimensions identified
   - Rationale for each segment
   - Expected differences stated

4. **Thinking Map for Next Stage**
   - Ready for dashboard design (BI-01)
   - Ready for data analysis
   - Clear path from question → insight → action

---

## Workflow Summary

```
1. UNDERSTAND BUSINESS (Layer 1)
   ↓
   - Objectives
   - Key actors
   - Key processes
   - Available data

2. GENERATE QUESTIONS (Layer 2)
   ↓
   - Apply 12 categories
   - Create 20-30 questions
   - Prioritize by impact

3. FORMULATE HYPOTHESES (Layer 3)
   ↓
   - Use "If X, then Y, because Z" template
   - Explain behavioral logic
   - State expected patterns

4. ADD SEGMENTATION (Layer 4)
   ↓
   - Identify meaningful segments
   - Predict segment differences
   - Plan targeted actions

5. QUALITY CHECK (Layer 5)
   ↓
   - Value check
   - Clarity check
   - Testability check
   - Segmentation check
   - Impact check

6. PROCEED TO ANALYSIS
   ↓
   - Design dashboards (BI-01)
   - Test hypotheses
   - Generate insights
```

---

## Conclusion

This framework is **the foundation of how Xyric creates intelligence from data**.

**Remember:**
- The quality of questions determines the quality of insights
- Insight begins before data
- Hypothesis-driven analysis beats exploratory analysis
- Segmentation turns insights into actions

This is the **pre-analysis phase**. The next phase uses:
- **BI-01** (Dashboard Philosophy) to design the visualization
- **Analytics execution** to test the hypotheses
- **Insight → Action Framework** to convert findings into decisions

---

*Skill BI-02 v1.0 | Xyric Solutions | Question & Hypothesis Framework | 2025-12-02*
