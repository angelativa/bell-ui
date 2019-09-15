import Yox, { CustomEventInterface } from 'yox'

import template from './template/Input.hbs'

import {
  TRUE,
  FALSE,
  DOCUMENT,
  RAW_BOOLEAN,
  RAW_STRING,
  RAW_NUMERIC,
  RAW_OBJECT,
  RAW_EVENT_KEYDOWN,
  RAW_EVENT_KEYPRESS,
  RAW_EVENT_KEYUP,
  RAW_SIZE_COMMON,
  RAW_DEFAULT,
  RAW_TYPE_INFO,
  RAW_TYPE_SUCCESS,
  RAW_TYPE_ERROR,
  RAW_TYPE_WARNING,
} from '../constant'

import {
  oneOf,
} from '../util'

const TEXT_TYPE_PASSWORD = 'password'
const TEXT_TYPE_TEXTAREA = 'textarea'
const TEXT_TYPE_TEXT = 'text'
const ROW_HEIGHT = 21
// 上下 5px padding + 1px border
const PADDING_VERTICAL = 12

export default Yox.define({

  template,

  propTypes: {
    value: {
      type: RAW_STRING,
    },
    size: {
      type: oneOf(RAW_SIZE_COMMON),
      value: RAW_DEFAULT,
    },
    autoSize: {
      type: [RAW_BOOLEAN, RAW_OBJECT],
    },
    type: {
      type: oneOf([TEXT_TYPE_TEXT, TEXT_TYPE_TEXTAREA, TEXT_TYPE_PASSWORD]),
      value: TEXT_TYPE_TEXT,
    },
    status: {
      type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
    },
    placeholder: {
      type: RAW_STRING,
    },
    rows: {
      type: RAW_NUMERIC,
      value: 1
    },
    disabled: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    clearable: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    secure: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    prefix: {
      type: RAW_STRING,
    },
    suffix: {
      type: RAW_STRING,
    },
    wrap: {
      type: oneOf(['hard', 'soft']),
    },
    spellCheck: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    readOnly: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    maxLength: {
      type: RAW_NUMERIC,
    },
    width: {
      type: RAW_NUMERIC,
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    },
  },

  data() {
    return {
      isSecure: TRUE,
      isFocus: FALSE,
      currentType: this.get('type'),

      TEXT_TYPE_TEXT,
      TEXT_TYPE_TEXTAREA,
      TEXT_TYPE_PASSWORD,
    }
  },

  filters: {
    isBoolean: Yox.is.boolean
  },

  watchers: {
    value(value) {
      this.fire(
        'change.input',
        { value }
      )
    },
    isSecure(isSecure) {
      this.set({
        currentType: isSecure
          ? TEXT_TYPE_PASSWORD
          : TEXT_TYPE_TEXT
      })
    }
  },

  methods: {
    handleFocus() {
      this.set('isFocus', TRUE)
      this.fire('focus.input')
    },
    handleBlur() {
      this.set('isFocus', FALSE)
      this.fire('blur.input')
    },
    handleClearClick() {
      this.set('value', '')
      this.fire('clear.input')
    },
  },

  computed: {
    textareaStyle() {
      let size = this.get('autoSize')
      if (size) {
        let rows = this.get('rows')
        let value = this.get('value')
        if (Yox.is.object(size)) {
          rows = value ? value.split('\n').length : size.minRows
          return `min-height: ${size.minRows * ROW_HEIGHT + PADDING_VERTICAL}px;max-height: ${size.maxRows * ROW_HEIGHT + PADDING_VERTICAL}px;height: ${rows * ROW_HEIGHT + PADDING_VERTICAL}px;`
        }
        else {
          rows = value ? value.split('\n').length : 1
          return `min-height: ${ROW_HEIGHT + PADDING_VERTICAL}px;height: ${rows * ROW_HEIGHT + PADDING_VERTICAL}px;`
        }
      }
      else {
        return `height: ${this.get('rows') * ROW_HEIGHT + PADDING_VERTICAL}px;`
      }
    }
  },

  afterMount() {

    const me = this

    const onKeydown = function (event: CustomEventInterface) {

      if (!me.get('isFocus')) {
        return
      }

      const originalEvent = event.originalEvent as KeyboardEvent
      me.fire(
        new Yox.Event('keydown.input', originalEvent)
      )

      if (originalEvent.keyCode === 13) {
        me.fire('enter.input')
      }

    }
    const onKeyup = function (event: CustomEventInterface) {

      if (!me.get('isFocus')) {
        return
      }

      const originalEvent = event.originalEvent as KeyboardEvent
      me.fire(
        new Yox.Event('keyup.input', originalEvent)
      )

    }
    const onKeypress = function (event: CustomEventInterface) {

      if (!me.get('isFocus')) {
        return
      }

      const originalEvent = event.originalEvent as KeyboardEvent
      me.fire(
        new Yox.Event('keypress.input', originalEvent)
      )

    }

    Yox.dom.on(
      DOCUMENT,
      RAW_EVENT_KEYDOWN,
      onKeydown
    )
    Yox.dom.on(
      DOCUMENT,
      RAW_EVENT_KEYUP,
      onKeyup
    )
    Yox.dom.on(
      DOCUMENT,
      RAW_EVENT_KEYPRESS,
      onKeypress
    )

    me.on(
      'beforeDestroy.hook',
      function (event) {
        if (event.phase === Yox.Event.PHASE_CURRENT) {
          Yox.dom.off(
            DOCUMENT,
            RAW_EVENT_KEYDOWN,
            onKeydown
          )
          Yox.dom.off(
            DOCUMENT,
            RAW_EVENT_KEYUP,
            onKeyup
          )
          Yox.dom.off(
            DOCUMENT,
            RAW_EVENT_KEYPRESS,
            onKeypress
          )
        }
      }
    )

  }
})
