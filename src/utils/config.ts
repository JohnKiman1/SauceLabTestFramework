/**
 * Configuration helper
 * Loads environment variables
 */

export const config = {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    isCI: process.env.CI === 'true' || false,
    testEnv: process.env.TEST_ENV || 'development',
};

export default config;