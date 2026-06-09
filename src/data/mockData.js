// Simplified mock data using clear, short sentences and simple words.

export const mockEvidence = [
  {
    id: "journal-1",
    type: "journal",
    title: "New role as lead",
    date: "2026-03-05",
    content: "First week leading the design team. A bit busy, but I kept my mornings free. Planning my day before opening Slack helps me stay calm and make good choices.",
    metadata: "Self-logged · 35 words · Mood: Calm"
  },
  {
    id: "voice-1",
    type: "voice-note",
    title: "Voice Memo: Team meeting thoughts",
    date: "2026-03-12",
    content: "Transcript: 'Finished the team sync. I spoke well but paused when asked about the launch date. I should trust my team's speed estimates more. I feel good now, but I need some quiet time later to avoid getting tired.'",
    metadata: "Voice Note · 45s · Vocal stability: 92%"
  },
  {
    id: "calendar-1",
    type: "calendar",
    title: "Technical Roadmap Sync",
    date: "2026-03-18",
    content: "Team meeting to plan upcoming features. Sorted out database choices in 20 minutes.",
    metadata: "Calendar · 45 mins · 8 people"
  },
  {
    id: "reflection-1",
    type: "reflection",
    title: "Weekly Review: Week 11",
    date: "2026-03-22",
    content: "Your choices are getting better. You did 2.5 hours of quiet work daily. You slept well and did not get too tired.",
    metadata: "Weekly Review"
  },
  {
    id: "journal-2",
    type: "journal",
    title: "Working late",
    date: "2026-04-02",
    content: "Worked until 2 AM fixing code. Felt tired and annoyed in the morning meeting. Made a bad choice about the project schedule and had to change it. Lesson learned: sleep matters.",
    metadata: "Self-logged · 38 words · Mood: Tired"
  },
  {
    id: "voice-2",
    type: "voice-note",
    title: "Voice Memo: Coding at night",
    date: "2026-04-03",
    content: "Transcript: 'It is 1:30 AM. Fixed the layout bug. I sound very tired and my speech is slow. I need to stop working this late.'",
    metadata: "Voice Note · 50s · Vocal stability: 71%"
  },
  {
    id: "calendar-2",
    type: "calendar",
    title: "Project Retrospective",
    date: "2026-04-10",
    content: "Talked about the new release and sorted out arguments on the team.",
    metadata: "Calendar · 60 mins · 12 people"
  },
  {
    id: "reflection-2",
    type: "reflection",
    title: "Weekly Review: Week 15",
    date: "2026-04-14",
    content: "A busy week. You learned a lot, but felt stressed and tired from working late nights.",
    metadata: "Weekly Review"
  },
  {
    id: "journal-3",
    type: "journal",
    title: "Started running",
    date: "2026-05-02",
    content: "Ran 4km at 6:30 AM. Felt very clear-headed. Solved team issues easily today. Exercise definitely helps my mood.",
    metadata: "Self-logged · 25 words · Mood: Good"
  },
  {
    id: "voice-3",
    type: "voice-note",
    title: "Voice Memo: Morning walk",
    date: "2026-05-10",
    content: "Transcript: 'Running helps me. I have more energy and patience in meetings. I also listen to audiobooks while I run, which makes learning easy.'",
    metadata: "Voice Note · 1m · Vocal stability: 95%"
  },
  {
    id: "calendar-3",
    type: "calendar",
    title: "Coding Workshop",
    date: "2026-05-15",
    content: "Showed 6 coders how to build interactive interface elements.",
    metadata: "Calendar · 90 mins · 7 people"
  },
  {
    id: "reflection-3",
    type: "reflection",
    title: "Weekly Review: Week 20",
    date: "2026-05-20",
    content: "All scores look great. You learned a lot while running, and your mood is very steady.",
    metadata: "Weekly Review"
  },
  {
    id: "journal-4",
    type: "journal",
    title: "No-meeting day",
    date: "2026-05-25",
    content: "Blocked out Wednesday for quiet work. Muted Slack and had no meetings. Finished a new prototype. Had great focus today.",
    metadata: "Self-logged · 25 words · Mood: Focused"
  },
  {
    id: "voice-4",
    type: "voice-note",
    title: "Voice Memo: Quiet Wednesday review",
    date: "2026-05-26",
    content: "Transcript: 'Quiet Wednesday worked. Had 5 hours of clean coding time. Felt focused and confident about my design decisions.'",
    metadata: "Voice Note · 45s · Vocal stability: 89%"
  },
  {
    id: "calendar-4",
    type: "calendar",
    title: "Mentorship & Catch-ups",
    date: "2026-06-02",
    content: "One-on-one catch-ups with 3 team members to help with their training.",
    metadata: "Calendar · 30 mins each · 3 sessions"
  },
  {
    id: "reflection-4",
    type: "reflection",
    title: "Weekly Review: Week 23",
    date: "2026-06-08",
    content: "Quiet Wednesdays helped boost your focus score by 18%. Your choice rating is steady.",
    metadata: "Weekly Review"
  }
];

