import Yox from 'yox'

import template from './template/Timeline.hbs'
// import './style/Timeline.styl'

import {
  FALSE,
  RAW_BOOLEAN,
  RAW_STRING,
} from '../constant'

export default Yox.define({

  template,

  name: '${prefix}Timeline',

  propTypes: {
    pending: {
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
})
