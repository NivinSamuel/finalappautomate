const additonalEnvironments = require("./environments");

if (!additonalEnvironments.test_settings)
  additonalEnvironments.test_settings = {};

const browserStack = {
  webdriver: {
    start_process: false
  },
  selenium: {
    host: 'hub.browserstack.com',
    port: 443
  },
  desiredCapabilities: {
    'bstack:options': {
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      appiumVersion: '1.22.0',
      buildName: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-appium-nightwatch-example-build", // <-- ✅ ADD THIS
    }
  }
}

const nightwatchConfigs = {
  src_folders: [],
  live_output: true,
  plugins: ['@nightwatch/browserstack'],

  // browserstack plugin settings...
  '@nightwatch/browserstack': {
    browserstackLocal: false,
    test_observability: {
      enabled: true,
      user: process.env.BROWSERSTACK_USERNAME,
      key: process.env.BROWSERSTACK_ACCESS_KEY,
      projectName: "browserstack-appium-nightwatch-example-project",
      buildName: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-appium-nightwatch-example-build",
    }
  },

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },

    browserstack: {
      ...browserStack
    },

    "browserstack.android_01": {
      extends: 'browserstack',
      'desiredCapabilities': {
        browserName: null,
        'appium:options': {
          automationName: 'UiAutomator2',
          app: 'bs://b190a4a3e1399d8d18aae8ca4151e8adb4e00642', // updated Android app_url
          platformVersion: '11.0',
          deviceName: 'Google Pixel 5'
        }
      }
    },

    "browserstack.ios_01": {
      extends: 'browserstack',
      'desiredCapabilities': {
        browserName: null,
        'appium:options': {
          automationName: 'XCUITest',
          app: 'bs://635a400afae5827d0f243d2bc470d64092502e7f', // updated iOS app_url
          platformVersion: '16',
          deviceName: 'iPhone 14'
        }
      }
    },
  }
}

for (let key in additonalEnvironments.test_settings) {
  nightwatchConfigs.test_settings[key] = {
    ...browserStack,
    ...additonalEnvironments.test_settings[key]
  };
}

module.exports = nightwatchConfigs;
