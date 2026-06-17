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
  it('renders sign in button in dev mode', () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /sign in with token/i })).toBeInTheDocument();
  });

  it('shows token input', () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/paste keycloak access token/i)).toBeInTheDocument();
  });
});
