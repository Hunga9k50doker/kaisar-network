import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import headers from "./utils/headers.js";

function generateUUID() {
  return crypto.randomUUID();
}

function getTokensFromFile() {
  try {
    let tokens = fs
      .readFileSync("tokens.txt", "utf-8")
      .split("\n")
      .filter((token) => token.trim() !== "");
    tokens = tokens.map((token) => token.replace("Bearer%20", "").trim());

    return tokens;
  } catch (error) {
    console.error("Error reading tokens.txt:", error.message || error);
    return [];
  }
}

function saveUUIDToFile(uuid) {
  try {
    fs.appendFileSync("id.txt", uuid + "\n");
    console.log("Extension ID saved to id.txt");
  } catch (error) {
    console.error("Error saving Extension ID to file:", error.message || error);
  }
}

async function startFarmingWithToken(token, index) {
  const extensionId = generateUUID();
  const apiClient = axios.create({
    baseURL: "https://zero-api.kaisar.io/",
    headers: headers(token),
  });

  let miningData = null;

  async function startFarming() {
    try {
      console.log(`Account ${index + 1} Created:`, { extensionId }, "Trying to start farming");
      const response = await apiClient.post("/mining/start", {
        extension: extensionId,
      });
      if (response.status === 200) {
        console.log("Mining started successfully:");
        saveUUIDToFile(extensionId);
      }
      return extensionId;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.error("Error starting mining (HTTP Error):", {
          status,
        });

        if (status === 412) {
          console.warning(
            "Mining already started with another ID.| Mining đã bắt đầu với  một ID khác \nYou must put Manually your extension id in id.txt | Bạn phải cập nhật thủ công bằng cách copy extensionId vào file ids.txt"
          );
          return;
        }
      } else {
        console.error("Error starting mining try again later");
      }
      return null;
    }
  }
  return await startFarming();
}

(async () => {
  const tokens = getTokensFromFile();
  for (let i = 0; i < tokens.length; i++) {
    await startFarmingWithToken(tokens[i], i);
  }
  // for (const token of tokens) {
  //   await startFarmingWithToken(token);
  // }
})();

// export default setup;
