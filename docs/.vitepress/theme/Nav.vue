<template>
  <div class="nav-container">
    <!-- 左侧主内容区 -->
    <div class="nav-content">
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
            <!-- 图标处理（支持外部图片/Emoji/图标库） -->
            <span v-if="item.icon" class="icon">
              <img
                v-if="isImageUrl(item.icon)"
                :src="item.icon"
                :alt="`${item.text} icon`"
                class="custom-icon"
                loading="lazy"
                @error="handleIconError"
              />
              <span v-else>{{ item.icon }}</span>
            </span>
            
            <!-- 文本内容 -->
            <div class="content">
              <div class="text">{{ item.text }}</div>
              <div v-if="item.desc" class="desc">{{ item.desc }}</div>
            </div>
            
            <!-- 外部链接标识 -->
            <span v-if="isExternalLink(item.link)" class="external-indicator">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </a>
        </div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { navGroups } from './navData'

const activeAnchor = ref('')

// 判断是否为外部链接
const isExternalLink = (url: string) => {
  return /^(https?:)?\/\//.test(url)
}

// 判断是否为图片URL
const isImageUrl = (url: string) => {
  return /\.(jpg|jpeg|png|gif|ico|svg)(\?.*)?$/.test(url)
}

// 图标加载失败处理
const handleIconError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
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
    { 
      threshold: 0.1,
      rootMargin: '-50px 0px -50% 0px' // 优化触发区域
    }
  )

  navGroups.forEach(group => {
    const el = document.getElementById(group.id)
    if (el) observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.nav-container {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  gap: 32px;
  padding: 0 24px;
}

/* 主内容区 */
.nav-content {
  flex: 1;
  min-width: 0; /* 防止flex溢出 */
}

.nav-group {
  margin-bottom: 3rem;
  scroll-margin-top: 80px; /* 锚点偏移补偿 */
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
  transition: all 0.25s ease;
  position: relative;
  border: 1px solid var(--vp-c-border);
}

.nav-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.icon {
  display: inline-flex;
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
  min-width: 0; /* 防止文本溢出 */
}

.text {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: 4px;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.external-indicator {
  margin-left: 8px;
  color: var(--vp-c-text-3);
  opacity: 0.6;
}

/* 右侧锚点导航 */
.nav-anchor {
  position: sticky;
  top: 80px;
  width: 200px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
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

.anchor-link:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft-up);
}

.anchor-link.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-light);
  color: white;
}

/* 响应式设计 */
@media (max-width: 960px) {
  .nav-container {
    flex-direction: column;
    gap: 0;
  }
  
  .nav-anchor {
    display: none;
  }
  
  .nav-group {
    margin-bottom: 2rem;
  }
}

/* 暗色模式适配 */
.dark .nav-item:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}
</style>