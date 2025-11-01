'use client'

import { mockCalls } from '@/lib/mockData'
import { Phone, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  onSelectCall: (id: string) => void
}

export default function Dashboard({ onSelectCall }: DashboardProps) {
  const userCalls = mockCalls.filter(c => c.salesperson === 'John Smith')
  const avgScore = Math.round(userCalls.reduce((sum, c) => sum + c.overallScore, 0) / userCalls.length)
  const totalDuration = userCalls.reduce((sum, c) => sum + c.duration, 0)

  const chartData = userCalls.map(c => ({
    date: new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: c.overallScore,
  }))

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
        <p className="text-gray-600">Here's your sales call performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Total Calls</p>
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{userCalls.length}</p>
          <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Average Score</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{avgScore}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +5% from last week
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Total Time</p>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalDuration}m</p>
          <p className="text-xs text-gray-500 mt-1">Across all calls</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Top Technique</p>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">Active Listening</p>
          <p className="text-xs text-gray-500 mt-1">92% average</p>
        </div>
      </div>

      {/* Score Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Calls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
        <div className="space-y-3">
          {userCalls.map((call) => (
            <div
              key={call.id}
              onClick={() => onSelectCall(call.id)}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getScoreBadge(call.overallScore)}`} />
                  <div>
                    <p className="font-semibold text-gray-900">{call.customer}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(call.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border font-bold ${getScoreColor(call.overallScore)}`}>
                  {call.overallScore}
                </div>
              </div>

              <div className="flex gap-6 text-sm text-gray-600 mt-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{call.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{call.metrics.questionsAsked} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{call.metrics.talkRatio}% talk ratio</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
