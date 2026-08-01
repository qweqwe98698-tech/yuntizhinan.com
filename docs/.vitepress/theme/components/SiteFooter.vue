<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-columns">
        <div class="footer-column">
          <h4 class="column-title">关于我们</h4>
          <p class="about-text">云梯指南是面向中文用户的境外网络服务知识库，提供海外软件百科、故障排查、客户端教程与基于实测的机场评测推荐。</p>
        </div>

        <div class="footer-column">
          <h4 class="column-title">核心内容</h4>
          <ul class="footer-links">
            <li><a href="/airport/">机场推荐</a></li>
            <li><a href="/reviews/">机场评测</a></li>
            <li><a href="/troubleshooting/">故障排查</a></li>
            <li><a href="/tutorials/">客户端教程</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">知识库</h4>
          <ul class="footer-links">
            <li><a href="/software/">软件百科</a></li>
            <li><a href="/protocols/">协议知识</a></li>
            <li><a href="/security/">安全避坑</a></li>
            <li><a href="/tools/">实用工具</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">关于与政策</h4>
          <ul class="footer-links">
            <li><a href="/about/">关于本站</a></li>
            <li><a href="/editorial-policy/">编辑政策</a></li>
            <li><a href="/affiliate-disclosure/">推广披露</a></li>
            <li><a href="/privacy/">隐私政策</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">支持</h4>
          <ul class="footer-links">
            <li><a href="/about/methodology/">测试方法</a></li>
            <li><a href="/correction-policy/">纠错政策</a></li>
            <li><a href="/news/">行业动态</a></li>
            <li><a href="/compare/">机场对比</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="disclaimer-text">独立第三方教程与评测平台，与文中提到的品牌及服务提供商不存在官方隶属关系。</p>
        <p class="copyright-text">© {{ currentYear }} 云梯指南. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
.site-footer {
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
  padding: 64px 24px 32px;
  margin-top: 64px;
}

.footer-container {
  max-width: 1152px;
  margin: 0 auto;
}

.footer-columns {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 64px;
}

.column-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-top: 0;
  margin-bottom: 20px;
}

.about-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
  max-width: 280px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--vp-c-brand-1);
}

.footer-bottom {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  text-align: center;
}

.disclaimer-text {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.copyright-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

@media (max-width: 960px) {
  .footer-columns {
    grid-template-columns: repeat(3, 1fr);
  }
  .footer-column:first-child {
    grid-column: span 3;
    margin-bottom: 16px;
  }
  .about-text {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .footer-column:first-child {
    grid-column: span 2;
  }
  .site-footer {
    padding: 48px 16px 24px;
  }
}
</style>
