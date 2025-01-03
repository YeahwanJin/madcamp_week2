const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
console.log("Loaded API Key:", process.env.OPENAI_API_KEY); // 디버깅 로그 추가

module.exports = openai;