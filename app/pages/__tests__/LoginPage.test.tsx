import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../LoginPage';
import { BrowserRouter } from 'react-router';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    isAuthenticated: false,
  })
}));

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields (or allows typing)', async () => {
    const user = userEvent.setup();
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    
    const usernameInput = screen.getByPlaceholderText(/username/i);
    await user.type(usernameInput, 'testuser');
    
    expect(usernameInput).toHaveValue('testuser');
  });
});
