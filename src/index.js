import express from "express";
import RedisExpiredEvents from './redis.expired-events.js';

const app = express();

RedisExpiredEvents();
app.listen(3000, () => console.log("Successfully started server"));