<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useToast } from 'vue-toastification'
import AuthForm from '../components/auth/AuthForm.vue'

const isLogin = ref(true)
const { login, register, loading } = useAuth()
const toast = useToast()

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleSubmit = async (data: { 
  email: string
  password: string
  rememberMe?: boolean
  agreeToTerms?: boolean 
}) => {
  if (!validateEmail(data.email)) {
    toast.error('유효한 이메일 주소를 입력해주세요.')
    return
  }

  if (isLogin.value) {
    await login(data.email, data.password, data.rememberMe || false)
  } else {
    if (!data.agreeToTerms) {
      toast.error('약관에 동의해주세요.')
      return
    }
    const success = await register(data.email, data.password)
    if (success) {
      isLogin.value = true
    }
  }
}

const toggleForm = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-500">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white">
          {{ isLogin ? '로그인' : '회원가입' }}
        </h2>
      </div>
      
      <AuthForm
        :is-login="isLogin"
        @submit="handleSubmit"
      />

      <div class="text-center">
        <button
          @click="toggleForm"
          class="text-sm text-blue-400 hover:text-blue-500 transition-colors duration-200"
        >
          {{ isLogin ? '회원가입하기' : '로그인하기' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-enter-active,
.form-leave-active {
  transition: opacity 0.5s ease;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
}
</style>