import Yox from 'yox'

import template from './template/Option.hbs'

import {
  TRUE,
  FALSE,
  RAW_STRING,
  RAW_NUMERIC,
  RAW_NUMBER,
  RAW_BOOLEAN,
} from '../constant'

import {
  findComponentUpward,
} from '../util'

function isOptionSelected(values: any[] | any, value: any) {
  return Yox.is.array(values)
    ? Yox.array.has(values, value, FALSE)
    : values == value
}

export default Yox.define({
  template,
  propTypes: {
    index: {
      type: RAW_NUMERIC,
      required: TRUE,
    },
    value: {
      type: [RAW_STRING, RAW_NUMBER],
    },
    disabled: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    text: {
      type: RAW_STRING,
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },
  events: {
    optionHoveredChange(_, data) {
      let isHover = data.index == this.get('index')
      this.set({
        isHover: isHover
      })
      if (isHover && !this.get('Option')) {
        this.set({
          Option: data.selected
        })
      }
    },

    'sync.select': function (_, data) {
      const { value, selected, multiple } = data
      if (value === this.get('value')) {
        this.set('isSelected', selected)
      }
      else if (selected && !multiple) {
        this.set('isSelected', FALSE)
      }
    }
  },

  data(options) {
    const select = findComponentUpward(options.parent, '${prefix}select')
    return {
      isSelected: select
        ? isOptionSelected(select.get('value'), this.get('value'))
        : FALSE,
      isHover: FALSE,
    }
  },

  afterMount() {
    this.fire('add.selectOption')
  },

  beforeDestroy() {
    this.fire('remove.selectOption')
  }
})
