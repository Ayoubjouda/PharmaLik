import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import Home from '../app/Home/index';
jest.mock('@gorhom/bottom-sheet');

afterEach(cleanup);
describe('App', () => {
  it('should Redirect to HomeScreen on Load', () => {
    const { getByTestId } = render(<Home />);
    const homePage = getByTestId('Home-Screen');
    expect(homePage).toBeTruthy();
  });
});
