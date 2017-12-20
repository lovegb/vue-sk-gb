<template>
  <div class="login-container">
    <el-button type="primary">11</el-button>
    <el-Pagination></el-Pagination>
    <el-container>
      <el-header
        height="80px"
        :style="{ 'background-color': primaryColor }">
      </el-header>
    </el-container>
    <ul>
      <switch-theme></switch-theme>
      <switch-lang></switch-lang>
    </ul>
  </div>
</template>

<script>
  import switchLang from '@/components/SwitchLang'
  import switchTheme from '@/components/SwitchTheme'
  export default {
    components: { switchLang, switchTheme },
    data() {
      return {
        primaryColor: localStorage.primaryColor
      }
    }
  }
</script>

