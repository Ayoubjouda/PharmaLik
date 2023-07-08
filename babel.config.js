module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
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
      require.resolve('expo-router/babel'),
    ],
  };
};
