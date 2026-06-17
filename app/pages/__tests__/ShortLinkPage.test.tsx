import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ShortLinkPage from '../ShortLinkPage';
import { createMemoryRouter, RouterProvider } from 'react-router';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: true,
    isLoading: false,
  })
}));

describe('ShortLinkPage', () => {
  it('renders the form and toggles custom alias', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter([
      {
        path: '/',
        element: <ShortLinkPage />,
        loader: () => ({ shortLinks: [] }),
        HydrateFallback: () => null,
      }
    ]);
    
    render(<RouterProvider router={router} />);
    
    expect(await screen.findByText(/customize short link/i)).toBeInTheDocument();
    
    const toggle = screen.getByRole('checkbox', { name: /customize short link/i });
    await user.click(toggle);
    
    expect(screen.getByPlaceholderText(/my-custom-alias/i)).toBeInTheDocument();
  });
});
