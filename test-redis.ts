import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://direct-gorilla-32103.upstash.io',
  token: 'AX1nAAIncDE2NGViZTUwZjUxNjI0NzY0YTM1Yjc3NDFhNWIxZDliNHAxMzIxMDM',
});

async function main() {
  try {
    await redis.set('test-key', 'hello');
    const value = await redis.get('test-key');
    console.log('Redis test successful. Value:', value);
    await redis.del('test-key');
  } catch (e: any) {
    console.error('Redis Error:', e.message);
    process.exit(1);
  }
}

main();
