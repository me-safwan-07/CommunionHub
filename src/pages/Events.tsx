import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast, ToastTitle, ToastDescription } from '../components/ui/Toast';
import type { Event, EventCategory } from '../types/event';
import type { EventFormData } from '../lib/validations/event';
import { Button } from '@/components/ui/button';
import { EventFilters } from '@/components/event/EventFilters';
import { EventCard } from '@/components/event/EventCard';
import { EventDialog } from '@/components/event/EventDialog';
import { PlusCircle } from 'lucide-react';

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Interfaith Dialog Session',
    date: '2024-03-20',
    location: 'Community Center',
    description: 'Join us for an evening of meaningful dialogue between different faith communities.',
    category: 'religious',
    isPinned: false
  },
  {
    id: '2',
    title: 'Community Cleanup Day',
    date: '2024-03-25',
    location: 'City Park',
    description: 'Help keep our community clean and beautiful. All supplies provided.',
    category: 'charity',
    isPinned: false
  }
];

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : INITIAL_EVENTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
      .filter(event => {
        const query = searchQuery.toLowerCase();
        return (
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [events, selectedCategory, searchQuery]);

  const handleSubmit = (data: EventFormData) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...data, id: event.id, isPinned: event.isPinned }
          : event
      ));
      setToastMessage({
        title: 'Event Updated',
        description: 'The event has been successfully updated.'
      });
    } else {
      const newEvent: Event = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        isPinned: false
      };
      setEvents([...events, newEvent]);
      setToastMessage({
        title: 'Event Created',
        description: 'New event has been successfully created.'
      });
    }
    setIsOpen(false);
    setEditingEvent(null);
    setShowToast(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsOpen(true);
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setToastMessage({
      title: 'Event Deleted',
      description: 'The event has been successfully removed.'
    });
    setShowToast(true);
  };

  const handleTogglePin = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isPinned: !event.isPinned }
        : event
    ));
    setToastMessage({
      title: 'Event Updated',
      description: `Event ${events.find(e => e.id === eventId)?.isPinned ? 'unpinned' : 'pinned'} successfully.`
    });
    setShowToast(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900">Community Events</h1>
          <Button onClick={() => setIsOpen(true)}>
            {editingEvent ? 'Edit Event' : <>Add Event <PlusCircle  className='h-4 w-4 text-white'/></>}
          </Button>
        </div>

        <EventFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No events found. Try adjusting your search or filters.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTogglePin={handleTogglePin}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <EventDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        editingEvent={editingEvent}
      />

      <AnimatePresence>
        {showToast && (
          <Toast onOpenChange={(open) => { if (!open) setShowToast(false); }}>
            <ToastTitle>{toastMessage.title}</ToastTitle>
            <ToastDescription>{toastMessage.description}</ToastDescription>
          </Toast>
        )}
      </AnimatePresence>
    </div>
  );
};
