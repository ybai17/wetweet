import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn';

jest.mock('../security/AuthContext', () => ({
  useAuthUser: () => ({
    login: jest.fn()
  })
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the sign in form correctly', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    expect(screen.getByRole('region', { name: 'Sign in form' })).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText('New to Weiter?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create an account' })).toHaveAttribute('href', '/signup');
  });

  test('shows validation error when fields are empty', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    const mockLogin = jest.fn().mockResolvedValue({});
    jest.mock('../security/AuthContext', () => ({
      useAuthUser: () => ({
        login: mockLogin
      })
    }));

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { name: 'username', value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { name: 'password', value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  test('shows error message when login fails', async () => {
    const errorMessage = 'Invalid credentials';
    const mockLogin = jest.fn().mockRejectedValue(new Error(errorMessage));
    jest.mock('../security/AuthContext', () => ({
      useAuthUser: () => ({
        login: mockLogin
      })
    }));

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { name: 'username', value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { name: 'password', value: 'wrongpass' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  test('shows loading state during submission', async () => {
    const mockLogin = jest.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    jest.mock('../security/AuthContext', () => ({
      useAuthUser: () => ({
        login: mockLogin
      })
    }));

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { name: 'username', value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { name: 'password', value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(await screen.findByText('Signing In...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});