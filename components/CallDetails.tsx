'use client'

import { SalesCall } from '@/lib/types'
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle, XCircle, AlertCircle, Clock, MessageSquare } from 'lucide-react'
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface CallDetailsProps {
  call: SalesCall
  onBack: () => void
}

export default function CallDetails({ call, onBack }: CallDetailsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10b981'
    if (score >= 70) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    return 'Needs Improvement'
  }

  const scoreData = [
    { name: 'Score', value: call.overallScore, fill: getScoreColor(call.overallScore) },
  ]

  const talkRatioData = [
    { name: 'You', value: call.metrics.talkRatio, fill: '#3b82f6' },
    { name: 'Customer', value: 100 - call.metrics.talkRatio, fill: '#10b981' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{call.customer}</h2>
            <p className="text-gray-600">
              {new Date(call.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-gray-900">{call.overallScore}</p>
            <p className="text-sm text-gray-600">{getScoreLabel(call.overallScore)}</p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">Duration</p>
          <p className="text-2xl font-bold text-gray-900">{call.duration} min</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">Questions Asked</p>
          <p className="text-2xl font-bold text-gray-900">{call.metrics.questionsAsked}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">Objections Handled</p>
          <p className="text-2xl font-bold text-gray-900">{call.metrics.objectionHandling}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-2">Closing Attempts</p>
          <p className="text-2xl font-bold text-gray-900">{call.metrics.closingAttempts}</p>
        </div>
      </div>

      {/* Talk Ratio */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Talk Ratio</h3>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={talkRatioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {talkRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-blue-500" />
                  <span className="text-gray-700">You: {call.metrics.talkRatio}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span className="text-gray-700">Customer: {100 - call.metrics.talkRatio}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 pl-6 border-l border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Recommendation</p>
            {call.metrics.talkRatio > 50 ? (
              <p className="text-gray-900">
                Try to listen more and ask open-ended questions. Aim for a 30-40% talk ratio to let the customer speak more.
              </p>
            ) : (
              <p className="text-gray-900">
                Great balance! You're letting the customer do most of the talking.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Technique Scores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technique Analysis</h3>
        <div className="space-y-6">
          {call.techniques.map((technique, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{technique.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      technique.score >= 85 ? 'bg-green-100 text-green-700' :
                      technique.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {technique.score}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{technique.feedback}</p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${technique.score}%`,
                        backgroundColor: getScoreColor(technique.score)
                      }}
                    />
                  </div>

                  {technique.examples.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                      <ul className="space-y-1">
                        {technique.examples.map((example, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbook Adherence */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Playbook Adherence</h3>
        {call.playbooks.map((playbook, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{playbook.name}</h4>
              <span className={`px-4 py-2 rounded-lg text-lg font-bold ${
                playbook.adherence >= 85 ? 'bg-green-100 text-green-700' :
                playbook.adherence >= 70 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {playbook.adherence}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${playbook.adherence}%`,
                  backgroundColor: getScoreColor(playbook.adherence)
                }}
              />
            </div>

            {playbook.missedSteps.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Missed Steps
                </p>
                <ul className="space-y-2">
                  {playbook.missedSteps.map((step, i) => (
                    <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {playbook.missedSteps.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-medium text-green-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Perfect adherence! All playbook steps completed.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Moments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Moments</h3>
        <div className="space-y-3">
          {call.keyMoments.map((moment, idx) => (
            <div
              key={idx}
              className={`border-l-4 rounded-lg p-4 ${
                moment.type === 'positive' ? 'bg-green-50 border-green-500' :
                moment.type === 'negative' ? 'bg-red-50 border-red-500' :
                'bg-gray-50 border-gray-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  moment.type === 'positive' ? 'bg-green-100' :
                  moment.type === 'negative' ? 'bg-red-100' :
                  'bg-gray-100'
                }`}>
                  {moment.type === 'positive' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : moment.type === 'negative' ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-gray-600">{moment.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      moment.type === 'positive' ? 'bg-green-200 text-green-800' :
                      moment.type === 'negative' ? 'bg-red-200 text-red-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {moment.type}
                    </span>
                  </div>
                  <p className="text-gray-900">{moment.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Transcript Preview
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {call.transcript.map((line, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="font-mono text-xs text-gray-500 mt-1">{line.timestamp}</span>
              <div className="flex-1">
                <span className="font-semibold text-gray-900">{line.speaker}:</span>
                <span className="text-gray-700 ml-2">{line.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
