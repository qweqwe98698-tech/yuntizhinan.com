import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

import './custom.css'
import './home.css'
import './article.css'

import HomeHero from './components/HomeHero.vue'
import SitePortalGrid from './components/SitePortalGrid.vue'
import ScenarioGrid from './components/ScenarioGrid.vue'
import ArticleList from './components/ArticleList.vue'
import NetworkCheckBox from './components/NetworkCheckBox.vue'
import AirportRecommendBox from './components/AirportRecommendBox.vue'
import PagefindSearch from './components/PagefindSearch.vue'
import AirportCard from './components/AirportCard.vue'
import AirportRecommend from './components/AirportRecommend.vue'
import LinkExchange from './components/LinkExchange.vue'
import TagsCloud from './components/TagsCloud.vue'
import CategoryGrid from './components/CategoryGrid.vue'
import AffiliateButton from './components/AffiliateButton.vue'
import RelatedArticles from './components/RelatedArticles.vue'
import DisclosureBox from './components/DisclosureBox.vue'
import ProsCons from './components/ProsCons.vue'
import ReviewSummary from './components/ReviewSummary.vue'
import PriceNotice from './components/PriceNotice.vue'
import UpdateNotice from './components/UpdateNotice.vue'
import Breadcrumb from './components/Breadcrumb.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('SitePortalGrid', SitePortalGrid)
    app.component('ScenarioGrid', ScenarioGrid)
    app.component('ArticleList', ArticleList)
    app.component('PagefindSearch', PagefindSearch)
    app.component('NetworkCheckBox', NetworkCheckBox)
    app.component('AirportRecommendBox', AirportRecommendBox)
    app.component('AirportCard', AirportCard)
    app.component('AirportRecommend', AirportRecommend)
    app.component('LinkExchange', LinkExchange)
    app.component('TagsCloud', TagsCloud)
    app.component('CategoryGrid', CategoryGrid)
    app.component('AffiliateButton', AffiliateButton)
    app.component('RelatedArticles', RelatedArticles)
    app.component('DisclosureBox', DisclosureBox)
    app.component('ProsCons', ProsCons)
    app.component('ReviewSummary', ReviewSummary)
    app.component('PriceNotice', PriceNotice)
    app.component('UpdateNotice', UpdateNotice)
    app.component('Breadcrumb', Breadcrumb)
  }
} satisfies Theme
