<template>
  <page-layout :avatar="currUser.avatar">
    <div slot="headerContent">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            style="margin-right: 50px"
            @finish="onFinish"
          />
        </a-col>
        <a-col :span="12">
          <a-statistic-countdown
            title="Million Seconds"
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="24" style="margin-top: 32px">
          <a-statistic-countdown
            title="Day Level"
            :value="deadline"
            format="D 天 H 时 m 分 s 秒"
          />
        </a-col>
      </a-row>
    </div>
    <template slot="extra">
      <head-info class="split-right" :title="$t('project')" content="21" />
      <head-info class="split-right" :title="$t('ranking')" content="2/24" />
      <head-info class="split-right" :title="$t('visit')" content="3,223" />
    </template>
    <template>
      <a-row style="margin: 0 -12px">
        <a-col
          style="padding: 0 12px"
          :xl="16"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px"
            :bordered="false"
            :title="$t('progress')"
            :body-style="{ padding: 0 }"
          >
            <a-result title="Great, we have done all the operations!">
              <template #icon>
                <a-icon type="smile" theme="twoTone" />
              </template>
              <template #extra>
                <a-button type="primary"> Next </a-button>
              </template>
            </a-result>
          </a-card>
          <a-card :loading="loading" :title="$t('dynamic')" :bordered="false">
            <a-timeline mode="alternate">
              <a-timeline-item
                >Create a services site 2015-09-01</a-timeline-item
              >
              <a-timeline-item color="green">
                Solve initial network problems 2015-09-01
              </a-timeline-item>
              <a-timeline-item>
                <a-icon
                  slot="dot"
                  type="clock-circle-o"
                  style="font-size: 16px"
                />
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </a-timeline-item>
              <a-timeline-item color="red">
                Network problems being solved 2015-09-01
              </a-timeline-item>
              <a-timeline-item
                >Create a services site 2015-09-01</a-timeline-item
              >
              <a-timeline-item>
                <a-icon
                  slot="dot"
                  type="clock-circle-o"
                  style="font-size: 16px"
                />
                Technical testing 2015-09-01
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-col>
        <!-- 评分模块 -->
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-card
            :title="$t('access')"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
            class="rate"
          >
            <div class="rateboard" style="margin: 16px 40px">
              <a-rate v-model="selectValue" :tooltips="selectDesc" />
              <span class="ant-rate-text">{{
                selectDesc[selectValue - 1]
              }}</span>
            </div>
          </a-card>
          <a-card
            :loading="loading"
            :title="$t('temperature')"
            :bordered="false"
          >
            <div style="height: 280px">
              <div
                style="display: inline-block; height: 280px; margin-left: 100px"
              >
                <a-slider
                  vertical
                  range
                  :marks="marks"
                  :default-value="[26, 37]"
                />
              </div>
            </div>
          </a-card>
          <!-- 评论部分 -->
          <a-card
            :loading="loading"
            :title="$t('comment')"
            :bordered="false"
            style="margin-top: 24px"
          >
            <template>
              <a-comment>
                <template slot="actions">
                  <span key="comment-basic-like">
                    <a-tooltip title="Like">
                      <a-icon
                        type="like"
                        :theme="action === 'liked' ? 'filled' : 'outlined'"
                        @click="like"
                      />
                    </a-tooltip>
                    <span style="padding-left: '8px'; cursor: 'auto'">
                      {{ likes }}
                    </span>
                  </span>
                  <span key="comment-basic-dislike">
                    <a-tooltip title="Dislike">
                      <a-icon
                        type="dislike"
                        :theme="action === 'disliked' ? 'filled' : 'outlined'"
                        @click="dislike"
                      />
                    </a-tooltip>
                    <span style="padding-left: '8px'; cursor: 'auto'">
                      {{ dislikes }}
                    </span>
                  </span>
                  <span key="comment-basic-reply-to">Reply to</span>
                </template>
                <a slot="author">Han Solo</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="王勃"
                />
                <p slot="content">
                  勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗懿之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今晨捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？
                </p>
                <a-tooltip
                  slot="datetime"
                  :title="moment().format('YYYY-MM-DD HH:mm:ss')"
                >
                  <span>{{ moment().fromNow() }}</span>
                </a-tooltip>
              </a-comment>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import HeadInfo from "@/components/tool/HeadInfo";
// import Radar from '@/components/chart/Radar'
import { mapState } from "vuex";
import { request, METHOD } from "@/utils/request";
import moment from "moment";
// import {getToday} from '@/services/dashboard'

export default {
  name: "WorkPlace",
  components: { HeadInfo, PageLayout },
  i18n: require("./i18n"),
  data() {
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      selectValue: 3,
      selectDesc: ["terrible", "bad", "normal", "good", "wonderful"],
      projects: [],
      loading: true,
      activities: [],
      teams: [],
      welcome: {
        timeFix: "",
        message: "",
      },
      marks: {
        0: "0°C",
        26: "26°C",
        37: "37°C",
        100: {
          style: {
            color: "#f50",
          },
          label: <strong>100°C</strong>,
        },
      },
    };
  },
  methods: {
    handleDisabledChange(disabled) {
      this.disabled = disabled;
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
  },
  computed: {
    ...mapState("account", { currUser: "user" }),
    ...mapState("setting", ["lang"]),
  },
  created() {
    request("/user/welcome", METHOD.GET).then(
      (res) => (this.welcome = res.data)
    );
    request("/work/activity", METHOD.GET).then(
      (res) => (this.activities = res.data)
    );
    request("/work/team", METHOD.GET).then((res) => (this.teams = res.data));
    request("/project", METHOD.GET).then((res) => {
      this.projects = res.data;
      this.loading = false;
    });
    // getToday().then(res => {
    //     console.log(res)
    // })
  },
};
</script>

<style lang="less">
@import "index";
</style>
