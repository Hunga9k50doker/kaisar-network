import { axios, banner, headers, readline, logger, fs } from "./utils/exporter.js";
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

function saveTokenToFile(token) {
  try {
    fs.appendFileSync("tokens.txt", token + "\n");
    console.log("Access token saved to tokens.txt");
  } catch (error) {
    console.error("Error saving token to file:", error.message);
  }
}

async function loginUser(email, password) {
  try {
    const response = await axios.post("https://zero-api.kaisar.io/auth/login", { email, password }, { headers: { "Content-Type": "application/json" } });

    if (response.data) {
      const token = response.data.data.accessToken;
      console.log(`Login successful for ${email} Token:`, token);

      saveTokenToFile(token);
    } else {
      console.error(`Login failed for ${email}:`, response.data.message);
    }
  } catch (error) {
    console.error(`Error during login for ${email} make sure you already confirm email`);
  }
}

async function registerUser(email, password) {
  try {
    const response = await axios.post("https://zero-api.kaisar.io/auth/register", {
      ...headers,
      email: email,
      password: password,
    });
    if (response.data) {
      console.log(`Registration successful for ${email}:`, response.data);
      console.log("Check your inbox to confirm your email...\nThen Rerun this script to login...");
    } else {
      console.error(`Registration failed for ${email}:`, response.data.message);
    }
  } catch (error) {
    if (error.response?.data?.error?.code === 410) {
      console.log(`Email already exists for ${email}, trying to login...`);
      await loginUser(email, password);
    } else {
      console.error(`Error during registration for ${email} Please try again..`);
    }
  }
}

async function processAllUsers() {
  try {
    logger(banner, "warn");
    const data = fs
      .readFileSync("data.txt", "utf-8")
      .split("\n")
      .filter((data) => data.trim() !== "");
    if (data.length <= 0) {
      logger("No data found in data.txt", "warn");
      process.exit(0);
    }

    for (const item of data) {
      const res = item.trim().split("|");
      const email = res[0];
      const password = res[1];
      logger(`Authenticating for ${email}.....`, "warn");

      await registerUser(email, password);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error("Error reading data.txt file:", error.message);
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  process.exit(0);
}

processAllUsers();
