// utils/exportToCSV.ts
interface Reminder {
  _id: string
  subject: string
  to: string
  remindAt: string
  sent: string
  clerkId: string
  body?: string
}

import { toast } from "sonner";
export function exportToCSV(data: Reminder[], fileName: string) {
  if (data.length === 0) {
    toast.error("No data to export");
    return;
  }

  const headers = Object.keys(data[0]) as (keyof Reminder)[];
  const csv = [
    headers.join(","),
    ...data.map(row =>
      headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success("Reminders exported as CSV");
}

export function exportToJSON(data: Reminder[], fileName: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success("Reminders exported as JSON");
}