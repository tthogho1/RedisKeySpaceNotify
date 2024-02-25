import PubSub from "./pubsub.js";
import RedisRepo from "./redis.repo.js";
const redisRepo = new RedisRepo();

export default function RedisExpiredEvents() {
    //PubSub.subscribe("__keyevent@0__:expired");
    //PubSub.subscribe("__keyevent@0__:set");
    PubSub.subscribe("__keyspace@0__:set");
    //PubSub.subscribe("__keyevent@0__:del");
    
    PubSub.on("message", async (channel, message) => {
        const [type, key] = message.split(":");
        switch (type) {
            case "reminder": {
                const value = await redisRepo.get(key);
                console.log("TYPE: ", type);
                console.log("KEY: ", key);
                console.log("VALUE: ", value);
            
                break;
            }
        }
    });
}