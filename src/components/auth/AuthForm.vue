<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  isLogin: boolean
}>()

const emit = defineEmits<{
  submit: [{ email: string; password: string; rememberMe?: boolean; agreeToTerms?: boolean }]
}>()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rememberMe = ref(false)
const agreeToTerms = ref(false)
const passwordError = ref('')

watch(() => props.isLogin, () => {
  // Reset form when switching between login and register
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  rememberMe.value = false
  agreeToTerms.value = false
  passwordError.value = ''
})

const validatePasswords = () => {
  if (!props.isLogin && password.value !== confirmPassword.value) {
    passwordError.value = '비밀번호가 일치하지 않습니다.'
    return false
  }
  passwordError.value = ''
  return true
}

const handleSubmit = () => {
  if (!validatePasswords()) return

  emit('submit', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
    agreeToTerms: agreeToTerms.value
  })
}
</script>

<template>
  <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div>
        <label for="email" class="text-sm font-medium text-gray-300">이메일</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label for="password" class="text-sm font-medium text-gray-300">비밀번호</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          minlength="6"
          class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div v-if="!isLogin">
        <label for="confirmPassword" class="text-sm font-medium text-gray-300">비밀번호 확인</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          required
          minlength="6"
          class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
      </div>

      <div v-if="isLogin" class="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          v-model="rememberMe"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-300">
          자동 로그인
        </label>
      </div>

      <div v-if="!isLogin" class="flex items-center">
        <input
          id="terms"
          type="checkbox"
          v-model="agreeToTerms"
          required
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
        />
        <label for="terms" class="ml-2 block text-sm text-gray-300">
          이용약관에 동의합니다
        </label>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ isLogin ? '로그인' : '회원가입' }}
      </button>
    </div>
  </form>
</template>