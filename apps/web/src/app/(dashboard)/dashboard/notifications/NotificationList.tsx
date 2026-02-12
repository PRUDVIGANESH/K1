"use client";

import { useState } from "react";

type Item = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export function NotificationList({ items: initial }: { items: Item[] }) {
  const [items, setItems] = useState(initial);

  async function markRead(id: string) {
    await fetch(`/api/v1/notifications/${id}/read`, { method: "POST" });
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));
  }

  if (items.length === 0) {
    return <p className="text-gray-500">No notifications.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((n) => (
        <li
          key={n.id}
          className={`rounded-xl p-4 border ${
            n.read ? "bg-gray-50 border-gray-200" : "bg-white border-primary-200"
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <div>
              <h2 className="font-medium text-gray-900">{n.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{n.body}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
            {!n.read && (
              <button
                onClick={() => markRead(n.id)}
                className="text-sm text-primary-600 hover:underline"
              >
                Mark read
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
