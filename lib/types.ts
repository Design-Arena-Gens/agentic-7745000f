export interface SalesCall {
  id: string
  salesperson: string
  customer: string
  date: string
  duration: number
  overallScore: number
  techniques: {
    name: string
    score: number
    feedback: string
    examples: string[]
  }[]
  playbooks: {
    name: string
    adherence: number
    missedSteps: string[]
  }[]
  keyMoments: {
    timestamp: string
    type: 'positive' | 'negative' | 'neutral'
    description: string
  }[]
  transcript: {
    speaker: string
    text: string
    timestamp: string
  }[]
  metrics: {
    talkRatio: number
    questionsAsked: number
    objectionHandling: number
    closingAttempts: number
  }
}

export interface TeamMetrics {
  totalCalls: number
  averageScore: number
  topPerformers: {
    name: string
    score: number
    calls: number
  }[]
  improvementAreas: {
    technique: string
    averageScore: number
    trend: 'up' | 'down' | 'stable'
  }[]
}
