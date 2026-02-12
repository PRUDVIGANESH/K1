import { prisma } from "@kodnest/db";

export async function processNotification(job: {
  data: { userId: string; type: string; title: string; body: string };
}): Promise<void> {
  const { userId, type, title, body } = job.data;
  await prisma.notification.create({
    data: { userId, type, title, body },
  });
}
