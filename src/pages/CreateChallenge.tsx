import React from 'react';
import { ChallengeForm } from '../components/ChallengeForm';

export default function CreateChallenge() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Walking Challenge</h1>
      <ChallengeForm />
    </div>
  );
}