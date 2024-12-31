import React from 'react';
import { Participant } from '../types';

interface LeaderboardProps {
  participants: Participant[];
}

export function Leaderboard({ participants }: LeaderboardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard</h2>
      <div className="space-y-4">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-600">#{index + 1}</span>
              <span className="text-gray-900">{participant.name}</span>
            </div>
            <span className="text-gray-600">
              {participant.current_steps.toLocaleString()} steps
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}