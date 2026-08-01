<template>
  <div class="site-portal-grid">
    <div v-for="site in sites" :key="site.name" class="site-card">
      <div class="site-card-header">
        <h3 class="site-name">{{ site.name }}</h3>
        <span class="site-type">{{ site.type }}</span>
      </div>
      <p class="site-desc">{{ site.desc }}</p>
      <div class="site-tags">
        <span v-for="tag in site.tags" :key="tag" class="site-tag">{{ tag }}</span>
      </div>
      <div class="site-actions">
        <a :href="site.officialUrl" target="_blank" rel="noopener noreferrer" class="site-action-official" title="直接访问官网">官网直达 ↗</a>
        <a :href="site.link" class="site-action">分类指南 →</a>
      </div>
    </div>
  </div>
  <p class="disclaimer-text">
    本站为独立第三方教程与评测平台，与相关网站及品牌不存在官方隶属关系。
  </p>
</template>

<script setup lang="ts">
const sites = [
  { name: 'ChatGPT', type: 'AI工具', desc: '打不开、一直转圈、登录与断流问题', tags: ['打不开', '一直转圈', '断流'], link: '/software/ai/', officialUrl: 'https://chatgpt.com' },
  { name: 'Claude', type: 'AI工具', desc: '登录失败与地区限制的排查思路', tags: ['无法登录', '地区限制'], link: '/software/ai/', officialUrl: 'https://claude.ai' },
  { name: 'Gemini', type: 'AI工具', desc: '判断网络问题还是账号地区问题', tags: ['不可用', '账号地区'], link: '/software/ai/', officialUrl: 'https://gemini.google.com' },
  { name: 'Google 搜索', type: 'Google服务', desc: '搜索打不开与验证码频繁出现', tags: ['打不开', '人机验证'], link: '/software/google/', officialUrl: 'https://www.google.com' },
  { name: 'Gmail', type: 'Google服务', desc: '收不到邮件与验证码的排查', tags: ['收不到邮件', '验证码'], link: '/software/google/', officialUrl: 'https://mail.google.com' },
  { name: 'Google Drive', type: 'Google服务', desc: '上传下载失败与同步中断', tags: ['上传失败', '同步中断'], link: '/software/google/', officialUrl: 'https://drive.google.com' },
  { name: 'YouTube', type: '流媒体', desc: '缓冲慢、画质低与无法播放', tags: ['缓冲慢', '无法播放'], link: '/software/streaming/', officialUrl: 'https://www.youtube.com' },
  { name: 'Netflix', type: '流媒体', desc: '检测到代理与地区内容差异', tags: ['检测代理', '地区限制'], link: '/software/streaming/', officialUrl: 'https://www.netflix.com' },
  { name: 'Spotify', type: '流媒体', desc: '地区不可用与无法播放排查', tags: ['地区不可用', '无法播放'], link: '/software/streaming/', officialUrl: 'https://open.spotify.com' },
  { name: 'Telegram', type: '社交通信', desc: '一直连接中与验证码收不到', tags: ['一直连接中', '验证码'], link: '/software/social/', officialUrl: 'https://telegram.org' },
  { name: 'WhatsApp', type: '社交通信', desc: '无法连接服务器与注册问题', tags: ['无法连接', '注册失败'], link: '/software/social/', officialUrl: 'https://www.whatsapp.com' },
  { name: 'Instagram', type: '社交通信', desc: '打不开、图片加载失败排查', tags: ['打不开', '图片加载'], link: '/software/social/', officialUrl: 'https://www.instagram.com' },
  { name: 'Discord', type: '社交通信', desc: '语音连接失败与消息加载问题', tags: ['语音失败', '消息加载'], link: '/software/social/', officialUrl: 'https://discord.com' },
  { name: 'GitHub', type: '开发者', desc: 'Clone 慢、Raw 与 Releases 下载失败', tags: ['Clone超时', '下载失败'], link: '/software/developer/', officialUrl: 'https://github.com' },
  { name: 'Docker Hub', type: '开发者', desc: '拉取镜像超时的排查与加速', tags: ['拉取超时', '镜像加速'], link: '/software/developer/', officialUrl: 'https://hub.docker.com' },
  { name: 'npm', type: '开发者', desc: '依赖安装失败与请求超时', tags: ['安装失败', '请求超时'], link: '/software/developer/', officialUrl: 'https://www.npmjs.com' },
  { name: 'Notion', type: '办公协作', desc: '加载缓慢与图片不显示问题', tags: ['加载慢', '图片不显示'], link: '/software/office/', officialUrl: 'https://www.notion.com' },
  { name: 'Figma', type: '办公协作', desc: '字体图片加载失败与协作卡顿', tags: ['资源加载', '协作卡顿'], link: '/software/office/', officialUrl: 'https://www.figma.com' },
  { name: 'Steam', type: '游戏平台', desc: '商店社区打不开与更新缓慢', tags: ['社区打不开', '更新慢'], link: '/software/gaming/', officialUrl: 'https://store.steampowered.com' },
  { name: 'Shopify', type: '跨境电商', desc: '后台打开慢与固定出口需求', tags: ['后台慢', '固定出口'], link: '/software/ecommerce/', officialUrl: 'https://www.shopify.com' }
]
</script>

<style scoped>
.site-portal-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 24px;
}

@media (max-width: 1024px) {
  .site-portal-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .site-portal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.site-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.site-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.site-name {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: var(--site-text);
}

.site-type {
  font-size: 11px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
}

.site-desc {
  font-size: 13px;
  color: var(--site-text-soft);
  margin: 0 0 12px;
  line-height: 1.5;
  flex-grow: 1;
}

.site-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.site-tag {
  font-size: 11px;
  color: var(--site-text-soft);
  background: var(--site-bg-soft);
  padding: 2px 8px;
  border-radius: 8px;
  white-space: nowrap;
}

.site-actions {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.site-action-official {
  color: var(--site-text-soft);
}

.site-action-official:hover {
  color: var(--vp-c-brand-1);
}

.site-action {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.disclaimer-text {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--site-text-soft);
}
</style>
