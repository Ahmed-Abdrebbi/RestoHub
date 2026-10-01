const { searchMenu } = require("../services/menu.service");
searchMenu("plat avec du poulet").then(console.log).finally(() => process.exit(0));