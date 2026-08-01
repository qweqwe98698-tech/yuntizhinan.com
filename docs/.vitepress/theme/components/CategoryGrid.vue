<template>
  <div class="category-grid-wrapper">
    <div class="category-grid">
      <a
        v-for="(cat, index) in categories"
        :key="index"
        :href="cat.link"
        class="category-card"
      >
        <div class="category-icon">{{ cat.icon }}</div>
        <div class="category-content">
          <h3 class="category-name">{{ cat.name }}</h3>
          <p class="category-desc">{{ cat.desc }}</p>
        </div>
        <div class="category-arrow">→</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = ref([
  {
    icon: '🧭',
    name: '机场推荐',
    desc: '按用途、预算与客户端选择合适的机场，未实测品牌明确标注待实测。',
    link: '/airport/'
  },
  {
    icon: '📊',
    name: '机场评测',
    desc: '标准流程实测：延迟丢包、晚高峰速度、解锁能力、客服与退款规则。',
    link: '/reviews/'
  },
  {
    icon: '🤖',
    name: 'AI 工具指南',
    desc: 'ChatGPT、Claude、Gemini 等 AI 服务的访问要求与故障排查。',
    link: '/software/ai/'
  },
  {
    icon: '🎬',
    name: '流媒体指南',
    desc: 'Netflix、YouTube、Disney+ 的地区限制说明与播放问题解决。',
    link: '/software/streaming/'
  },
  {
    icon: '💬',
    name: '社交与通信',
    desc: 'Telegram、WhatsApp、Instagram 的连接、验证码与加载问题。',
    link: '/software/social/'
  },
  {
    icon: '💻',
    name: '开发者工具',
    desc: 'GitHub、Docker、npm 等开发资源的下载加速与超时排查。',
    link: '/software/developer/'
  },
  {
    icon: '📱',
    name: '客户端教程',
    desc: 'Clash、Shadowrocket、sing-box 在各平台的安装与订阅导入教程。',
    link: '/tutorials/'
  },
  {
    icon: '🛠️',
    name: '故障排查中心',
    desc: '按症状定位问题：节点超时、验证码收不到、断流、手机流量不可用。',
    link: '/troubleshooting/'
  }
])
</script>

<style scoped>
.category-grid-wrapper {
  margin-top: 32px;
  margin-bottom: 48px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.category-card {
  display: flex;
  align-items: flex-start;
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  text-decoration: none !important;
  color: inherit;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
  box-shadow: var(--site-shadow-md);
  transform: translateY(-4px);
}

.category-icon {
  font-size: 40px;
  line-height: 1;
  margin-right: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1);
}

.category-content {
  flex: 1;
  padding-right: 24px;
}

.category-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
  line-height: 1.4;
  transition: color 0.25s ease;
}

.category-card:hover .category-name {
  color: var(--vp-c-brand-1);
}

.category-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-arrow {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--vp-c-text-3);
  transition: all 0.25s ease;
  opacity: 0;
}

.category-card:hover .category-arrow {
  opacity: 1;
  right: 20px;
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .category-card {
    padding: 20px 16px;
  }
  .category-icon {
    font-size: 32px;
    margin-right: 16px;
  }
  .category-name {
    font-size: 16px;
  }
  .category-desc {
    font-size: 13px;
  }
  .category-arrow {
    display: none;
  }
}
</style>
