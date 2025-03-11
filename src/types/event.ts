export type EventCategory = 'religious' | 'social' | 'charity';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: EventCategory;
  isPinned?: boolean;
}