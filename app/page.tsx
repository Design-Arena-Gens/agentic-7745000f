'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import CallDetails from '@/components/CallDetails'
import ManagerView from '@/components/ManagerView'
import { mockCalls } from '@/lib/mockData'

export default function Home() {
  const [selectedCall, setSelectedCall] = useState<string | null>(null)
  const [view, setView] = useState<'dashboard' | 'manager'>('dashboard')

  return (
    <main className="min-h-screen">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Sales Call Coach</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setView('dashboard')
                setSelectedCall(null)
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                view === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Calls
            </button>
            <button
              onClick={() => {
                setView('manager')
                setSelectedCall(null)
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                view === 'manager'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manager View
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {view === 'dashboard' ? (
          selectedCall ? (
            <CallDetails
              call={mockCalls.find((c) => c.id === selectedCall)!}
              onBack={() => setSelectedCall(null)}
            />
          ) : (
            <Dashboard onSelectCall={setSelectedCall} />
          )
        ) : (
          <ManagerView onSelectCall={(id) => {
            setSelectedCall(id)
            setView('dashboard')
          }} />
        )}
      </div>
    </main>
  )
}
