import Yox from 'yox'

import template from './template/Tooltip.hbs'

import {
  TRUE,
  FALSE,
  RAW_STRING,
  RAW_NUMERIC,
  RAW_BOOLEAN,
  UNDEFINED,
  RAW_CLICK,
  RAW_HOVER,
} from '../constant'

import {
  oneOf,
  toNumber,
} from '../util'

let timer: any

export default Yox.define({

  template,

  propTypes: {
    content: {
      type: RAW_STRING,
    },
    placement: {
      type: RAW_STRING,
      value: 'bottom',
    },
    disabled: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    delay: {
      type: RAW_NUMERIC,
    },
    mode: {
      type: oneOf([RAW_CLICK, RAW_HOVER]),
      value: RAW_HOVER,
    },
    maxWidth: {
      type: RAW_NUMERIC,
    },
    maxHeight: {
      type: RAW_NUMERIC,
    },
    offsetX: {
      type: RAW_NUMERIC,
    },
    offsetY: {
      type: RAW_NUMERIC,
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },

  data() {
    return {
      isVisible: FALSE,
      isHover: FALSE,
    }
  },

  watchers: {
    disabled() {
      this.setPosition()
    }
  },

  methods: {
    setPosition() {
      const me = this
      const placement = me.get('placement')
      const offsetX = toNumber(me.get('offsetX'))
      const offsetY = toNumber(me.get('offsetY'))

      const popupElement = this.$refs.popup as HTMLElement
      const popupWidth = popupElement.offsetWidth
      const popupHeight = popupElement.offsetHeight

      let marginLeft = 0
      let marginTop = 0

      if (placement === 'bottom') {
        marginLeft = -(popupWidth / 2)
      }
      else if (placement === 'bottom-start') {
        marginLeft = 0
      }
      else if (placement === 'bottom-end') {
        marginLeft = 0
      }
      else if (placement === 'top') {
        marginLeft = -(popupWidth / 2)
        marginTop = -popupHeight
      }
      else if (placement === 'top-start') {
        marginTop = -popupHeight
      }
      else if (placement === 'top-end') {
        marginTop = -popupHeight
      }
      else if (placement === 'left') {
        marginLeft = -popupWidth
        marginTop = -(popupHeight / 2)
      }
      else if (placement === 'left-start') {
        marginLeft = -popupWidth
      }
      else if (placement === 'left-end') {
        marginLeft = -popupWidth
      }
      else if (placement === 'right') {
        marginTop = -(popupHeight / 2)
      }

      popupElement.style.marginLeft = (marginLeft + offsetX) + 'px'
      popupElement.style.marginTop = (marginTop + offsetY) + 'px'

    },

    enter() {
      const me = this
      me.set('isHover', TRUE)
      me.nextTick(function () {
        me.setPosition()
        timer = setTimeout(
          function () {
            if (me.get('isHover')) {
              me.set('isVisible', TRUE)
            }
          },
          toNumber(me.get('delay'))
        )
      })
    },

    leave() {
      this.set({
        isVisible: FALSE,
        isHover: FALSE,
      })
    },

    click() {
      const me = this
      me.toggle('isVisible')
      me.nextTick(function () {
        me.setPosition()
      })
    }
  },

  beforeDestroy() {
    if (timer) {
      clearTimeout(timer)
      timer = UNDEFINED
    }
  }

})
