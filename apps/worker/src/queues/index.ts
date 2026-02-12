import { Queue, Worker } from "bullmq";
import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

function createConnection(): Redis {
  return new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    retryStrategy(times) {
      if (times > 10) return null;
      return Math.min(times * 500, 5000);
    },
  });
}

let _connection: Redis | null = null;

function getConnection(): Redis {
  if (!_connection) _connection = createConnection();
  return _connection;
}

export function getNotificationQueue(): Queue<{
  userId: string;
  type: string;
  title: string;
  body: string;
}> {
  return new Queue("notifications", { connection: getConnection() });
}

export function createNotificationWorker(
  processFn: (job: { data: { userId: string; type: string; title: string; body: string } }) => Promise<void>
): Worker | null {
  try {
    const connection = getConnection();
    return new Worker(
      "notifications",
      async (job) => {
        await processFn(job);
      },
      { connection }
    );
  } catch (err) {
    console.error("Worker Redis connection failed:", err);
    return null;
  }
}
