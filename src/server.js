import app from "./app.js";
import { env } from "./config/env.js";
import { runDecayJob } from "./jobs/decay.job.js";

app.listen(env.port, () => {
  console.log(`Server running on ${env.port}`);
});

// run every 1 hour
setInterval(runDecayJob, 60 * 60 * 1000);