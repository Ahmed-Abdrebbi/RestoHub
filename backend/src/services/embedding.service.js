let embedderPromise = null;

async function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = import("@huggingface/transformers").then(({ pipeline }) =>
      pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
    );
  }
  return embedderPromise;
}

async function embedText(text) {
  const extractor = await getEmbedder();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

module.exports = { embedText };