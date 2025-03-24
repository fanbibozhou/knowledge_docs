<template>
  <div class="nav-container">
    <!-- 左侧主内容 -->
    <div class="nav-content">
      <div 
        v-for="group in navGroups" 
        :key="group.id"
        :id="group.id"
        class="nav-group"
      >
        <h2 class="group-title">{{ group.title }}</h2>
        <div class="nav-items">...</div>
      </div>
    </div>

    <!-- 右侧锚点导航 -->
    <div class="nav-anchor">
      <div class="anchor-title">分类导航</div>
      <a 
        v-for="group in navGroups"
        :key="group.id"
        :href="`#${group.id}`"
        class="anchor-link"
        :class="{ active: activeAnchor === group.id }"
      >
        {{ group.title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { navGroups } from './navData'

const activeAnchor = ref('')

// 监听滚动并高亮对应锚点
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeAnchor.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 } // 50%可见时触发
  )

  navGroups.forEach(group => {
    const el = document.getElementById(group.id)
    if (el) observer.observe(el)
  })

  // 清理
  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.nav-container {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  gap: 32px;
}

.nav-content {
  flex: 1;
}

.nav-anchor {
  position: sticky;
  top: 80px;
  width: 200px;
  height: fit-content;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.anchor-title {
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.anchor-link {
  display: block;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: all 0.3s;
}

.anchor-link:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft-up);
}

.anchor-link.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-light);
  color: white;
}
</style>