'use client'

import { mockCalls, teamMetrics } from '@/lib/mockData'
import { Users, TrendingUp, Phone, Award, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

interface ManagerViewProps {
  onSelectCall: (id: string) => void
}

export default function ManagerView({ onSelectCall }: ManagerViewProps) {
  // Group calls by salesperson
  const salespeople = Array.from(new Set(mockCalls.map(c => c.salesperson)))
  const performanceData = salespeople.map(person => {
    const personCalls = mockCalls.filter(c => c.salesperson === person)
    const avgScore = Math.round(personCalls.reduce((sum, c) => sum + c.overallScore, 0) / personCalls.length)
    return {
      name: person.split(' ')[0],
      score: avgScore,
      calls: personCalls.length,
    }
  })

  const techniqueData = teamMetrics.improvementAreas.map(area => ({
    name: area.technique.replace(' Techniques', '').replace(' Handling', ''),
    score: area.averageScore,
  }))

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-600" />
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Performance</h2>
        <p className="text-gray-600">Overview of your team's sales call performance</p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Total Calls</p>
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{teamMetrics.totalCalls}</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Team Average</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{teamMetrics.averageScore}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +3.5% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Team Size</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{salespeople.length}</p>
          <p className="text-xs text-gray-500 mt-1">Active reps</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Top Score</p>
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{teamMetrics.topPerformers[0].score}</p>
          <p className="text-xs text-gray-500 mt-1">{teamMetrics.topPerformers[0].name}</p>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-semibold">{payload[0].payload.name}</p>
                      <p className="text-sm text-gray-600">Score: {payload[0].value}</p>
                      <p className="text-sm text-gray-600">Calls: {payload[0].payload.calls}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {performanceData.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="score"
                  fill={entry.score >= 85 ? '#10b981' : entry.score >= 70 ? '#f59e0b' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Top Performers
          </h3>
          <div className="space-y-4">
            {teamMetrics.topPerformers.map((performer, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{performer.name}</p>
                  <p className="text-sm text-gray-600">{performer.calls} calls</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{performer.score}</p>
                  <p className="text-xs text-gray-600">avg score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Focus Areas
          </h3>
          <div className="space-y-4">
            {teamMetrics.improvementAreas.map((area, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{area.technique}</span>
                    {getTrendIcon(area.trend)}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{area.averageScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${area.averageScore}%`,
                      backgroundColor: area.averageScore >= 85 ? '#10b981' : area.averageScore >= 70 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technique Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technique Scores Across Team</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={techniqueData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* All Calls Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Team Calls</h3>
        <div className="space-y-2">
          {mockCalls
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10)
            .map((call) => (
              <div
                key={call.id}
                onClick={() => onSelectCall(call.id)}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getScoreBadge(call.overallScore)}`} />
                    <div>
                      <p className="font-semibold text-gray-900">{call.customer}</p>
                      <p className="text-sm text-gray-500">{call.salesperson}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(call.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-500">{call.duration} min</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-bold ${
                      call.overallScore >= 85 ? 'bg-green-100 text-green-700' :
                      call.overallScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {call.overallScore}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
