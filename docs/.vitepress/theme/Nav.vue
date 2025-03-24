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
              class="nav-item"
            >
              <!-- 图标渲染逻辑保持不变 -->
              <span v-if="item.icon" class="icon">...</span>
              <div class="content">
                <div class="text">{{ item.text }}</div>
                <div v-if="item.desc" class="desc">{{ item.desc }}</div>
              </div>
            </a>
          </div>
        </div>
      </template>
      <div v-else class="empty-tip">
        暂无导航数据，请检查 navData.ts 配置
      </div>
    </div>

    <!-- 右侧锚点导航 -->
    <div class="nav-anchor">...</div>
  </div>
</template>

<script setup lang="ts">
import { navGroups } from './navData' // 确保路径正确

// 调试输出
console.log('加载的导航数据:', navGroups)

// 其他逻辑保持不变...
</script>

<style scoped>
/* 确保基础样式存在 */
.nav-container {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.nav-content {
  flex: 1;
}

/* 如果样式仍不生效，尝试添加 !important */
.nav-item {
  display: flex !important; 
  padding: 12px !important;
  background: var(--vp-c-bg-soft) !important;
}
</style>