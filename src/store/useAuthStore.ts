import create from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        set({ isAuthenticated: true, user: { id: '1', email } });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
