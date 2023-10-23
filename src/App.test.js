import App from './App';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

jest.mock('@studio-freight/lenis');
jest.mock('./components/Navigation/NavItem');

test('renders little lemon title', () => {
  render(<App />);
  const title = screen.getByText(/little lemon/i);
  expect(title).toBeInTheDocument();
});

// test('renders table reservation formtitle', () => {
test('renders table reservation buttons', () => {
  render(<App />);
  const reservationBtns = screen.getAllByRole('button', { name: /reserve your table/i });
  expect(reservationBtns.length).toBe(2);
  // userEvent.click(reservationBtns[0]);
})