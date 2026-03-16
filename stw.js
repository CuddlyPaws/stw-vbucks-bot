const axios = require("axios");
const cheerio = require("cheerio");

const WEBHOOK = process.env.DISCORD_WEBHOOK;
const URL = "https://stw-planner.com";

async function checkVBucks() {

    try {

        const res = await axios.get(URL);
        const $ = cheerio.load(res.data);

        const title = $("h3:contains('VBUCKS')").text();

        if (title.includes("VBUCKS")) {

            await axios.post(WEBHOOK, {
                content: "💰 **STW VBUCK MISSION TODAY!**\nhttps://stw-planner.com"
            });

        } else {

            await axios.post(WEBHOOK, {
                content: "❌ **No V-Bucks mission today**"
            });

        }

    } catch (err) {

        await axios.post(WEBHOOK, {
            content: "⚠️ Error checking STW missions"
        });

    }

}

checkVBucks();
