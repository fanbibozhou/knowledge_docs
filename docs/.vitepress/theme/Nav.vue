<template>
  <div class="nav-page">
    <div v-for="group in navGroups" :key="group.title" class="nav-group">
      <h2 class="group-title">{{ group.title }}</h2>
      <div class="nav-items">
        <a 
          v-for="item in group.items" 
          :key="item.link"
          :href="item.link"
          class="nav-item"
          @mouseover="hoverItem = item.link"
          @mouseleave="hoverItem = null"
        >
          <span v-if="item.icon" class="icon">{{ item.icon }}</span>
          <div class="content">
            <div class="text">{{ item.text }}</div>
            <div v-if="item.desc" class="desc">{{ item.desc }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { navGroups } from './navData'

const hoverItem = ref<string | null>(null)
</script>

<style scoped>
.nav-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.nav-group {
  margin-bottom: 2rem;
}

.group-title {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.nav-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.nav-item {
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s, box-shadow 0.2s;
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.icon {
  font-size: 24px;
  margin-right: 1rem;
}

.content {
  flex: 1;
}

.desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}
</style>