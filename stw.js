const axios = require("axios");
const cheerio = require("cheerio");

const WEBHOOK = process.env.DISCORD_WEBHOOK;
const URL = "https://stw-planner.com";

async function checkVBucks() {

    try {

        const res = await axios.get(URL);
        const page = res.data;

        if (page.includes("VBUCKS AVAILABLE")) {

            await axios.post(WEBHOOK, {
                content:
`💰 **V-Bucks mission available today!**

Check details:
https://stw-planner.com`
            });

        } else {

            await axios.post(WEBHOOK, {
                content:
`❌ **No V-Bucks mission today**

Checked automatically at 5:30 AM IST`
            });

        }

    } catch (err) {

        await axios.post(WEBHOOK, {
            content: "⚠️ Error checking STW missions"
        });

    }

}

checkVBucks();
