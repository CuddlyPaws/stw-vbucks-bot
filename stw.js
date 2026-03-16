const axios = require("axios");

const WEBHOOK = process.env.DISCORD_WEBHOOK;

// STW Planner API endpoint
const API = "https://api.stw-planner.com/v1/mission-alerts";

async function checkVBucks() {
  try {
    const res = await axios.get(API);
    const missions = res.data;

    const vbuckMissions = missions.filter(m =>
      m.rewards && m.rewards.some(r => r.type === "vbucks")
    );

    if (vbuckMissions.length > 0) {
      let msg = "💰 **V-Bucks missions today!**\n\n";

      vbuckMissions.forEach(m => {
        msg += `${m.zone} - ${m.missionType}\n`;
      });

      await axios.post(WEBHOOK, { content: msg });
    } else {
      await axios.post(WEBHOOK, {
        content: "❌ **No V-Bucks mission today**"
      });
    }

  } catch (err) {
    await axios.post(WEBHOOK, {
      content: "⚠️ Error checking missions"
    });
  }
}

checkVBucks();
