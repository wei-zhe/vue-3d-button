<template>
  <div
    :class="type + '-box'"
    style="display: inline-block;"
  > 

    <button
      ref="button"
      @click      = "handleClick"
      @mousemove  = 'handMousemove($event)'
      @mouseout   = 'handMouseout($event)'
      @mouseleave = 'handMouseleave($event)'
      @mousedown  = 'handMousedown($event)'
      @mouseover  = 'handMouseover($event)'
      :type       = "nativeType"
      :style      = "{
        'width'  : width,
        'height' : height,
        'border-radius' : round,
        'background'    : type == 'threeBtn' ? 'transparent' : bgColor,
        'color'         : fontColor,
        'font-size'     : fontSize,
      }"
      :class      = "[
        type,
        {
          'haloBtn-focus' : btnFocus && type == 'haloBtn',
        },
      ]"
      :data-title  = "threeTit"
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
        btnFocus : false,
      }
    },
    props: {
      type        : {  // type 类型        String    colorful / threeBtn / haloBtn
        type: String,
        default: 'colorful'
      },
      round       : {  // round是否圆角按钮  String   2em / --px / --%
        type: String,
        default: '2em',
      },
      nativeType  : {  // 原生type属性      String   button / submit / reset
        type: String,
        default: 'button'
      },
      width       : {  // width            String	  auto / --px 
        type: String,
        default: 'auto'
      }, 
      height      : {  // height           String	  auto / --px 
        type: String,
        default: 'auto'
      },
      bgColor     : {  // bgColor	         String
        type: String,
        default: 'rgba(247, 35, 89, 1)'
      },
      fontColor   : {  // fontColor        String
        type: String,
        default: '#fff'
      },  
      fontSize    : {  // fontSize          String
        type: String,
        default: '1em'
      },  
      threeTit    : {  // threeTit	3d按钮文案
        type: String,
        default: 'Hover me I‘m awesome'
      },
      colorful    : {  // colorful按钮的hover色
        type: String,
        default: '#4405f7'
      },
      autofocus   : {  // autofocus	是否默认聚焦
        type: Boolean,
        default: false,
      },
    },
    watch: {
      'autofocus' (val, oldVal) {
        this.btnFocus = this.autofocus;
      },
    },
    mounted () {
      document.body.onmouseup = (e) => { 
        this.documentMouseup(e);
      }
      this.btnFocus = this.autofocus;
      switch(this.type){
        case 'colorful':
          this.docStyle = this.$refs.button.parentNode.style;
          this.docStyle.setProperty('--colorful', this.colorful)    
          break;
        case 'threeBtn':
          this.threeBtnOver({target : this.$refs.button});
          break;
        case 'haloBtn':
          this.haloBtnOver({target : this.$refs.button});
          break;
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
      handMouseover(e){
        switch(this.type){
          case 'colorful':
            break;
          case 'threeBtn':
            this.threeBtnOver(e);
            break;
          case 'haloBtn':
            this.haloBtnOver(e, true);
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
        let w = e.target.clientWidth  * 4;
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
      threeBtnOver(e){
        this.docStyle = e.target.parentNode.style;
        this.docStyle.setProperty('--background',  this.bgColor)        
        this.docStyle.setProperty('--threeRadius', this.round)        
      },
      haloBtnOver(e, judge){
        if(judge){
          this.btnFocus = false;
        }
        this.docStyle = e.target.parentNode.style;
        let width = Math.round(e.target.clientHeight / 4);
        
        if(width){

          let rgba      = this.bgColor.split('(')[1].split(')')[0].split(',');
          let boxShadow =  `0 0 1px ${width}px rgba(${rgba[0]},${rgba[1]},${rgba[2]}, 0.4), 
                            0 0 1px ${width*2}px rgba(${rgba[0]},${rgba[1]},${rgba[2]}, 0.1), 
                            0 0 1px ${width*3}px rgba(${rgba[0]},${rgba[1]},${rgba[2]}, 0.1)
                          `;
          this.docStyle.setProperty('--boxShadow', boxShadow)       
        }
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
    background: radial-gradient(circle closest-side, var(--colorful), transparent);
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
		background: var(--background);
		border-radius: var(--threeRadius);
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

.haloBtn-box{
  position: relative;
  width: auto;
  height: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  
  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.haloBtn{
	cursor: pointer;
  position: relative;
  z-index: 1;
  width: 80px;
  height: 80px;
  color: #fff;
  background: #ed1c5b;
  border-radius: 50%;
  border: none;
  -webkit-transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), -webkit-transform 200ms cubic-bezier(0.2, 0, 0.7, 1);
  transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), transform 200ms cubic-bezier(0.2, 0, 0.7, 1);

  &:hover {
    box-shadow: var(--boxShadow)
  }
}
.haloBtn-focus{
  box-shadow: var(--boxShadow)
}
</style>
