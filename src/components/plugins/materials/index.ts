import { VueConstructor } from 'vue/types/umd'

// @/plugins/materials 配下の全vueファイルを取得
const context = require.context('.', true, /.vue$/)

const components: { [key: string]: object } = {}
console.log(components)

// 取得したコンポーネント一覧を、ファイル名がキーのオブジェクトに変換
context.keys().forEach(contextKey => {
  const keys = contextKey.match(/.+\/(.+)\.vue/)
  if (keys) {
    const key = keys[1]
    components[key] = context(contextKey).default
  }
})

// ファイル名をキーとしたコンポーネントとしてグローバル登録
export default {
  install(Vue: VueConstructor) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  },
}
