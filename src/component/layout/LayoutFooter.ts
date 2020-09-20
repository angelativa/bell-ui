import Yox from 'yox'

import template from './template/LayoutFooter.hbs'

import {
  RAW_STRING,
} from '../constant'

export default Yox.define({

  template,

  name: '${prefix}LayoutFooter',

  propTypes: {
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },
})