import Yox, { Listener } from 'yox'

import Icon from '../icon/Icon'
import template from './template/InputNumber.hbs'

import {
  TRUE,
  FALSE,
  DOCUMENT,
  UNDEFINED,
  RAW_FUNCTION,
  RAW_STRING,
  RAW_NUMERIC,
  RAW_BOOLEAN,
  RAW_SIZE_ARRAY,
  RAW_DEFAULT,
  RAW_EVENT_KEYDOWN,
  RAW_TYPE_INFO,
  RAW_TYPE_SUCCESS,
  RAW_TYPE_ERROR,
  RAW_TYPE_WARNING,
  RAW_EVENT_BEFORE_DESTROY,
} from '../constant'

import {
  oneOf,
} from '../util'

export default Yox.define({

  template,

  name: '${prefix}inputNumber',

  propTypes: {
    formatter: {
      type: RAW_FUNCTION,
    },
    status: {
      type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
    },
    size: {
      type: oneOf(RAW_SIZE_ARRAY),
      value: RAW_DEFAULT,
    },
    max: {
      type: RAW_NUMERIC,
      value: 100,
    },
    min: {
      type: RAW_NUMERIC,
      value: 0,
    },
    value: {
      type: RAW_NUMERIC,
    },
    step: {
      type: RAW_NUMERIC,
      value: 1,
    },
    editable: {
      type: RAW_BOOLEAN,
      value: TRUE,
    },
    autoFocus: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    readOnly: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    disabled: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    block: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    placeholder: {
      type: RAW_STRING,
    },
    width: {
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
      isFocus: FALSE,
    }
  },

  watchers: {
    value(value) {
      this.fire(
        'change.inputNumber',
        { value }
      )
    }
  },

  computed: {
    computedValue: {
      get(): string {
        const formatter = this.get('formatter')
        const value = this.get('value')
        return formatter
          ? formatter(value)
          : value
      },
      set(value: string) {
        this.set('value', value)
      }
    },
    upDisabled(): boolean {
      const max = this.get('max')
      return Yox.is.numeric(max)
        && max - this.get('value') < this.get('step')
    },
    downDisabled(): boolean {
      const min = this.get('min')
      return Yox.is.numeric(min)
        && this.get('value') - min < this.get('step')
    }
  },

  methods: {
    up() {
      const max = this.get('max')
      this.increase(
        'value',
        +this.get('step'),
        Yox.is.numeric(max) ? +max : UNDEFINED
      )
    },
    down() {
      const min = this.get('min')
      this.decrease(
        'value',
        +this.get('step'),
        Yox.is.numeric(min) ? +min : UNDEFINED
      )
    },
    handleFocus() {
      this.set('isFocus', TRUE)
      this.fire('focus.inputNumber')
    },
    handleBlur() {
      this.set('isFocus', FALSE)
      this.fire('blur.inputNumber')
    },
  },

  components: {
    Icon,
  },

  afterMount() {

    const me = this

    const onKeydown: Listener = function (event) {
      if (!me.get('isFocus')) {
        return
      }
      // 阻止事件默认行为，避免光标的跳动
      switch ((event.originalEvent as KeyboardEvent).keyCode) {
        case 38:
          me.up()
          event.prevent()
          break
        case 40:
          me.down()
          event.prevent()
          break
      }
    }

    Yox.dom.on(
      DOCUMENT,
      RAW_EVENT_KEYDOWN,
      onKeydown
    )

    me.on(
      RAW_EVENT_BEFORE_DESTROY,
      function (event) {
        if (event.phase === Yox.Event.PHASE_CURRENT) {
          Yox.dom.off(
            DOCUMENT,
            RAW_EVENT_KEYDOWN,
            onKeydown
          )
        }
      }
    )

  }
})
