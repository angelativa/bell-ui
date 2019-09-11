import Yox from 'yox'

import template from './template/Card.hbs'

import {
  FALSE,
  RAW_STRING,
  RAW_BOOLEAN,
  RAW_ALWAYS,
  RAW_HOVER,
  RAW_NEVER,
} from '../constant'

import {
  oneOf,
} from '../util'

export default Yox.define({
  template,
  propTypes: {
    simple: {
      type: RAW_BOOLEAN,
      value: FALSE,
    },
    shadow: {
      type: oneOf([RAW_ALWAYS, RAW_HOVER, RAW_NEVER]),
      value: RAW_ALWAYS,
    },
    className: {
      type: RAW_STRING,
    },
    style: {
      type: RAW_STRING,
    }
  },
})