import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const useAuth = () => {
  const router = useRouter()
  const toast = useToast()
  const isAuthenticated = ref(false)
  const loading = ref(false)

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    isAuthenticated.value = !!token
    return isAuthenticated.value
  }

  const login = async (email: string, password: string, remember: boolean) => {
    try {
      loading.value = true
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => u.email === email)

      if (!user || user.password !== password) {
        throw new Error('Invalid credentials')
      }

      // Generate a simple token
      const token = btoa(`${email}:${Date.now()}`)
      localStorage.setItem('token', token)
      
      if (remember) {
        localStorage.setItem('email', email)
      }
      
      isAuthenticated.value = true
      toast.success('로그인 성공!')
      router.push('/')
      return true
    } catch (error) {
      toast.error('이메일 또는 비밀번호가 올바르지 않습니다.')
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string) => {
    try {
      loading.value = true
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (existingUsers.some((user: any) => user.email === email)) {
        toast.error('이미 존재하는 이메일입니다.')
        return false
      }

      existingUsers.push({ 
        email, 
        password,
        createdAt: new Date().toISOString()
      })
      
      localStorage.setItem('users', JSON.stringify(existingUsers))
      toast.success('회원가입 성공!')
      return true
    } catch (error) {
      toast.error('회원가입에 실패했습니다.')
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    isAuthenticated.value = false
    router.push('/signin')
    toast.success('로그아웃되었습니다.')
  }

  return {
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuth
  }
}