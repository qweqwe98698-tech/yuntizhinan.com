<template>
  <div class="link-exchange-wrapper">
    <h3 class="link-exchange-title">友情链接与互链合作</h3>

    <div class="link-exchange-content">
      <h4 class="welcome-title">欢迎与本站交换友情链接</h4>
      <p class="intro-text">
        如果您的网站内容与本站（网络评测、技术教程、软件指南等）相关，且已被各大搜索引擎正常收录，欢迎交换友情链接。
      </p>

      <p class="info-label">本站信息：</p>

      <div class="site-info-box">
        <div class="info-line"><span>名称：</span>{{ PROJECT.siteName }}</div>
        <div class="info-line"><span>地址：</span>{{ siteUrlDisplay }}</div>
        <div class="info-line"><span>描述：</span>{{ PROJECT.slogan }}</div>
        <div class="info-line"><span>Logo：</span>{{ siteUrlDisplay }}/logo.svg</div>
      </div>

      <p v-if="PROJECT.contactEmail" class="contact-text">
        请在您的网站添加本站链接后，通过邮箱
        <a :href="`mailto:${PROJECT.contactEmail}`" class="email-link">{{ PROJECT.contactEmail }}</a>
        与我们取得联系。
      </p>
      <p v-else class="contact-text">
        联系方式整理中，稍后会在「关于本站」页面公布互链申请渠道。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PROJECT } from '../../../../project.config'

const siteUrlDisplay = computed(() => PROJECT.siteUrl.replace(/\/$/, ''))
</script>

<style scoped>
.link-exchange-wrapper {
  margin: 32px 0;
  font-family: var(--vp-font-family-base);
}

.link-exchange-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-brand-2);
  margin: 0 0 16px 0;
  padding-left: 12px;
  border-left: 4px solid var(--vp-c-brand-1);
  line-height: 1.4;
}

.link-exchange-content {
  border: 1px dashed var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 24px;
  background-color: var(--vp-c-bg);
}

.welcome-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 12px 0;
}

.intro-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.info-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
}

.site-info-box {
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.info-line {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  font-family: var(--vp-font-family-mono), monospace;
}

.info-line span {
  color: var(--vp-c-text-1);
  font-weight: 500;
  display: inline-block;
  width: 48px;
}

.contact-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.6;
}

.email-link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.email-link:hover {
  text-decoration: underline;
  color: var(--vp-c-brand-2);
}
</style>
