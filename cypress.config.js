const { defineConfig } = require('cypress');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  on("before:run", () => {
    const screenshotsFolder = config.screenshotsFolder;
    const videosFolder = config.videosFolder;

    if (fs.existsSync(screenshotsFolder)) {
      fs.rmdirSync(screenshotsFolder, { recursive: true });
    }

    if (fs.existsSync(videosFolder)) {
      fs.rmdirSync(videosFolder, { recursive: true });
    }
  });

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    includeShadowDom: true, // permite acceder al Shadow DOM
    specPattern: 'cypress/e2e/features/**/*.feature',
    chromeWebSecurity: false,
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    supportFile: false,
    sourceMap: false,
    env: {
      STAGING_URL_SIIGO: process.env.STAGING_URL_SIIGO,
      QA_USER: process.env.QA_USER,
      QA_PASSWORD: process.env.QA_PASSWORD,
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/report/mochawesome',
      overwrite: false,
      html: true,
      json: true
    }
  },
});