export const mockMetrics = [
  {
    id: "decision-confidence",
    name: "Decision Confidence",
    value: 88,
    change: "+6%",
    status: "optimal",
    confidence: 94,
    sourcesCount: 22,
    observation: "You are making choices faster. You are most confident during your morning work hours.",
    summary: "Created from morning journals, voice notes, and meeting times.",
    reasoning: [
      "Writing down goals in the morning helps you make better choices.",
      "Working late at night makes your choice speed 22% slower the next day.",
      "Your voice sounds calm and steady during team roadmap reviews."
    ],
    uncertainty: "We have less data on weekends, so weekend scores are less precise.",
    history: "This score went up in March when you became a team lead and stopped checking emails first thing in the morning.",
    trend: [
      { date: "W1", value: 78 },
      { date: "W2", value: 80 },
      { date: "W3", value: 79 },
      { date: "W4", value: 83 },
      { date: "W5", value: 85 },
      { date: "W6", value: 88 }
    ],
    sources: ["journal-1", "voice-1", "calendar-1", "reflection-1", "journal-2"]
  },
  {
    id: "social-energy",
    name: "Social Energy",
    value: 65,
    change: "-4%",
    status: "neutral",
    confidence: 89,
    sourcesCount: 18,
    observation: "You are doing well, but you get tired on days with more than 4 hours of meetings.",
    summary: "Looks at meeting length on your calendar and your voice tone after work.",
    reasoning: [
      "Having 5 meetings on Tuesdays makes your voice sound tired in evening logs.",
      "You feel good in small work groups but get tired in large team calls.",
      "Resting quietly on weekends refills your energy 35% faster than going out."
    ],
    uncertainty: "We only know meeting lengths, not how active you were in them.",
    history: "Your social energy went down during busy launch weeks in April and has recovered since then.",
    trend: [
      { date: "W1", value: 75 },
      { date: "W2", value: 72 },
      { date: "W3", value: 68 },
      { date: "W4", value: 60 },
      { date: "W5", value: 62 },
      { date: "W6", value: 65 }
    ],
    sources: ["voice-1", "calendar-1", "calendar-2", "voice-3", "calendar-4"]
  },
  {
    id: "learning-consistency",
    name: "Learning Consistency",
    value: 82,
    change: "+9%",
    status: "optimal",
    confidence: 91,
    sourcesCount: 26,
    observation: "You now learn in small daily habits instead of long late-night sessions.",
    summary: "Based on audiobooks listened to, workshop preparation, and coding logs.",
    reasoning: [
      "Your new running habit gives you 4.5 hours of audiobook listening time every week.",
      "Preparing for workshops helps you remember new coding concepts better.",
      "Late-night research logs show you forget details the next day."
    ],
    uncertainty: "Audiobook tracking relies on your run logs, which are manually entered.",
    history: "Changed in May from long weekend study sessions to daily audiobook chapters while exercising.",
    trend: [
      { date: "W1", value: 68 },
      { date: "W2", value: 70 },
      { date: "W3", value: 74 },
      { date: "W4", value: 75 },
      { date: "W5", value: 78 },
      { date: "W6", value: 82 }
    ],
    sources: ["journal-2", "voice-2", "voice-3", "calendar-3", "reflection-3"]
  },
  {
    id: "emotional-stability",
    name: "Emotional Stability",
    value: 78,
    change: "+12%",
    status: "optimal",
    confidence: 88,
    sourcesCount: 15,
    observation: "Your mood is steady, and you are recovering faster from stressful deadlines.",
    summary: "Compares your sleep duration with stress words used in your journals.",
    reasoning: [
      "Running days show a 15% drop in stress keywords in your diary entries.",
      "Getting 7 hours of sleep protects your mood during busy workdays.",
      "Your voice logs show a steady and calm tone during stressful launch phases."
    ],
    uncertainty: "We do not track physical health signs like heart rate, only journal text and voice logs.",
    history: "Mood was bumpy during the April launch stress but became steady when you started running in May.",
    trend: [
      { date: "W1", value: 65 },
      { date: "W2", value: 68 },
      { date: "W3", value: 58 },
      { date: "W4", value: 60 },
      { date: "W5", value: 72 },
      { date: "W6", value: 78 }
    ],
    sources: ["journal-2", "reflection-2", "journal-3", "voice-3", "reflection-4"]
  },
  {
    id: "focus-depth",
    name: "Focus Depth & Flow",
    value: 85,
    change: "+15%",
    status: "optimal",
    confidence: 93,
    sourcesCount: 20,
    observation: "You are focusing for longer periods since you started having Focus Wednesdays.",
    summary: "Tracks continuous coding times and focus notes in your journal.",
    reasoning: [
      "Wednesdays give you 4.8 hours of quiet work time, compared to 1.2 hours on other days.",
      "Muting Slack notifications correlates with feeling happier in evening logs.",
      "Most code changes are saved on Wednesday afternoons, showing clear progress."
    ],
    uncertainty: "We cannot track offline planning time, like whiteboarding.",
    history: "This habit was started in late May to get more coding time without meetings.",
    trend: [
      { date: "W1", value: 62 },
      { date: "W2", value: 65 },
      { date: "W3", value: 64 },
      { date: "W4", value: 70 },
      { date: "W5", value: 80 },
      { date: "W6", value: 85 }
    ],
    sources: ["reflection-3", "journal-4", "voice-4", "reflection-4"]
  }
];

