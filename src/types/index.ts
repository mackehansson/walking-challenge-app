export interface Challenge {
  id: string;
  name: string;
  target_steps: number;
  start_date: string;
  end_date: string;
}

export interface Participant {
  id: string;
  name: string;
  current_steps: number;
}