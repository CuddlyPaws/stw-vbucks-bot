const axios = require("axios");
const cheerio = require("cheerio");

const WEBHOOK = process.env.DISCORD_WEBHOOK;
const URL = "https://stw-planner.com";

async function checkVBucks() {

    try {

        const res = await axios.get(URL);
        const $ = cheerio.load(res.data);

        const vbuckTitle = $("h3:contains('VBUCKS AVAILABLE')").text().trim();

        if (vbuckTitle) {

            const missionInfo = $("h3:contains('VBUCKS AVAILABLE')")
                .parent()
                .text()
                .replace(/\s+/g, " ")
                .trim();

            await axios.post(WEBHOOK, {
                content:
`💰 **STW V-BUCK MISSION FOUND**

${missionInfo}

🔗 https://stw-planner.com`
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
            content: "⚠️ Bot error while checking STW missions"
        });

    }

}

checkVBucks();
