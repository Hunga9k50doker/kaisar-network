import "dotenv/config";

const settings = {
  TIME_PING_EACH_ROUND: process.env.TIME_PING_EACH_ROUND ? parseInt(process.env.TIME_PING_EACH_ROUND) : 5,
  MAX_THEADS: process.env.MAX_THEADS ? parseInt(process.env.MAX_THEADS) : 5,

  USE_PROXY: process.env.USE_PROXY ? process.env.USE_PROXY.toLowerCase() === "true" : false,
};

export { settings };
