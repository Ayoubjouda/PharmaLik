import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Modal } from 'components';
import { Text } from 'react-native';

describe('Modal component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Modal
        title="Test Modal"
        isOpen={true}
      >
        <Text>Modal Content</Text>
      </Modal>
    );

    const modalTitle = getByText('Test Modal');
    expect(modalTitle).toBeTruthy();

    const modalContent = getByText('Modal Content');
    expect(modalContent).toBeTruthy();
  });
  it('renders correctly without title', () => {
    const { queryByText } = render(
      <Modal isOpen={true}>
        <Text>Modal Content</Text>
      </Modal>
    );

    const modalTitle = queryByText('Test Modal');
    expect(modalTitle).toBeNull();

    const modalContent = queryByText('Modal Content');
    expect(modalContent).toBeTruthy();
  });
  it('does not render when isOpen is false', () => {
    const { queryByTestId } = render(
      <Modal isOpen={false}>
        <Text>Modal Content</Text>
      </Modal>
    );

    const modalContainer = queryByTestId('modal-container');
    expect(modalContainer).toBeNull();
  });
  it('calls setIsOpen function when close button is clicked', () => {
    const setIsOpen = jest.fn();

    const { getByTestId } = render(
      <Modal
        isOpen={true}
        setIsOpen={setIsOpen}
      >
        <Text>Modal Content</Text>
      </Modal>
    );

    const closeButton = getByTestId('close-button');
    fireEvent.press(closeButton);

    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });
});
