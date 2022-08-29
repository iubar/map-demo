const config = {
    preset: "jest-expo",
    //testTimeout: 20000,
    setupFiles: [
        "./jestSetup.js",
    ],
     
    transformIgnorePatterns: [
        'node_modules/(?!(' +
            '(jest-)?react-native' +
            '|@react-native(-community)?' +
        ')' +
        '|expo(nent)?|@expo(nent)?/.*' +
        '|@expo-google-fonts/.*' +
        '|react-navigation' +
        '|@react-navigation/.*' +
        '|@unimodules/.*' +
        '|unimodules' +
        '|sentry-expo' +
        '|@sentry' +
        '|native-base' +
        '|react-native-svg' +
        ')'
      ]
    
};

module.exports = config;
