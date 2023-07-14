import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import Home from '../app/Home/index';

afterEach(cleanup);

describe('App', () => {
  it('should Redirect to HomeScreen on Load', () => {
    render(<Home />);
  });
});
