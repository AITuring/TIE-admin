<template>
  <page-layout :avatar="currUser.avatar">
    <div slot="headerContent">
      <div class="title">{{welcome.timeFix[lang]}}，{{currUser.name}}，{{welcome.message[lang]}}</div>
      <div>{{currUser.position[lang]}}</div>
    </div>
    <template slot="extra">
      <head-info class="split-right" :title="$t('project')" content="56"/>
      <head-info class="split-right" :title="$t('ranking')" content="8/24"/>
      <head-info class="split-right" :title="$t('visit')" content="2,223"/>
    </template>
    <template>
      <a-row style="margin: 0 -12px">
        <a-col style="padding: 0 12px" :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" :title="$t('progress')" :body-style="{padding: 0}">
            <a slot="extra">{{$t('all')}}</a>
            <div>
              <a-card-grid :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{padding: 0}">
                  <a-card-meta :description="item.desc">
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.logo" />
                      <span>Alipay</span>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a class="group" href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
          <a-card :loading="loading" :title="$t('dynamic')" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title" v-html="item.template" />
                  <div slot="description">9小时前</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <!-- 评分模块 -->
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :title="$t('access')" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}" class="rate">
            <div class="rateboard" style="margin: 16px 40px">
              <a-rate v-model="selectValue" :tooltips="selectDesc" />
              <span class="ant-rate-text">{{ selectDesc[selectValue - 1] }}</span>
          </div>
          </a-card>
          <!-- TODO 这块样式可以稍微优化 -->
          <a-card :loading="loading" :title="`XX ${$t('degree')}`" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div style="min-height: 400px;">
              <radar />
            </div>
          </a-card>
          <a-card :loading="loading" :title="$t('temperature')" :bordered="false">
            <div style="height: 200px">
              <!-- <div style="display: inline-block;height: 300px;marginLeft: 70px">
                <a-slider vertical :default-value="30" />
              </div>
              <div style="display: inline-block;height: 300px;marginLeft: 70px">
                <a-slider vertical range :step="10" :default-value="[20, 50]" />
              </div> -->
              <div style="display: inline-block;height: 200px;marginLeft: 100px">
                <a-slider vertical range :marks="marks" :default-value="[26, 37]" />
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import HeadInfo from '@/components/tool/HeadInfo'
import Radar from '@/components/chart/Radar'
import {mapState} from 'vuex'
import {request, METHOD} from '@/utils/request'
// import {getToday} from '@/services/dashboard'

export default {
  name: 'WorkPlace',
  components: {Radar, HeadInfo, PageLayout},
  i18n: require('./i18n'),
  data () {
    return {
      selectValue: 3,
      selectDesc: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
      projects: [],
      loading: true,
      activities: [],
      teams: [],
      welcome: {
        timeFix: '',
        message: ''
      },
      marks: {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
          style: {
            color: '#f50',
          },
          label: <strong>100°C</strong>,
        },
      },
    }
  },
  methods: {
    handleDisabledChange(disabled) {
      this.disabled = disabled;
    },

  },
  computed: {
    ...mapState('account', {currUser: 'user'}),
    ...mapState('setting', ['lang'])
  },
  created() {
    request('/user/welcome', METHOD.GET).then(res => this.welcome = res.data)
    request('/work/activity', METHOD.GET).then(res => this.activities = res.data)
    request('/work/team', METHOD.GET).then(res => this.teams = res.data)
    request('/project', METHOD.GET).then(res => {
        this.projects = res.data
        this.loading = false
      })
    // getToday().then(res => {
    //     console.log(res)
    // })
  }
}
</script>

<style lang="less">
@import "index";
</style>
