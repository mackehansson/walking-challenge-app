import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChallengeCard } from '../components/ChallengeCard';
import { Challenge } from '../types';

export default function Home() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    async function fetchChallenges() {
      const { data } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setChallenges(data);
      }
    }

    fetchChallenges();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Active Walking Challenges</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}