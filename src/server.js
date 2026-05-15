import app from "./app.js";
import { env } from "./config/env.js";
import "./jobs/decay.job.js";

app.listen(env.port, () => {
  console.log(`Server running on ${env.port}`);
});