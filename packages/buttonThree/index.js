// 导入组件，组件必须声明 name
import ButtonThree from './main.vue'

// 为组件添加 install 方法，用于按需引入
ButtonThree.install = function (Vue) {
    Vue.component(ButtonThree.name, ButtonThree)
}

export default ButtonThree