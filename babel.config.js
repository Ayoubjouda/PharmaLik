module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'expo-router/babel',
      'nativewind/babel',
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['./app'],
          alias: {
            components: './app/components',
            screens: './app/screens',
            utils: './app/utils',
          },
        },
      ],
    ],
  };
};
