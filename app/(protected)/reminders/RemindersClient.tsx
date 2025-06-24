'use client'

import React, { useState, useEffect, useRef} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, Edit, Trash, Download, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { exportToCSV,exportToJSON} from "@/utils/exportToFormat";

import { toast } from "sonner";




interface Reminder {
  _id: string
  subject: string
  to: string
  remindAt: string
  sent: string
  clerkId: string
  body?: string
}

export default function RemindersClient({ reminders: initialReminders }: { reminders: Reminder[] }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showForm, setShowForm] = useState(false)
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
	 const [format, setFormat] = useState<"csv" | "json">("csv");
  const [form, setForm] = useState({
    _id: "",
    clerkId: initialReminders[0]?.clerkId || "",
    title: "",
    email: "",
    time: "",
    notes: ""
  })

  const fetchReminders = async () => {
    const res = await fetch("/api/reminders")
    const data = await res.json()
    setReminders(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
	
  useEffect(() => {
    if (initialReminders[0]) {
      setForm(prev => ({ ...prev, clerkId: initialReminders[0].clerkId }))
    }
  }, [initialReminders])
  const formRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setShowForm(false);
    }
  }

  if (showForm) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showForm]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: form.title,
          to: form.email,
          remindAt: form.time,
          body: form.notes,
          html: form.notes,
          clerkId: form.clerkId
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        return alert("Error: " + err.error)
      }

      setShowForm(false)
      fetchReminders()
    } catch (err) {
      console.error("Submit error:", err)
      alert("Something went wrong")
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/reminders/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: form.title,
          to: form.email,
          remindAt: form.time,
          body: form.notes,
          html: form.notes,
          clerkId: form.clerkId,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        return alert("Error: " + err.error)
      }

      setShowForm(false)
      fetchReminders()
    } catch (err) {
      console.error("Update error:", err)
      toast.error("Something went wrong")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return

    try {
      const res = await fetch(`/api/reminders/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        return alert("Error deleting reminder: " + err.error)
      }

      fetchReminders()
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  const filteredReminders = reminders.filter((reminder) => {
  const matchesSearch =
    reminder.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.to.toLowerCase().includes(searchTerm.toLowerCase())

  const matchesStatus =
  filterStatus === "all" ||
  (filterStatus === "pending" && !reminder.sent) ||
  (filterStatus === "sent" && reminder.sent);


  return matchesSearch && matchesStatus
})
const today = new Date().toISOString().split("T")[0];
  const fileName = `reminders_${today}.${format}`;
  
  const handleExport = () => {
    if (!filteredReminders.length) {
      toast.error("No reminders to export");
      return;
    }
    if (format === "csv") exportToCSV(filteredReminders, fileName);
    else exportToJSON(filteredReminders, fileName);
  };

  const parseSubject = (subject: string) => {
    const match = subject?.match(/^Fwd: snooze in (\d+ (minutes|minute|hours|hour|days|day))/i)
    const duration = match ? match[1] : null
    let cleanedSubject = subject.replace(/^Fwd: snooze in \d+ (minutes|minute|hours|hour|days|day)/i, '')
    cleanedSubject = cleanedSubject.replace(/^[^\w]+/, '')
    return { duration, cleanedSubject }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
          Reminders
        </h1>
        <Button 
          variant="default" 
          onClick={() => {
            setForm({
              _id: "",
              clerkId: initialReminders[0]?.clerkId || "",
              title: "",
              email: "",
              time: "",
              notes: ""
            })
            setShowForm(true)
          }}
          className="w-full md:w-auto"
        >
          Create New Reminder
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search reminders..."
          className="w-full md:max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(val) => setFilterStatus(val)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
		<select
              value={format}
              onChange={(e) => setFormat(e.target.value as "json" | "csv")}

              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded px-3 py-2 text-sm"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
		<Button
  variant="outline"
  className="flex items-center gap-2"
 onClick={handleExport}
>
  <Download className="w-4 h-4" />
  Export Reminders
</Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {filteredReminders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No reminders found
              </div>
            ) : isMobile ? (
              <div className="space-y-4 p-4">
                {filteredReminders.map((reminder) => {
                  const { duration, cleanedSubject } = parseSubject(reminder.subject)
                  return (
                    <Card key={reminder._id} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {duration && <span className="text-xs text-gray-500 mr-2">({duration})</span>}
                              {cleanedSubject}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.to}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
							  !reminder.sent
								? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
								: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
							}`}>
							  {!reminder.sent ? "Pending" : "Sent"}
							</span>

                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(reminder.remindAt).toLocaleString()}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => {
                              setForm({
                                _id: reminder._id,
                                clerkId: reminder.clerkId,
                                title: reminder.subject,
                                email: reminder.to,
                                time: reminder.remindAt.slice(0, 16),
                                notes: reminder.body || "",
                              })
                              setShowForm(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete(reminder._id)}
                          >
                            <Trash className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredReminders.map((reminder) => {
                    const { duration, cleanedSubject } = parseSubject(reminder.subject)
                    return (
                      <tr key={reminder._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {duration && <span className="text-xs text-gray-500 mr-2">({duration})</span>}
                              {cleanedSubject}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {reminder.to}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(reminder.remindAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
							  !reminder.sent
								? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
								: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
							}`}>
							  {!reminder.sent ? "Pending" : "Sent"}
							</span>

                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => {
                              setForm({
                                _id: reminder._id,
                                clerkId: reminder.clerkId,
                                title: reminder.subject,
                                email: reminder.to,
                                time: reminder.remindAt.slice(0, 16),
                                notes: reminder.body || "",
                              })
                              setShowForm(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete(reminder._id)}
                          >
                            <Trash className="w-4 h-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {showForm && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div ref={formRef} className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg">
        <CardHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {form._id ? "Edit Reminder" : "Create Reminder"}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowForm(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form
            onSubmit={form._id ? handleEdit : handleSubmit}
            className="space-y-5"
          >
            <div>
              <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Meeting reminder"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Send To</Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="time" className="text-gray-700 dark:text-gray-300">Reminder Time</Label>
              <input
                name="time"
                type="datetime-local"
                value={form.time}
                onChange={handleChange}
                required
                min={new Date().toISOString().slice(0, 16)}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "dark:bg-gray-800 dark:border-gray-700"
                )}
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">Notes (optional)</Label>
              <Textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add any additional details..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
              >
                {form._id ? "Update Reminder" : "Create Reminder"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
)}

    </div>
  )
}