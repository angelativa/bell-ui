import Yox from 'yox'

import template from './template/Checkbox.hbs'

import {
  TRUE,
  FALSE,
  UNDEFINED,
  RAW_STRING,
  RAW_BOOLEAN,
  RAW_DEFAULT,
  RAW_TYPE_PRIMARY,
  RAW_SIZE_COMMON,
  RAW_TYPE_INFO,
  RAW_TYPE_SUCCESS,
  RAW_TYPE_ERROR,
  RAW_TYPE_WARNING,
} from '../constant'

import {
  oneOf,
  findComponentUpward,
} from '../util'

export default Yox.define({

  template,

  model: 'checked',

  propTypes: {
    status: {
      type: oneOf([RAW_TYPE_INFO, RAW_TYPE_SUCCESS, RAW_TYPE_ERROR, RAW_TYPE_WARNING]),
    },
    size: {
      type: oneOf(RAW_SIZE_COMMON),
      value: RAW_DEFAULT,
    },
    label: {
      type: RAW_STRING,
    },
    name: {
      type: RAW_STRING,
    },
    value: {
      type: [RAW_STRING, RAW_BOOLEAN],
      required: TRUE,
    },
    indeterminate: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    disabled: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    checked: {
      type: RAW_BOOLEAN,
      value: FALSE,
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

  events: {
    'change.checkboxGroup': function (_, data) {
      this.set({
        checked: Yox.array.has(
          data.selected,
          this.get('value')
        )
      })
    }
  },

  watchers: {
    checked(checked) {
      this.fire(
        'change.checkbox',
        {
          checked,
          value: this.get('value')
        }
      )
    }
  },

  methods: {
    handleFocus() {
      this.set('isFocus', TRUE)
    },
    handleBlur() {
      this.set('isFocus', FALSE)
    }
  },

  beforeCreate(options) {

    const props = options.props || (options.props = {})

    const checkboxGroup = findComponentUpward(options.parent, '${prefix}checkboxGroup')
    if (checkboxGroup) {

      // 有 group，则 status 和 size 全听 group 的
      if (props.status !== UNDEFINED) {
        delete props.status
      }
      if (props.size !== UNDEFINED) {
        delete props.size
      }

      if (props.name === UNDEFINED) {
        props.name = checkboxGroup.get('name')
      }

      if (props.disabled === UNDEFINED) {
        props.disabled = checkboxGroup.get('disabled')
      }

      if (props.checked === UNDEFINED) {
        props.checked = Yox.array.has(checkboxGroup.get('selected'), props.value)
      }
    }
    else {
      // 没有 group，则要给 size 默认值
      if (props.size === UNDEFINED) {
        props.size = RAW_DEFAULT
      }
    }

  }

})
