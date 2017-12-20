<template>
  <div>
  <li @click="showThemeDialog">{{$t('lang.header.switch')}}</li>

    <el-dialog
      center
      :visible.sync="themeDialogVisible"
      :title="$t('lang.header.switch')"
      width="400px">
      <el-form
        :model="colors"
        :rules="rules"
        ref="form"
        label-position="top"
        label-width="70px">
        <el-form-item :label="$t('lang.form.theme')" prop="primary">
          <el-color-picker v-model="colors.primary" ></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary" @click="submitForm">{{$t('lang.form.switch')}}</el-button>
          <el-button @click="resetForm">{{$t('lang.form.reset')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import generateColors from '@/utils/theme/color'
  export default {
    name: 'SwitchTheme',
    data() {
      const colorValidator = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'))
        } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
          return callback(new Error('请输入 hex 格式的主题色'))
        } else {
          callback()
        }
      }
      return {
        colors: {
          primary: '#409eff'
        },
        rules: {
          primary: [
            { validator: colorValidator, trigger: 'blur' }
          ]
        },
        themeDialogVisible: false,
        originalStylesheetCount: -1,
        originalStyle: ''
      }
    },
    created() {
      this.getIndexStyle()
    },
    mounted() {
      this.$nextTick(() => {
        this.originalStylesheetCount = document.styleSheets.length
      })
    },
    methods: {
      getIndexStyle() {
        this.getFile('//unpkg.com/element-ui/lib/theme-chalk/index.css')
          .then(({ data }) => {
            this.originalStyle = this.getStyleTemplate(data)
          })
      },
      getFile(url, isBlob = false) {
        return new Promise((resolve, reject) => {
          const client = new XMLHttpRequest()
          client.responseType = isBlob ? 'blob' : ''
          client.onreadystatechange = () => {
            if (client.readyState !== 4) {
              return
            }
            if (client.status === 200) {
              const urlArr = client.responseURL.split('/')
              resolve({
                data: client.response,
                url: urlArr[urlArr.length - 1]
              })
            } else {
              reject(new Error(client.statusText))
            }
          }
          client.open('GET', url)
          client.send()
        })
      },
      getStyleTemplate(data) {
        const colorMap = {
          '#3a8ee6': 'shade-1',
          '#409eff': 'primary',
          '#53a8ff': 'light-1',
          '#66b1ff': 'light-2',
          '#79bbff': 'light-3',
          '#8cc5ff': 'light-4',
          '#a0cfff': 'light-5',
          '#b3d8ff': 'light-6',
          '#c6e2ff': 'light-7',
          '#d9ecff': 'light-8',
          '#ecf5ff': 'light-9'
        }
        Object.keys(colorMap).forEach(key => {
          const value = colorMap[key]
          data = data.replace(new RegExp(key, 'ig'), value)
        })
        return data
      },
      showThemeDialog() {
        this.themeDialogVisible = true
      },
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.themeDialogVisible = false
            localStorage.primaryColor = this.colors.primary
            this.colors = Object.assign({}, this.colors, generateColors(this.colors.primary))
            this.writeNewStyle()
          } else {
            return false
          }
        })
      },
      writeNewStyle() {
        let cssText = this.originalStyle
        Object.keys(this.colors).forEach(key => {
          cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
        })

        if (this.originalStylesheetCount === document.styleSheets.length) {
          const style = document.createElement('style')
          style.innerText = cssText
          console.log(style)
          document.head.appendChild(style)
        } else {
          document.head.lastChild.innerText = cssText
        }
      },
      resetForm() {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style>

</style>
