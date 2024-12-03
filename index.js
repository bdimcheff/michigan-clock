"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@atproto/api");
const dotenv = __importStar(require("dotenv"));
const process = __importStar(require("process"));
dotenv.config();
// Create a Bluesky Agent
const agent = new api_1.BskyAgent({
    service: 'https://bsky.social',
});
async function main() {
    // number of days since november 30, 2019
    const daysSince = Math.floor((Date.now() - new Date('2019-11-30').getTime()) / (1000 * 60 * 60 * 24));
    await agent.login({ identifier: process.env.BLUESKY_USERNAME, password: process.env.BLUESKY_PASSWORD });
    const skeet = new api_1.RichText({
        text: `Ohio State has not beaten Michigan in football for ${daysSince} days. #GoBlue #Michigan #BeatOhio`,
    });
    await skeet.detectFacets(agent);
    const skeetRecord = {
        $type: 'app.bsky.feed.post',
        text: skeet.text,
        facets: skeet.facets,
        createdAt: new Date().toISOString(),
    };
    if (process.env.ACTUALLY_SKEET === 'true') {
        await agent.post(skeetRecord);
    }
    console.log(`[${new Date().toISOString()}] ${skeet.text}`);
}
console.log(`[${new Date().toISOString()}] Booted up, user is ${process.env.BLUESKY_USERNAME}!`);
main();
// Run this on a cron job
// const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
// const scheduleExpression = '0 8 * * *'; // Run at 8am irl
// const job = new CronJob(scheduleExpression, main); // change to scheduleExpressionMinute for testing
// job.start();
