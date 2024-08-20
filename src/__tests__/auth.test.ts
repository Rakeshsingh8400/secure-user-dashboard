import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from '../pages/SignIn';
import { useAuthStore } from '../store/useAuthStore';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../store/useAuthStore');

test('renders Sign In page', () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});

test('login button works', async () => {
  (useAuthStore as jest.Mock).mockReturnValue({
    login: jest.fn().mockResolvedValue({}),
    isAuthenticated: true,
  });

  render(
    <Router>
      <SignIn />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/sign in/i));

  expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
});
