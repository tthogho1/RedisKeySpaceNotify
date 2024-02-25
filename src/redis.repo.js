import Redis from "ioredis";

const host = "localhost";
const port = 6379;
const db = 0;

export default class RedisRepo {
    
    constructor() {
        this.redis = new Redis({ port, host, db });
        this.redis.on("ready", () => {
            this.redis.config("SET", "notify-keyspace-events", "KEA");
        });
    }
    get(key) {
        return this.redis.get(key);
    }
    setReminder(key, value, expire) {
        this.redis
        .multi()
        .set(key, value)
        .set(`reminder:${key}`, 1)
        .expire(`reminder:${key}`, expire)
        .exec();
    }
}