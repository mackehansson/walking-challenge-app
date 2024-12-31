import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Challenge } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Link
      to={`/challenge/${challenge.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{challenge.name}</h2>
      <div className="text-gray-600 space-y-2">
        <p>Target: {challenge.target_steps.toLocaleString()} steps</p>
        <p>Ends: {formatDistanceToNow(new Date(challenge.end_date), { addSuffix: true })}</p>
      </div>
    </Link>
  );
}