export const mockTimelineChapters = [
  {
    id: "career-growth",
    year: 2026,
    month: "March",
    title: "Becoming a Team Lead",
    period: "March 2026",
    summary: "This month you took charge of the team roadmap. With more meetings, you had to plan your mornings carefully to keep your focus.",
    milestones: [
      {
        date: "2026-03-01",
        title: "Started Tech Lead Role",
        description: "Began managing the team and planning feature rollouts."
      },
      {
        date: "2026-03-12",
        title: "Roadmap Approved",
        description: "Got the team to agree on a safer launch schedule."
      }
    ],
    insights: ["decision-confidence", "social-energy"],
    evidence: ["journal-1", "voice-1", "calendar-1", "reflection-1"]
  },
  {
    id: "personal-challenges",
    year: 2026,
    month: "April",
    title: "Launch Stress & Sleep Loss",
    period: "April 2026",
    summary: "A very busy month with late-night coding. Lack of sleep made your stress levels go up and made decisions harder.",
    milestones: [
      {
        date: "2026-04-03",
        title: "Fixed Memory Leak",
        description: "Found and fixed a major bug that was slowing down the app."
      },
      {
        date: "2026-04-10",
        title: "Core Platform Rollout",
        description: "Successfully shipped the update on a tight schedule."
      }
    ],
    insights: ["emotional-stability", "decision-confidence"],
    evidence: ["journal-2", "voice-2", "calendar-2", "reflection-2"]
  },
  {
    id: "fitness-journey",
    year: 2026,
    month: "May",
    title: "Running & Recovery",
    period: "May 2026",
    summary: "Started a running habit. Listening to audiobooks while running helped your learning score and lowered your stress.",
    milestones: [
      {
        date: "2026-05-02",
        title: "First Run",
        description: "Ran 4km in the morning, which immediately helped morning focus."
      },
      {
        date: "2026-05-18",
        title: "Ran 50km Total",
        description: "Hit the monthly run goal and felt healthier."
      }
    ],
    insights: ["emotional-stability", "learning-consistency", "social-energy"],
    evidence: ["journal-3", "voice-3", "calendar-3", "reflection-3"]
  },
  {
    id: "creative-projects",
    year: 2026,
    month: "June",
    title: "Deep Work Routine",
    period: "June 2026",
    summary: "Started having Focus Wednesdays. This gave you block times of 5 hours to write code without meetings.",
    milestones: [
      {
        date: "2026-06-01",
        title: "No-meeting Wednesdays",
        description: "Blocked Wednesdays for coding and muted notifications."
      },
      {
        date: "2026-06-05",
        title: "Shipped New Prototype",
        description: "Finished writing the core code for the new text parser."
      }
    ],
    insights: ["focus-depth", "decision-confidence"],
    evidence: ["journal-4", "voice-4", "calendar-4", "reflection-4"]
  }
];

export const getEvidenceById = (id) => mockEvidence.find(e => e.id === id);
export const getMetricById = (id) => mockMetrics.find(m => m.id === id);
export const getChapterById = (id) => mockTimelineChapters.find(c => c.id === id);
