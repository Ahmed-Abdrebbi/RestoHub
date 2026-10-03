require("dotenv").config()


fetch("https://api.groq.com/openai/v1/models", {
    headers: {Authorization: `Bearer ${process.env.GROQ_API_KEY}`},
})
  .then((res) => res.json())
  .then((data) => console.log("SUCCESS:", JSON.stringify(data).slice(0, 200)))
  .catch((err) => {
    console.error("ERROR MESSAGE:", err.message)
    console.error("ERROR CAUSE:", err.cause)
  })