"use client"

import React, { useState } from "react"
import {  Clock, Mail, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateReminderPage() {
  const [form, setForm] = useState({
    title: "",
    email: "",
    time: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle logic to create reminder here
    console.log("Submitted reminder:", form)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="bg-white dark:bg-black border border-sky-200 dark:border-sky-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sky-600 dark:text-sky-400 text-xl flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Create Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sky-700 dark:text-sky-300">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Meeting with client"
                value={form.title}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sky-700 dark:text-sky-300 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Send To
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="someone@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            {/* Time */}
            <div>
              <Label htmlFor="time" className="text-sky-700 dark:text-sky-300 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Reminder Time
              </Label>
              <Input
                name="time"
                type="datetime-local"
                value={form.time}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-sky-700 dark:text-sky-300">
                Notes (optional)
              </Label>
              <Textarea
                name="notes"
                placeholder="Include any extra details here..."
                value={form.notes}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white w-full"
            >
              Create Reminder
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
