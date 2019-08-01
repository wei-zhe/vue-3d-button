<template>
  <div style="display: inline-block;"> 
  
    <button
      @click      = "handleClick"
      @mousemove  = 'handMousemove($event)'
      @mouseout   = 'handMouseout($event)'
      @mouseleave = 'handMouseleave($event)'
      @mousedown  = 'handMousedown($event)'
      :autofocus  = "autofocus"
      :type       = "nativeType"
      :style      = "{
        'border-radius' : round,
      }"
      :class      = "[
        type,
        {
          'is-plain': plain,
          'is-round': round,
        }
      ]"
      data-title  = "Awesome Button"
    >
      <span v-if="type !== 'threeBtn'"><slot></slot></span>
    </button>
  </div>
</template>
<script>
  export default {
    name: 'ButtonThree',
    data() {
      return {
        docStyle : '',
      }
    },
    props: {
      type: {             // type 类型    primary / success / warning / danger / info / text
        type: String,
        default: 'colorful'
      },
      round: {            // round	是否圆角按钮
        type: String,
        default: '2em',
      },
      nativeType: {       // 原生type属性  button / submit / reset
        type: String,
        default: 'button'
      },
      size: String,       // size 尺寸    string	medium / small / mini
      disabled: Boolean,  // disabled	是否禁用状态	boolean
      plain: Boolean,  
      autofocus: Boolean, // autofocus	是否默认聚焦
    },
    mounted () {
      document.body.onmouseup = (e) => { 
        this.documentMouseup(e);
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      },
      handMousemove(e){
        switch(this.type){
          case 'colorful':
            this.colorfulMove(e);
            break;
          case 'threeBtn':
            this.threeBtnMove(e);
            break;
        }
      },
      handMouseout(e){
        switch(this.type){
          case 'colorful':
            this.colorfulOut(e);
            break;
          case 'threeBtn':
            break;
        }
      },
      handMouseleave(e){
        switch(this.type){
          case 'colorful':
            break;
          case 'threeBtn':
            this.threeBtnLeave(e);
            break;
        }
      },
      documentMouseup(e){
        switch(this.type){
          case 'colorful':
            break;
          case 'threeBtn':
            this.docStyle.setProperty('--tz', '-12px')
            break;
        }
      },
      handMousedown(e){
        switch(this.type){
          case 'colorful':
            break;
          case 'threeBtn':
            this.threeBtnDown(e);
            break;
        }
      },
      colorfulMove(e){
        let x  = e.pageX - e.target.offsetLeft;
        let y  = e.pageY - e.target.offsetTop;
        let w = e.target.clientWidth  * 3;
        let h = e.target.clientHeight * 7;
        
        e.target.style.setProperty('--w', `${ w }px`)
        e.target.style.setProperty('--h', `${ h }px`)
        e.target.style.setProperty('--x', `${ x }px`)
        e.target.style.setProperty('--y', `${ y }px`)

      },
      colorfulOut(e){
        e.target.style.setProperty('--h', `${ 0 }px`)
        e.target.style.setProperty('--w', `${ 0 }px`)
      },
      threeBtnMove(e){
        let aElem    = e.target;
        this.docStyle = e.target.parentNode.style;
        let boundingClientRect = aElem.getBoundingClientRect()


        let x = e.clientX - boundingClientRect.left
        let y = e.clientY - boundingClientRect.top
        
        let xc = boundingClientRect.width/2
        let yc = boundingClientRect.height/2
        
        let dx = x - xc
        let dy = y - yc
        
        this.docStyle.setProperty('--rx', `${ dy/-1 }deg`)
        this.docStyle.setProperty('--ry', `${ dx/10 }deg`)
      },
      threeBtnLeave(e){
        this.docStyle = e.target.parentNode.style;
        this.docStyle.setProperty('--ty', '0')
        this.docStyle.setProperty('--rx', '0')
        this.docStyle.setProperty('--ry', '0')
      },
      threeBtnDown(e){
        this.docStyle = e.target.parentNode.style;
        this.docStyle.setProperty('--tz', '-25px')        
      },
    }
  };
</script>

<style  scoped lang="scss">
.colorful,
.threeBtn{
	cursor: pointer;
  position: relative;
	display: inline-block;
	text-decoration: none;
	text-align: center;
	user-select: none;
	color: #fff;
  outline:0;
  -webkit-appearance:none;
  box-sizing:border-box;
  -webkit-box-sizing:border-box;
  transition:.1s;
  -webkit-transition:.1s;
  -moz-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
	padding: 1.2em 2em;

}
.colorful{
  border-radius: 2em;
  background: #f72359;
  overflow: hidden;
  font-size: 1.2em;
  line-height:1;
  margin:0;
  white-space:nowrap;
  font-weight:500;
  border:1px solid #dcdfe6;
  box-shadow: 0 0 3px 1px #d8dee9;

  &:before {
    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--w);
    height: var(--h);
    background: radial-gradient(circle closest-side, #4405f7, transparent);
    transform: translate(-50%, -50%);
    transition: width .2s ease, height .2s ease;
  }

  >span {
    position: relative;
    pointer-events: none;
  }
    
}
.colorful:focus, 
.colorful:hover {
  color:#fff;
}

.threeBtn{
  border: none;
  
  &::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(135deg, #6e8efb, #a777e3);
		border-radius: 4px;
		transition: box-shadow .5s ease, transform .2s ease; 
		will-change: transform;
		box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
		transform:
			translateY(var(--ty, 0))
			rotateX(var(--rx, 0))
			rotateY(var(--ry, 0))
			translateZ(var(--tz, -12px));
	}
	
	&:hover::before {
		box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
	}
	
	&::after {
		position: relative;
		display: inline-block;
		content: attr(data-title);
		transition: transform .2s ease; 
		font-weight: bold;
		letter-spacing: .01em;
		will-change: transform;
		transform:
			translateY( var(--ty, 0))
			rotateX(    var(--rx, 0))
			rotateY(    var(--ry, 0));
	}
}
</style>
