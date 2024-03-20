const Redis = require('ioredis');

const redisUri = process.env.REDIS_URI;
const redis = new Redis(redisUri);

redis.set('key', 'hello world');

redis.get('key').then((result) => {
  console.log(`The value of key is: ${result}`);
  redis.disconnect();
});
