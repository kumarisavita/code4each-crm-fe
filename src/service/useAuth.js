import { useRouter } from 'vue-router';
import { ref } from 'vue';
import api from './api';


export function useAuth() {
const router = useRouter();

  const isAuthenticated = ref(!!localStorage.getItem('access_token'));

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      // Handle logout error
    }

    localStorage.removeItem('access_token');
    isAuthenticated.value = false;
    router.push('/login');
    // Redirect or perform necessary actions after logout
  };

  return { isAuthenticated, logout };
}