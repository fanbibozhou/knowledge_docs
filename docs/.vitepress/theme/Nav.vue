<!-- .vitepress/theme/Nav.vue -->
<template>
  <div class="nav-container">
    <!-- 主内容区 -->
    <div class="nav-content">
      <template v-if="navGroups?.length > 0">
        <div 
          v-for="group in navGroups"
          :key="group.id"
          :id="group.id"
          class="nav-group"
        >
          <h2 class="group-title">{{ group.title }}</h2>
          <div class="nav-items">
            <a
              v-for="item in group.items"
              :key="item.link"
              :href="item.link"
              :target="isExternalLink(item.link) ? '_blank' : '_self'"
              :rel="isExternalLink(item.link) ? 'noopener noreferrer' : undefined"
              class="nav-item"
            >
              <span v-if="item.icon" class="icon">
                <img
                  v-if="isImageUrl(item.icon)"
                  :src="item.icon"
                  class="custom-icon"
                  @error="handleIconError"
                />
                <span v-else>{{ item.icon }}</span>
              </span>
              <div class="content">
                <div class="text">{{ item.text }}</div>
                <div v-if="item.desc" class="desc">{{ item.desc }}</div>
              </div>
              <span v-if="isExternalLink(item.link)" class="external-indicator">
                ↗
              </span>
            </a>
          </div>
        </div>
      </template>
      <div v-else class="empty-tip">
        导航数据为空，请检查配置
      </div>
    </div>

    <!-- 右侧锚点导航 -->
    <div class="nav-anchor">
      <div class="anchor-title">快速导航</div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { navGroups } from './navData'

const activeAnchor = ref('')

// 链接类型判断
const isExternalLink = (url: string) => /^(https?:)?\/\//.test(url)
const isImageUrl = (url: string) => /\.(jpg|jpeg|png|gif|svg|webp)(\?.*)?$/.test(url)

// 图标加载失败处理
const handleIconError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

// 滚动锚点监听
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeAnchor.value = entry.target.id
        }
      })
    },
    { rootMargin: '-50px 0px -50% 0px' }
  )

  navGroups.forEach(group => {
    const el = document.getElementById(group.id)
    el && observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.nav-container {
  display: flex;
  gap: 32px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
}

.nav-content {
  flex: 1;
  min-width: 0;
}

.nav-group {
  margin-bottom: 3rem;
  scroll-margin-top: 80px;
}

.group-title {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-divider-light);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.nav-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  transition: all 0.25s ease;
  position: relative;
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.custom-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.content {
  flex: 1;
  min-width: 0;
}

.text {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.external-indicator {
  margin-left: 8px;
  color: var(--vp-c-text-3);
  opacity: 0.6;
}

.nav-anchor {
  position: sticky;
  top: 80px;
  width: 200px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}

.anchor-title {
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.anchor-link {
  display: block;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  transition: all 0.25s ease;
}

.anchor-link.active {
  background: var(--vp-c-brand);
  color: white;
}

@media (max-width: 960px) {
  .nav-container {
    flex-direction: column;
    padding: 16px;
  }
  
  .nav-anchor {
    display: none;
  }
}
</style>