import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../LoginPage';
import { BrowserRouter } from 'react-router';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
  })
}));

describe('LoginPage', () => {
  it('renders sign in button', () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows redirect message', () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    expect(screen.getByText(/redirected to the central login/i)).toBeInTheDocument();
  });
});
