import Yox from 'yox'

import template from './template/Button.hbs'

import {
  UNDEFINED,
  RAW_SMALL,
  RAW_LARGE,
  RAW_DEFAULT,
  RAW_STRING,
  RAW_BOOLEAN,
  RAW_TYPE_ARRAY,
  RAW_BORDER_NONE,
  RAW_BORDER_SOLID,
  RAW_BORDER_DASHED,
  RAW_SHAPE_ROUND,
  RAW_SHAPE_CIRCLE,
} from '../constant'

import {
  oneOf,
  findComponentUpward,
} from '../util'

export default Yox.define({

  template,

  propTypes: {
    type: {
      type: oneOf(RAW_TYPE_ARRAY),
    },
    size: {
      type: oneOf([RAW_DEFAULT, RAW_LARGE, RAW_SMALL]),
      value: RAW_DEFAULT,
    },
    border: {
      type: oneOf([RAW_BORDER_NONE, RAW_BORDER_SOLID, RAW_BORDER_DASHED]),
      value: RAW_BORDER_SOLID,
    },
    shape: {
      type: oneOf([RAW_SHAPE_ROUND, RAW_SHAPE_CIRCLE]),
    },
    ghost: {
      type: RAW_BOOLEAN,
    },
    fluid: {
      type: RAW_BOOLEAN,
    },
    disabled: {
      type: RAW_BOOLEAN,
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },

  beforeCreate(options) {

    const props = options.props || (options.props = {})

    const buttonGroup = findComponentUpward(options.parent, '${prefix}buttonGroup')
    if (buttonGroup) {

      // 有 group，则 size、shape 全听 group 的
      if (props.size !== UNDEFINED) {
        delete props.size
      }
      if (props.shape !== UNDEFINED) {
        delete props.shape
      }

      if (props.disabled === UNDEFINED) {
        props.disabled = buttonGroup.get('disabled')
      }
    }
    else {
      // 没有 group，则要给 type 和 size 默认值
      if (props.size === UNDEFINED) {
        props.size = RAW_DEFAULT
      }
    }

  }

})