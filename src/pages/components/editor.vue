<template>
  <div id="editor">
  </div>
</template>

<script>
import Vditor from 'vditor'
import "../../../node_modules/vditor/src/assets/scss/index.scss"
// import { component } from 'vue/types/umd';

export default {
  data:function() {
    return {
        contentEditor: ''
      };
  },
  mounted () {
    this.contentEditor = new Vditor('vditor', {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.contentEditor.setValue('hello, Vditor + Vue!')
      },
    })
  },
  
}
</script>