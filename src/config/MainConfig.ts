export const CONFIG_PRODUCTION_VERSION = process.env.APP_PRODUCTION_VERSION;
export const CONFIG_NETWORK_NAME = process.env.APP_NETWORK_NAME;

export const CONFIG_TYMT_RELEASE_DATE = process.env.APP_TYMT_RELEASE_DATE;
export const CONFIG_TYME_VERSION = process.env.APP_TYMT_VERSION;

export const CONFIG_SOLAR_API_URL = process.env.APP_NETWORK_NAME === "mainnet" ? process.env.APP_MAINNET_SOLAR_URL : process.env.APP_TESTNET_SOLAR_URL;
export const CONFIG_SOLAR_WSS_URL = process.env.APP_NETWORK_NAME === "mainnet" ? process.env.APP_MAINNET_SOLAR_WSS_URL : process.env.APP_TESTNET_SOLAR_WSS_URL;
