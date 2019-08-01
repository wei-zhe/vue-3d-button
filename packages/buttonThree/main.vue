<template>
  <button
    class="el-button"
    @click="handleClick"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      {
        'is-disabled': disabled,
        'is-plain': plain,
        'is-round': round,
      }
    ]"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ButtonThree',
    props: {
      type: {             // type 类型    primary / success / warning / danger / info / text
        type: String,
        default: 'default'
      },
      size: String,       // size 尺寸    string	medium / small / mini
      nativeType: {       // 原生type属性  button / submit / reset
        type: String,
        default: 'button'
      },
      disabled: Boolean,  // disabled	是否禁用状态	boolean
      plain: Boolean,  
      autofocus: Boolean, // autofocus	是否默认聚焦
      round: Boolean,     // round	是否圆角按钮
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
