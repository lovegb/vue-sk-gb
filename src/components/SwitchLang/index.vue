<template>
  <li>
    <span
      @click="switchLang('zh')">
      中文
    </span>
    <span>/</span>
    <span
      @click="switchLang('en')">
      EN
    </span>
  </li>
</template>
<script>
  export default {
    name: 'SwitchLang',
    methods: {
      switchLang(lang) {
        localStorage.lang = lang
        this.$i18n.locale = lang
      }
    }
  }
</script>
<style>

</style>
