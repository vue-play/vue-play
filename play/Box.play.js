import {play} from '../src/play'

play('Box', module)
  .add('default', '<Box />')
  .add('dash border', '<Box :dashed="true" />')
  .add('dotted border', '<Box :dotted="true" />')
  .add('colorful', '<Box color="pink" />')
