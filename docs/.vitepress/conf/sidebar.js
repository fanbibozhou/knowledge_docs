import fs from 'fs'
import path from 'path'

export function generateSidebar(dir = 'docs', basePath = '') {
  const fullPath = path.join(process.cwd(), dir, basePath)
  const files = fs.readdirSync(fullPath)

  return files
    .filter(file => !file.startsWith('.') && !['index.md', 'README.md'].includes(file))
    .sort((a, b) => a.localeCompare(b))
    .map(file => {
      const fileSlug = file.replace(/\.md$/, '')
      const relativePath = path.join(basePath, fileSlug).replace(/\\/g, '/') // 关键：保留层级
      const stats = fs.statSync(path.join(fullPath, file))

      if (stats.isDirectory()) {
        return {
          text: formatTitle(fileSlug),
          collapsible: true,
          collapsed: false,
          items: generateSidebar(dir, relativePath) // 传递相对路径
        }
      } else {
        return {
          text: formatTitle(fileSlug),
          link: `/${relativePath}` // 正确：仅基于 basePath，不包含 dir
        }
      }
    })
}

function formatTitle(title) {
  return title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}