// app/(protected)/reminders/page.tsx
import { getUserReminders } from "@/lib/actions/getReminders";
import RemindersClient from "./RemindersClient";

export default async function RemindersPage() {
  const reminders = await getUserReminders();

  return <RemindersClient reminders={reminders} />;
}
