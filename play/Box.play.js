import {play} from '../src/play'
import Box from './Box.vue'

play(Box)
  .name('Box')
  .displayName('The Box Component')
  .add('default', '<Box />')
  .add('dash border', '<Box :dashed="true" />')
  .add('dotted border', '<Box :dotted="true" />')
  .add('colorful', '<Box color="pink" />')
