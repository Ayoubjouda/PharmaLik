import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';

import Button from 'components/Button';

afterEach(cleanup);

describe('Custom Button tests', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId('custom-button');

    expect(button).toBeTruthy();
  });

  it('displays the correct label', () => {
    const label = 'Click me';
    const { getByTestId } = render(
      <Button
        label={label}
        disabled
      />
    );
    const buttonLabel = getByTestId('custom-button');

    expect(buttonLabel).toBeTruthy();
    expect(buttonLabel).toHaveTextContent(label);
  });

  it('dsiplay disabled button', () => {
    const { getByTestId } = render(<Button disabled />);
    const button = getByTestId('custom-button');

    expect(button).toBeTruthy();
    expect(button).toBeDisabled();
  });

  it('calls the onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Button onPress={onPressMock} />);
    const button = getByTestId('custom-button');

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
