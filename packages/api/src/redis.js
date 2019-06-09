import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;
const redisURL = process.env.REDIS_URL;
let client;

if (env === 'production') {
  client = redis.createClient({
    url: redisURL,
  });
}

function redisMiddleware(req, res, next) {
  const key = `__cached__${req.originalUrl}` || req.url;

  if (env !== 'production') {
    next();
    return;
  }

  client.get(key, (_, reply) => {
    if (reply) {
      res.json(JSON.parse(reply));
      return;
    }

    res.sendResponse = res.json;
    res.json = body => {
      client.set(key, JSON.stringify(body), 'EX', 3600);
      res.sendResponse(body);
    };

    next();
  });
}

export default redisMiddleware;
