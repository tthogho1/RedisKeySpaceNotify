import express from "express";
import redisRepo from "./redis.repo.js";
import RedisExpiredEvents from './redis.expired-events.js';

const app = express();

RedisExpiredEvents();

app.get('/', function (req, res) {
    res.sendFile('c:\\SourceCode\\RedisKeySpaceNotify\\src\\public\\index.html');
});

app.post("/create", function (req, res) {

    redisRepo.setExpire("test1", {
        "key1": "value1",
        "key2": "value2"
    },30);

    redisRepo.setExpire("test2", {
        "key1": "value1",
        "key2": "value2"
    },30);

    redisRepo.hvals("test").then((value) => {
        console.log(value);
        //res.send(value);
    });

    redisRepo.getAll().then(values => {
        console.log(values);   
    })
    //res.send(req.body.msg);
});


app.get
app.listen(3000, () => console.log("Successfully started server"));