import { createNotificationWorker } from "./queues";
import { processNotification } from "./jobs/notifications";

async function main() {
  console.log("KodNestCareers worker starting...");

  const notificationWorker = createNotificationWorker(processNotification);
  if (!notificationWorker) {
    console.warn("Redis not available. Worker disabled. Start Redis (e.g. Docker) and restart.");
    process.exit(0);
  }

  notificationWorker.on("completed", (job) => {
    console.log("Job completed:", job.id);
  });
  notificationWorker.on("failed", (job, err) => {
    console.error("Job failed:", job?.id, err);
  });

  notificationWorker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  console.log("Worker running. Waiting for jobs.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
