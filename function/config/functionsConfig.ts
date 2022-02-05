const environment = process.env.NODE_ENV || "development";

// eslint-disable-next-line
const runtimeConfig = require(`../env.${environment}.json`);

export default runtimeConfig;
