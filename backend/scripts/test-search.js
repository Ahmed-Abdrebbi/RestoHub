const { searchMenu } = require("../src/services/menu.service");

searchMenu("plat avec du poulet")
  .then((results) => {
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERREUR:", err);
    process.exit(1);
  });