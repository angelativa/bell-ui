import Yox, { CustomEvent, Data } from 'yox'

import template from './template/Menu.hbs'

import {
  TRUE,
  FALSE,

  RAW_ARRAY,
  RAW_STRING,
  RAW_BOOLEAN,

  RAW_HORIZONTAL,
  RAW_VERTICAL,
  RAW_INLINE
} from '../constant'

import {
  oneOf,
} from '../util'

export default Yox.define({

  name: '${prefix}menu',

  propTypes: {
    mode: {
      type: oneOf([RAW_HORIZONTAL, RAW_VERTICAL, RAW_INLINE]),
      value: RAW_HORIZONTAL
    },
    theme: {
      type: oneOf(['dark', 'light']),
      value: 'dark'
    },
    isCollapsed: {
      type: RAW_BOOLEAN,
      value: FALSE
    },
    activeName: {
      type: RAW_STRING
    },
    openNames: {
      type: RAW_ARRAY,
      value: []
    },
    className: {
      type: RAW_STRING
    },
    style: {
      type: RAW_STRING
    }
  },

  template,

  watchers: {
    theme(theme: string) {
      this.fire(
        'themeChanged',
        { theme },
        TRUE
      )
    },
    isCollapsed(isCollapsed: boolean) {
      this.fire(
        'isCollapsedChanged',
        { isCollapsed },
        TRUE
      )
    }
  },

  events: {
    menuItemSelected(event: CustomEvent, data: Data) {
      if (event.phase === Yox.Event.PHASE_UPWARD) {
        this.fire(
          'menuItemSelected',
          data,
          TRUE
        )
      }
    }
  }
})