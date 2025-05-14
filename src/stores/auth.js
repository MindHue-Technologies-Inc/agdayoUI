import { atom } from 'nanostores';

const isBrowser = typeof window !== 'undefined';

// Load from localStorage if available (only in browser)
const savedAuth = isBrowser ? localStorage.getItem('auth') : null;
const initialAuth = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: {
        id: "01JS51EW7Q52ASMDGPXP39FZAE"
      },
      token: null,
      isAuthenticated: false,
      loading: false,
    };

export const useAuthStore = atom(initialAuth);

// Save to localStorage on any change
if (isBrowser) {
  useAuthStore.subscribe((value) => {
    localStorage.setItem('auth', JSON.stringify(value));
  });
}

// Helper functions
export function login({ user, token }) {
  document.cookie = `auth=${encodeURIComponent(JSON.stringify({
    token: token,
    isAuthenticated: true,
  }))}; path=/`;
  useAuthStore.set({
    user,
    token,
    isAuthenticated: true,
    loading: false,
  });
}

export function logout() {
  document.cookie = 'auth=; Max-Age=0; path=/';
  localStorage.removeItem('auth');
  useAuthStore.set({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  });
}

export function setLoading(isLoading) {
  useAuthStore.set({
    ...useAuthStore.get(),
    loading: isLoading,
  });
}

export function updateUser(user) {
  useAuthStore.set({
    ...useAuthStore.get(),
    user,
  });
}
