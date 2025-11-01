import { SalesCall, TeamMetrics } from './types'

export const mockCalls: SalesCall[] = [
  {
    id: '1',
    salesperson: 'John Smith',
    customer: 'Acme Corp',
    date: '2025-10-28',
    duration: 45,
    overallScore: 87,
    techniques: [
      {
        name: 'Active Listening',
        score: 92,
        feedback: 'Excellent use of verbal cues and paraphrasing to show understanding.',
        examples: [
          'Paraphrased customer concerns at 12:30',
          'Asked clarifying questions at 18:45',
        ],
      },
      {
        name: 'Value Proposition',
        score: 85,
        feedback: 'Strong alignment with customer needs, but could emphasize ROI more.',
        examples: [
          'Connected product features to business goals at 22:15',
          'Mentioned cost savings at 35:20',
        ],
      },
      {
        name: 'Objection Handling',
        score: 78,
        feedback: 'Good acknowledgment of concerns. Try using the "Feel, Felt, Found" technique.',
        examples: [
          'Addressed pricing concern at 28:10',
          'Handled competitor comparison at 31:45',
        ],
      },
      {
        name: 'Closing Techniques',
        score: 90,
        feedback: 'Confident close with clear next steps. Great use of assumptive language.',
        examples: [
          'Assumptive close at 42:30',
          'Scheduled follow-up meeting at 44:15',
        ],
      },
    ],
    playbooks: [
      {
        name: 'Enterprise Sales Playbook',
        adherence: 85,
        missedSteps: [
          'Did not ask about decision-making timeline',
          'Skipped budget qualification question',
        ],
      },
    ],
    keyMoments: [
      {
        timestamp: '12:30',
        type: 'positive',
        description: 'Successfully built rapport by discussing shared industry experience',
      },
      {
        timestamp: '28:10',
        type: 'negative',
        description: 'Customer raised pricing objection - handled but could be improved',
      },
      {
        timestamp: '42:30',
        type: 'positive',
        description: 'Strong assumptive close led to scheduled demo',
      },
    ],
    transcript: [
      {
        speaker: 'John',
        text: 'Thanks for taking the time to meet with me today. I understand you\'re looking to improve your team\'s productivity.',
        timestamp: '00:30',
      },
      {
        speaker: 'Customer',
        text: 'Yes, we\'ve been struggling with our current workflow tools. They\'re not integrated well.',
        timestamp: '00:45',
      },
      {
        speaker: 'John',
        text: 'I hear you. So if I understand correctly, the main pain point is the lack of integration between your tools?',
        timestamp: '01:00',
      },
      {
        speaker: 'Customer',
        text: 'Exactly. Our team wastes hours every week switching between systems.',
        timestamp: '01:15',
      },
    ],
    metrics: {
      talkRatio: 40,
      questionsAsked: 12,
      objectionHandling: 3,
      closingAttempts: 2,
    },
  },
  {
    id: '2',
    salesperson: 'John Smith',
    customer: 'TechStart Inc',
    date: '2025-10-25',
    duration: 38,
    overallScore: 72,
    techniques: [
      {
        name: 'Active Listening',
        score: 68,
        feedback: 'Interrupted customer several times. Allow more space for them to speak.',
        examples: [
          'Interrupted at 8:20',
          'Cut off customer at 15:30',
        ],
      },
      {
        name: 'Value Proposition',
        score: 80,
        feedback: 'Clear value prop, but presented too early before understanding full needs.',
        examples: [
          'Pitched solution at 5:00 before discovery',
        ],
      },
      {
        name: 'Objection Handling',
        score: 65,
        feedback: 'Became defensive when objections raised. Practice empathetic responses.',
        examples: [
          'Defensive response at 20:15',
        ],
      },
      {
        name: 'Closing Techniques',
        score: 75,
        feedback: 'Asked for the business but didn\'t create urgency or clear next steps.',
        examples: [
          'Weak close attempt at 35:00',
        ],
      },
    ],
    playbooks: [
      {
        name: 'SMB Sales Playbook',
        adherence: 60,
        missedSteps: [
          'Did not complete full needs assessment',
          'Skipped budget discussion',
          'Did not identify decision maker',
        ],
      },
    ],
    keyMoments: [
      {
        timestamp: '8:20',
        type: 'negative',
        description: 'Interrupted customer while they were explaining their needs',
      },
      {
        timestamp: '20:15',
        type: 'negative',
        description: 'Defensive response to pricing objection damaged rapport',
      },
      {
        timestamp: '35:00',
        type: 'neutral',
        description: 'Attempted close but no commitment obtained',
      },
    ],
    transcript: [
      {
        speaker: 'John',
        text: 'Hi there! Let me tell you about our amazing product...',
        timestamp: '00:30',
      },
      {
        speaker: 'Customer',
        text: 'Well, I was hoping to first discuss our current challenges...',
        timestamp: '00:45',
      },
    ],
    metrics: {
      talkRatio: 65,
      questionsAsked: 5,
      objectionHandling: 2,
      closingAttempts: 1,
    },
  },
  {
    id: '3',
    salesperson: 'Sarah Johnson',
    customer: 'Global Industries',
    date: '2025-10-30',
    duration: 52,
    overallScore: 94,
    techniques: [
      {
        name: 'Active Listening',
        score: 96,
        feedback: 'Outstanding listening skills. Perfect balance of questions and silence.',
        examples: [
          'Used silence effectively at 14:20',
          'Summarized customer needs at 25:10',
        ],
      },
      {
        name: 'Value Proposition',
        score: 93,
        feedback: 'Tailored value prop perfectly to customer\'s specific needs and industry.',
        examples: [
          'Industry-specific example at 30:00',
          'ROI calculation at 38:15',
        ],
      },
      {
        name: 'Objection Handling',
        score: 92,
        feedback: 'Masterful use of Feel-Felt-Found technique. Customer felt heard.',
        examples: [
          'Feel-Felt-Found at 33:20',
          'Used customer story at 35:40',
        ],
      },
      {
        name: 'Closing Techniques',
        score: 95,
        feedback: 'Perfect trial close followed by assumptive close. Excellent.',
        examples: [
          'Trial close at 45:00',
          'Assumptive close at 49:30',
        ],
      },
    ],
    playbooks: [
      {
        name: 'Enterprise Sales Playbook',
        adherence: 98,
        missedSteps: [],
      },
    ],
    keyMoments: [
      {
        timestamp: '25:10',
        type: 'positive',
        description: 'Perfectly summarized customer needs, gaining explicit agreement',
      },
      {
        timestamp: '33:20',
        type: 'positive',
        description: 'Used Feel-Felt-Found to address major pricing objection',
      },
      {
        timestamp: '49:30',
        type: 'positive',
        description: 'Closed deal with signed contract',
      },
    ],
    transcript: [
      {
        speaker: 'Sarah',
        text: 'Thank you for meeting with me. Before we dive in, I\'d love to understand more about your current challenges.',
        timestamp: '00:30',
      },
      {
        speaker: 'Customer',
        text: 'Absolutely. We\'re struggling with data silos across our departments.',
        timestamp: '00:50',
      },
    ],
    metrics: {
      talkRatio: 35,
      questionsAsked: 18,
      objectionHandling: 4,
      closingAttempts: 2,
    },
  },
  {
    id: '4',
    salesperson: 'Mike Chen',
    customer: 'RetailCo',
    date: '2025-10-29',
    duration: 30,
    overallScore: 65,
    techniques: [
      {
        name: 'Active Listening',
        score: 70,
        feedback: 'Adequate listening but missed some key buying signals.',
        examples: [
          'Customer mentioned urgency at 10:00 but not explored',
        ],
      },
      {
        name: 'Value Proposition',
        score: 62,
        feedback: 'Generic pitch that didn\'t address retail-specific needs.',
        examples: [
          'Used standard pitch at 12:00',
        ],
      },
      {
        name: 'Objection Handling',
        score: 60,
        feedback: 'Avoided addressing objections directly. Be more confident.',
        examples: [
          'Deflected concern at 18:30',
        ],
      },
      {
        name: 'Closing Techniques',
        score: 68,
        feedback: 'Asked for next steps but didn\'t secure commitment.',
        examples: [
          'Soft close at 28:00',
        ],
      },
    ],
    playbooks: [
      {
        name: 'Retail Sales Playbook',
        adherence: 55,
        missedSteps: [
          'Did not discuss seasonality impact',
          'Skipped implementation timeline',
          'Missed upsell opportunity',
        ],
      },
    ],
    keyMoments: [
      {
        timestamp: '10:00',
        type: 'negative',
        description: 'Missed buying signal about urgent need',
      },
      {
        timestamp: '18:30',
        type: 'negative',
        description: 'Deflected valid concern instead of addressing it',
      },
    ],
    transcript: [
      {
        speaker: 'Mike',
        text: 'Hi, thanks for your time. Let me show you our product features.',
        timestamp: '00:30',
      },
    ],
    metrics: {
      talkRatio: 55,
      questionsAsked: 7,
      objectionHandling: 1,
      closingAttempts: 1,
    },
  },
]

export const teamMetrics: TeamMetrics = {
  totalCalls: 156,
  averageScore: 79.5,
  topPerformers: [
    { name: 'Sarah Johnson', score: 94, calls: 42 },
    { name: 'John Smith', score: 87, calls: 38 },
    { name: 'Emily Davis', score: 82, calls: 35 },
  ],
  improvementAreas: [
    { technique: 'Objection Handling', averageScore: 72, trend: 'up' },
    { technique: 'Active Listening', averageScore: 78, trend: 'stable' },
    { technique: 'Closing Techniques', averageScore: 81, trend: 'up' },
  ],
}
