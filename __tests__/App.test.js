import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import App from '../app/index';

afterEach(cleanup);

describe('App', () => {
  it('should show hello world', () => {
    render(<App />);
  });
});
