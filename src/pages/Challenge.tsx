import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Leaderboard } from '../components/Leaderboard';
import { Challenge as ChallengeType, Participant } from '../types';

export default function Challenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<ChallengeType | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const [steps, setSteps] = useState('');
  const [participantId, setParticipantId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: challengeData } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single();

      if (challengeData) {
        setChallenge(challengeData);
      }

      const { data: participantsData } = await supabase
        .from('participants')
        .select('*')
        .eq('challenge_id', id)
        .order('current_steps', { ascending: false });

      if (participantsData) {
        setParticipants(participantsData);
      }
    }

    fetchData();
    
    const savedParticipantId = localStorage.getItem(`participant_${id}`);
    if (savedParticipantId) {
      setParticipantId(savedParticipantId);
    }
  }, [id]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('participants')
      .insert([
        {
          challenge_id: id,
          name,
          current_steps: 0,
        },
      ])
      .select()
      .single();

    if (data && !error) {
      setParticipantId(data.id);
      localStorage.setItem(`participant_${id}`, data.id);
      setParticipants([...participants, data]);
    }
  };

  const handleUpdateSteps = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('participants')
      .update({ current_steps: parseInt(steps) })
      .eq('id', participantId)
      .select()
      .single();

    if (data && !error) {
      setParticipants(
        participants.map((p) => (p.id === participantId ? data : p))
      );
      setSteps('');
    }
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{challenge.name}</h1>
        <div className="text-gray-600 space-y-2">
          <p>Target: {challenge.target_steps.toLocaleString()} steps</p>
          <p>Ends: {formatDistanceToNow(new Date(challenge.end_date), { addSuffix: true })}</p>
        </div>
      </div>

      {!participantId ? (
        <form onSubmit={handleJoin} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Join Challenge</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Join
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleUpdateSteps} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Your Steps</h2>
          <div className="flex gap-4">
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your current step count"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      )}

      <Leaderboard participants={participants} />
    </div>
  );
}