<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="{ 'scrolled': isScrolled }">
    <nav>
      <router-link to="/" class="logo">
        NETFLIX
      </router-link>
      <div class="nav-links">
        <router-link to="/">홈</router-link>
        <router-link to="/popular">인기 콘텐츠</router-link>
        <router-link to="/search">찾아보기</router-link>
        <router-link to="/wishlist">내가 찜한 콘텐츠</router-link>
      </div>
      <div class="user-menu">
        <span class="user-id">사용자</span>
        <button class="logout-btn">로그아웃</button>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  transition: background-color 0.3s ease;
  z-index: 1000;
  
  &.scrolled {
    background-color: #141414;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
  }
}

.logo {
  color: #e50914;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #fff;
    text-decoration: none;
    
    &:hover {
      color: #e5e5e5;
    }
  }
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .user-id {
    color: #fff;
  }
  
  .logout-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>