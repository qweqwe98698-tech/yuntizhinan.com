<template>
  <div class="scenario-grid">
    <a v-for="scene in scenarios" :key="scene.title" :href="scene.link" class="site-card">
      <h3 class="scene-title">{{ scene.title }}</h3>
      <p class="scene-desc">{{ scene.desc }}</p>
      <div class="scene-services">
        相关服务: <span>{{ scene.services.join('、') }}</span>
      </div>
      <ul class="scene-list">
        <li v-for="item in scene.items" :key="item">{{ item }}</li>
      </ul>
      <div class="scene-action">查看全部 →</div>
    </a>
  </div>
</template>

<script setup lang="ts">
const scenarios = [
  {
    title: 'AI 工具',
    desc: '解决 AI 服务无法访问、登录失败与长任务断流问题',
    services: ['ChatGPT', 'Claude', 'Gemini', 'Midjourney'],
    items: ['ChatGPT 打不开与一直转圈', '长任务与 API 断流排查', 'AI 工具需要什么网络环境'],
    link: '/software/ai/'
  },
  {
    title: 'Google 服务',
    desc: 'Google 全家桶的访问、账号与同步问题',
    services: ['Google 搜索', 'Gmail', 'Drive', 'Play'],
    items: ['Gmail 收不到验证码', 'Drive 上传下载失败', 'Play 无法下载应用'],
    link: '/software/google/'
  },
  {
    title: '社交与通信',
    desc: '即时通信与社交平台的连接与验证码问题',
    services: ['Telegram', 'WhatsApp', 'Instagram', 'Discord'],
    items: ['Telegram 一直连接中', 'WhatsApp 收不到验证码', 'Discord 语音连接失败'],
    link: '/software/social/'
  },
  {
    title: '流媒体',
    desc: '视频音乐平台的地区限制与播放问题',
    services: ['YouTube', 'Netflix', 'Disney+', 'Spotify'],
    items: ['Netflix 检测到代理', 'YouTube 缓冲慢', '地区内容不一致'],
    link: '/software/streaming/'
  },
  {
    title: '开发者工具',
    desc: '代码托管、镜像与依赖下载的加速与排查',
    services: ['GitHub', 'Docker Hub', 'npm', 'Hugging Face'],
    items: ['Git Clone 超时', 'Docker 拉取镜像失败', '依赖安装请求超时'],
    link: '/software/developer/'
  },
  {
    title: '办公与跨境',
    desc: '海外办公协作与跨境运营的网络保障',
    services: ['Notion', 'Figma', 'Slack', 'Shopify'],
    items: ['海外 CDN 资源加载失败', '视频会议断线', '跨境后台为什么要固定出口'],
    link: '/software/office/'
  }
]
</script>

<style scoped>
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .scenario-grid {
    grid-template-columns: 1fr;
  }
}

.site-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.scene-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--vp-c-brand-1);
}

.scene-desc {
  font-size: 14px;
  color: var(--site-text-soft);
  margin-bottom: 12px;
}

.scene-services {
  font-size: 13px;
  color: var(--site-text-soft);
  margin-bottom: 16px;
  background: var(--site-bg-soft);
  padding: 6px 10px;
  border-radius: 6px;
}

.scene-services span {
  font-weight: 600;
  color: var(--site-text);
}

.scene-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  flex-grow: 1;
}

.scene-list li {
  font-size: 14px;
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
}

.scene-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
}

.scene-action {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
