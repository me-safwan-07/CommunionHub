import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar, MapPin, Tag, MoreVertical, Edit, Trash2, Search, Pin, PinOff } from 'lucide-react';
import type { Event, EventCategory } from '../types/event';
import { eventSchema, type EventFormData } from '../lib/validations/event';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '../components/ui/Dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Toast, ToastTitle, ToastDescription } from '../components/ui/Toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/Card';

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
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      location: '',
      description: '',
      category: 'religious'
    }
  });

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
        // Sort by pinned status first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        // Then sort by date
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [events, selectedCategory, searchQuery]);

  const onSubmit = (data: EventFormData) => {
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
    reset();
    setShowToast(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    Object.keys(event).forEach((key) => {
      if (key !== 'id' && key !== 'isPinned') {
        const value = event[key as keyof Event];
        if (typeof value === 'string') {
          setValue(key as keyof EventFormData, value);
        }
      }
    });
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Community Events</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                <DialogDescription>
                  {editingEvent ? 'Update the event details below.' : 'Create a new event to share with the community.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.title && (
                    <span className="text-sm text-red-500">{errors.title.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    {...register('date')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.date && (
                    <span className="text-sm text-red-500">{errors.date.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    {...register('location')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.location && (
                    <span className="text-sm text-red-500">{errors.location.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    {...register('description')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500">{errors.description.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    {...register('category')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="religious">Religious</option>
                    <option value="social">Social</option>
                    <option value="charity">Charity</option>
                  </select>
                  {errors.category && (
                    <span className="text-sm text-red-500">{errors.category.message}</span>
                  )}
                </div>

                <DialogFooter>
                  <Button type="submit">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as EventCategory | 'all')}
          >
            <option value="all">All Categories</option>
            <option value="religious">Religious</option>
            <option value="social">Social</option>
            <option value="charity">Charity</option>
          </select>
        </div>
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
              <motion.div
                key={event.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover="hover"
                layout
                className="h-full"
              >
                <Card className={`h-full flex flex-col relative group ${event.isPinned ? 'ring-2 ring-indigo-500' : ''}`}>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content className="bg-white rounded-lg shadow-lg p-2 min-w-[160px]">
                            <DropdownMenu.Item 
                              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                              onClick={() => handleTogglePin(event.id)}
                            >
                              {event.isPinned ? (
                                <>
                                  <PinOff className="h-4 w-4 mr-2" />
                                  Unpin
                                </>
                              ) : (
                                <>
                                  <Pin className="h-4 w-4 mr-2" />
                                  Pin
                                </>
                              )}
                            </DropdownMenu.Item>
                            <DropdownMenu.Item 
                              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                              onClick={() => handleEdit(event)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item 
                              className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                              onClick={() => handleDelete(event.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <motion.h3 
                        className="text-xl font-semibold"
                        variants={{
                          hover: { scale: 1.05 }
                        }}
                      >
                        {event.title}
                      </motion.h3>
                      {event.isPinned && (
                        <Pin className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="space-y-3 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        {format(new Date(event.date), 'MMMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="capitalize">{event.category}</span>
                      </div>
                    </div>
                    <p className="mt-auto text-gray-600">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showToast && (
          <Toast
            onOpenChange={(open) => {
              if (!open) setShowToast(false);
            }}
          >
            <ToastTitle>{toastMessage.title}</ToastTitle>
            <ToastDescription>{toastMessage.description}</ToastDescription>
          </Toast>
        )}
      </AnimatePresence>
    </div>
  );
};