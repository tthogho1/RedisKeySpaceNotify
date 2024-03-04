import Redis from "ioredis";

const host = "localhost";
const port = 6379;
const db = 0;

class RedisRepo {
    
    constructor() {
        this.redis = new Redis({ port, host, db });
        this.redis.on("ready", () => {
            this.redis.config("SET", "notify-keyspace-events", "KEA");
        });
    }
    get(key) {
        return this.redis.get(key);
    }

    hvals(key) {
        return this.redis.hvals(key);
    }

    getKeys = () => {
        return new Promise((resolve, reject) => {
            this.redis.keys('*', (err, keys) => {
                if (err) {
                    reject(err);
                    return;
                }
        
                resolve(keys);
            });
        });
    };

    getValues = keys => {
        return Promise.all(keys.map(key => {

            this.hvals(key)
        }));
    };

    getAll = async () => {
        const keys = await this.getKeys();
        const values = await this.getValues(keys);

        return keys.map((key, index) => ({
            key,
            value: values[index],
        }));
    };

    setExpire(key, value, expire) {
        return this.redis
            .multi()
            .hset(key, value)
            .expire(key, expire)
            .exec();
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

const redisRepo = new RedisRepo();
export default redisRepo;
