import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ChallengeForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [targetSteps, setTargetSteps] = useState('');
  const [duration, setDuration] = useState('7');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(duration));

    const { data, error } = await supabase
      .from('challenges')
      .insert([
        {
          name,
          target_steps: parseInt(targetSteps),
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
      ])
      .select()
      .single();

    if (data && !error) {
      navigate(`/challenge/${data.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Challenge Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Summer Walking Challenge"
        />
      </div>

      <div>
        <label htmlFor="targetSteps" className="block text-sm font-medium text-gray-700 mb-1">
          Target Steps
        </label>
        <input
          type="number"
          id="targetSteps"
          value={targetSteps}
          onChange={(e) => setTargetSteps(e.target.value)}
          required
          min="1000"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="10000"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (days)
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Create Challenge
      </button>
    </form>
  );
}