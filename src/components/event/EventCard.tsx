import type React from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Calendar, MapPin, Tag, MoreVertical, Edit, Trash2, Pin, PinOff } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Card, CardContent } from "../ui/Card"
import type { Event } from "../../types/event"

interface EventCardProps {
  event: Event
  onEdit: (event: Event) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
}

export const EventCard: React.FC<EventCardProps> = ({ 
    event, 
    onEdit, 
    onDelete, 
    onTogglePin 
}) => {

  return (
    <motion.div
      key={event.id}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
      className="h-full relative"
    >
      <Card
        className={`h-full flex flex-col relative z-10 bg-transparent ${event.isPinned ? "ring-2 ring-black" : ""}`}
      >
        <CardContent className="flex-1 flex flex-col bg-white rounded-xl">
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white rounded-lg shadow-lg p-2 min-w-[160px] z-50">
                  <DropdownMenu.Item
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => onTogglePin(event.id)}
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
                    onClick={() => onEdit(event)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                    onClick={() => onDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          <div className="flex items-center space-x-2 gap-2 mb">
            <motion.h3
              className="text-xl font-semibold"
              variants={{
                hover: { scale: 1.05 },
              }}
            >
              {event.title}
            </motion.h3>
            {event.isPinned && <Pin className="h-4 w-4 text-red-600 mr-5 flex-shrink-0" />}
          </div>
          <div className="space-y-3 text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              {format(new Date(event.date), "MMMM d, yyyy")}
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
  )
}

