const axios = require("axios");

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2";

async function embedText(text) {
  try {
    const response = await axios.post(
      `https://router.huggingface.co/hf-inference/models/${MODEL_ID}/pipeline/feature-extraction`,
      { inputs: [text] },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("Erreur Hugging Face:", error.response ? error.response.data : error.message);
    throw new Error("Erreur lors de la création de l'embedding");
  }
}

module.exports = { embedText };