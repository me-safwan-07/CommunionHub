import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/Dialog';
import type { Event } from '../../types/event';
import { eventSchema, type EventFormData } from '../../lib/validations/event';
import { Button } from '../ui/button';

interface EventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EventFormData) => void;
  editingEvent: Event | null;
}

export const EventDialog: React.FC<EventDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  editingEvent,
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      location: '',
      description: '',
      category: 'religious'
    }
  });

  // ✅ Reset form when editingEvent changes
  useEffect(() => {
    if (editingEvent) {
      reset(editingEvent);  // Reset the form with editingEvent data
    } else {
      reset({
        title: '',
        date: '',
        location: '',
        description: '',
        category: 'religious'
      });
    }
  }, [editingEvent, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          <DialogDescription>
            {editingEvent ? 'Update the event details below.' : 'Create a new event to share with the community.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="p-1">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="p-1">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register('date')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border--500 focus:ring-indigo-500 p-2"
            />
            {errors.date && (
              <span className="text-sm text-red-500">{errors.date.message}</span>
            )}
          </div>

          <div className="p-1">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              {...register('location')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
            {errors.location && (
              <span className="text-sm text-red-500">{errors.location.message}</span>
            )}
          </div>

          <div className="p-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
            />
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="p-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
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
  );
};
