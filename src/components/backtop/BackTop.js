import template from './template/BackTop.html'

import { RAW_STRING, RAW_NUMERIC } from '../constant'
import { scrollTop } from '../util'

export default {

  propTypes: {
    bottom: {
      type: RAW_NUMERIC,
      value: 30
    },
    right: {
      type: RAW_NUMERIC,
      value: 30
    },
    height: {
      type: RAW_NUMERIC
    },
    duration: {
      type: RAW_NUMERIC,
      value: 1000
    },
    className: {
      type: RAW_STRING
    },
    style: {
      type: RAW_STRING
    }
  },

  template,

  data() {
    return {
      isShow: false
    }
  },

  methods: {
    back() {
      let parentElement = this.$parent.$el
      scrollTop(parentElement, parentElement.scrollTop, 0, this.get('duration'))
      this.fire('click')
    }
  },

  afterMount() {
    let me = this
    let parentElement = me.$parent.$el
    me.handleScroll = function () {
      let height = me.get('height') || parentElement.clientHeight
      me.set({
        isShow: parentElement.scrollTop >= height
      })
    }
    Yox.dom.on(parentElement, 'scroll', me.handleScroll)
    Yox.dom.on(document, 'resize', me.handleScroll)
  },

  beforeDestroy() {
    Yox.dom.off(this.$parent.$el, 'scroll', this.handleScroll)
    Yox.dom.off(document, 'resize', this.handleScroll)
  }
}