<template>
  <div class="tags-cloud-wrapper">
    <div class="tags-category" v-for="(category, index) in tagData" :key="index">
      <h3 class="category-title">
        <span class="category-icon">{{ category.icon }}</span>
        {{ category.name }}
      </h3>
      <div class="tags-container">
        <a 
          v-for="tag in category.tags" 
          :key="tag" 
          href="/" 
          class="tag-item"
        >
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tagData = ref([
  {
    icon: '🚀',
    name: '网络代理与节点评测',
    tags: [
      '好用的机场推荐', '性价比节点', '晚高峰不卡顿', '流媒体解锁机场', 
      '原生IP购买', 'V2Ray配置教程', 'Clash节点订阅', 'ShadowsocksR',
      'Trojan翻墙', '软路由插件', '游戏加速器', 'IP被封排查', 'BGP中转机场',
      'IPLC专线', '免费节点分享', '机场跑路避坑', '企业级专线代理', '多设备同时在线'
    ]
  },
  {
    icon: '🤖',
    name: 'AI 大模型与前沿工具',
    tags: [
      'ChatGPT 注册教程', 'ChatGPT Plus 升级', 'OpenAI 封号申诉', 'GPT-4 免费使用',
      'Claude 3 注册', 'DeepSeek 使用指南', 'Midjourney 绘画提示词', 'Sora 视频生成',
      '豆包 Doubao', 'AI 写代码工具', '海外手机号接码', '虚拟信用卡 Depay',
      'ChatGPT 报错 1020', 'API Key 申请', '国内直连 AI 镜像'
    ]
  },
  {
    icon: '🎬',
    name: '流媒体与全球影音',
    tags: [
      'YouTube 4K 加速', 'YouTube Premium 合租', 'Netflix 奈飞账号', '奈飞自制剧推荐',
      'Disney+ 迪士尼', 'Hulu 订阅', 'HBO Max', 'Spotify 跨区', 'Apple Music',
      'Twitch 直播卡顿', '流媒体解锁测试', '油管广告屏蔽', '油管视频下载器', '奈飞字幕双语'
    ]
  },
  {
    icon: '💬',
    name: '海外社交与通讯',
    tags: [
      'Telegram 汉化包', 'TG 群组搜索', 'Telegram 解除 +86 私聊限制', 'Twitter X 注册',
      '推特敏感内容设置', '推特防封号', 'Instagram 图片加载慢', 'IG 粉丝运营',
      'Facebook 脸书养号', 'WhatsApp 商业版', 'WhatsApp 聊天记录迁移', 'Discord 机器人',
      'Reddit 注册', 'Line 国内使用'
    ]
  },
  {
    icon: '🛒',
    name: '跨境电商与出海业务',
    tags: [
      'TikTok 国际版免拔卡', 'TikTok 直播节点', 'TikTok 0播放排查', '小红书海外运营',
      '淘宝海外版支付', '支付宝国际汇款', 'Shopify 建站', '亚马逊开店', 
      'PayPal 注册避坑', 'Payoneer 派安盈', 'Stripe 支付网关', '跨境收款合规'
    ]
  },
  {
    icon: '💻',
    name: '生产力与开发者工具',
    tags: [
      '微软 Copilot', 'Windows 11 升级', 'OneDrive 同步慢', 'Outlook 邮箱注册',
      'GitHub 访问加速', 'GitHub 报错 443', '飞书海外版', 'Google Drive 扩容',
      '谷歌邮箱 Gmail 验证码', 'Chrome 插件推荐', 'StackOverflow', '海外云服务器选购'
    ]
  }
])
</script>

<style scoped>
.tags-cloud-wrapper {
  margin-top: 24px;
}

.tags-category {
  margin-bottom: 40px;
}

.category-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.category-icon {
  font-size: 22px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.tag-item:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: var(--site-shadow-sm);
}

@media (max-width: 640px) {
  .tag-item {
    font-size: 13px;
    padding: 4px 12px;
  }
  .tags-container {
    gap: 8px;
  }
}
</style>
