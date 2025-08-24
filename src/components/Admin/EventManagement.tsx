'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Image as LucideImage, Video, X, Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react';

type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
type EventCategory = 'music' | 'food' | 'art' | 'sports' | 'other';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  status: EventStatus;
  imageUrl?: string;
  videoUrl?: string;
}

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Live Jazz Night',
      description: 'An evening of smooth jazz with local artists',
      date: '2023-07-15',
      time: '19:00',
      location: 'Main Hall',
      category: 'music',
      status: 'upcoming',
      imageUrl: '/images/menu-bg.jpeg'
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleAddEvent = () => {
    setCurrentEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      location: '',
      category: 'music',
      status: 'upcoming'
    });
    setImagePreview(null);
    setVideoPreview(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent({ ...event });
    setImagePreview(event.imageUrl || null);
    setVideoPreview(event.videoUrl || null);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEvent) return;

    const eventData = {
      ...currentEvent,
      id: currentEvent.id || Date.now().toString(),
    } as Event;

    if (currentEvent.id) {
      setEvents(events.map(evt => evt.id === currentEvent.id ? eventData : evt));
    } else {
      setEvents([...events, eventData]);
    }

    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setCurrentEvent(prev => ({
          ...prev,
          imageUrl: reader.result as string,
          videoUrl: undefined
        }));
      };
      reader.readAsDataURL(file);
      setVideoPreview(null);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      setCurrentEvent(prev => ({
        ...prev,
        videoUrl,
        imageUrl: undefined
      }));
      setImagePreview(null);
    }
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'ongoing': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: EventCategory) => {
    switch (category) {
      case 'music': return 'bg-purple-100 text-purple-800';
      case 'food': return 'bg-amber-100 text-amber-800';
      case 'art': return 'bg-pink-100 text-pink-800';
      case 'sports': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Event Management</h2>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddEvent}
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Add New Event</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            {event.imageUrl && (
              <div className="h-48 bg-gray-700 overflow-hidden relative">
                <Image 
                  src={event.imageUrl} 
                  alt={event.title} 
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
              </div>
            )}
            {event.videoUrl && (
              <div className="h-48 bg-gray-700 overflow-hidden">
                <video 
                  src={event.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{event.description}</p>
              
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <Calendar size={14} className="mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <Clock size={14} className="ml-4 mr-2" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <MapPin size={14} className="mr-2" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditEvent(event)}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Event Modal */}
      {isModalOpen && currentEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {currentEvent.id ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Title</label>
                <input
                  type="text"
                  value={currentEvent.title || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={currentEvent.description || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={currentEvent.date || ''}
                    onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={currentEvent.time || ''}
                    onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={currentEvent.location || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    value={currentEvent.category || 'music'}
                    onChange={(e) => setCurrentEvent({...currentEvent, category: e.target.value as EventCategory})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="music">Music</option>
                    <option value="food">Food</option>
                    <option value="art">Art</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    value={currentEvent.status || 'upcoming'}
                    onChange={(e) => setCurrentEvent({...currentEvent, status: e.target.value as EventStatus})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Media</label>
                
                <div className="flex space-x-4">
                  <label className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      imagePreview ? 'border-green-500' : 'border-gray-600 hover:border-gray-500'
                    }`}>
                                            {imagePreview ? (
                        <Image src={imagePreview} alt="Event preview" width={64} height={64} className="object-cover rounded-md" />
                      ) : (
                        <>
                          <LucideImage size={24} className="text-gray-400 mb-1" />
                          <span className="text-sm text-gray-400">Upload Image</span>
                        </>
                      )}
                      
                    </div>
                  </label>
                  
                  <label className="flex-1">
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <div className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      videoPreview ? 'border-green-500' : 'border-gray-600 hover:border-gray-500'
                    }`}>
                      <Video size={24} className="text-gray-400 mb-1" />
                      <span className="text-sm text-gray-400">
                        {videoPreview ? 'Video Selected' : 'Upload Video'}
                      </span>
                    </div>
                  </label>
                </div>
                
                {(imagePreview || videoPreview) && (
                  <div className="mt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setVideoPreview(null);
                        setCurrentEvent(prev => ({
                          ...prev,
                          imageUrl: undefined,
                          videoUrl: undefined
                        }));
                      }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove media
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                >
                  {currentEvent.id ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
