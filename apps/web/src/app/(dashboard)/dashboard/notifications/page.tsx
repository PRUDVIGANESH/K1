import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import { NotificationList } from "./NotificationList";

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const items = notifications.map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    read: n.read,
    createdAt: n.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
      <NotificationList items={items} />
    </div>
  );
}
