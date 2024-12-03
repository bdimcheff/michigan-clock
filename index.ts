import { BskyAgent, RichText } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';

dotenv.config();

// Create a Bluesky Agent
const agent = new BskyAgent({
    service: 'https://bsky.social',
  })


async function main() {
    // number of days since november 30, 2019
    const daysSince = Math.floor((Date.now() - new Date('2019-11-30').getTime()) / (1000 * 60 * 60 * 24));

    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})
    const skeet = new RichText({
        text: `Ohio State has not beaten Michigan in football for ${daysSince} days. #GoBlue #Michigan #BeatOhio`,
    })
    await skeet.detectFacets(agent)

    const skeetRecord = {
        $type: 'app.bsky.feed.post',
        text: skeet.text,
        facets: skeet.facets,
        createdAt: new Date().toISOString(),
    }
    if (process.env.ACTUALLY_SKEET === 'true') {
        await agent.post(skeetRecord);
    }
    console.log(`[${new Date().toISOString()}] ${skeet.text}`)
}

console.log(`[${new Date().toISOString()}] Booted up, user is ${process.env.BLUESKY_USERNAME!}!`);

main();


// Run this on a cron job
// const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
// const scheduleExpression = '0 8 * * *'; // Run at 8am irl

// const job = new CronJob(scheduleExpression, main); // change to scheduleExpressionMinute for testing

// job.start();
