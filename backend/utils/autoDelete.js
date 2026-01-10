import cron from "node-cron";
import Article from "../models/Article.js";

cron.schedule("0 0 * * *", async () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  await Article.deleteMany({ createdAt: { $lt: date } });
  console.log("Old articles deleted");
});
