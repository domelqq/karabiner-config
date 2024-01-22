import {
  duoLayer,
  ifVar,
  layer,
  mapSimultaneous,
  rule,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { digitsAndDelete, digitsAndDeleteHint } from './layers/digits-delete'
import { emoji, emojiHint } from './layers/emoji'
import { launchApp } from './layers/launch-app'
import { openLinks } from './layers/open-links'
import { symbols, symbolsHint } from './layers/symbols'
import { system } from './layers/system'
import {
  toVimNormalMode,
  toVimVisualMode,
  vimModes,
  vimNormalMode,
} from './layers/vim'
import { appMappings } from './rules/app-mappings'
import { duoModifier } from './utils/duo-modifier'

const rules = [
  rule('duo-modifiers').manipulators([
    duoModifier('fd', '⌘'),
    duoModifier('fs', '⌃'),
    duoModifier('fa', '⌥'),

    duoModifier('ds', '⇧'),

    duoModifier('gd', '⌘⇧'),
    duoModifier('gs', '⌃⇧'),
    duoModifier('ga', '⌥⇧'),

    duoModifier('vc', '⌘⌥'),
    duoModifier('vx', '⌘⌃'),
    duoModifier('cx', '⌥⌃'),

    duoModifier('vz', '⌘⌥⌃'),

    duoModifier('jk', '⌘'),
    duoModifier('jl', '⌃'),
    duoModifier('j;', '⌥'),

    duoModifier('kl', '⇧'),

    duoModifier('hk', '⌘⇧'),
    duoModifier('hl', '⌃⇧'),
    duoModifier('h;', '⌘⇧'),

    duoModifier('m,', '⌘⌥'),
    duoModifier('m.', '⌘⌃'),
    duoModifier(',.', '⌥⌃'),

    duoModifier('m/', '⌘⌥⌃'),
  ]),

  rule('to vim modes', ifVar('vim').unless()).manipulators([
    mapSimultaneous(['a', ';']).to(toVimNormalMode),
    mapSimultaneous(['v', ';']).to(toVimVisualMode),
  ]),

  // ; can be released once layer is activated
  duoLayer('f', ';', 'vim')
    .condition(ifVar('vim-mode', 'visual').unless())
    .manipulators(vimNormalMode)
    .notification('vim - h ← j ↓ k ↑ l →'),
  duoLayer('s', ';').manipulators(symbols).notification(symbolsHint),
  duoLayer('d', ';')
    .manipulators(digitsAndDelete)
    .notification(digitsAndDeleteHint),
  duoLayer('z', 'x').manipulators(emoji).notification(emojiHint),
  duoLayer('l', ';').manipulators(launchApp).notification('Launch App 🚀 📱'),
  duoLayer('.', '/').manipulators(openLinks).notification('Open Link 🔗'),

  layer('`', 'system').manipulators(system),

  rule('Homerow').manipulators([
    mapSimultaneous(['f', 'j']).to('␣', 'Hyper'), // Click
    mapSimultaneous(['f', 'k']).to('⏎', 'Hyper'), // Scroll
  ]),

  vimModes,
  appleKeyboard,
  appMappings,
]

writeToProfile('Default', rules, {
  'basic.simultaneous_threshold_milliseconds': 100,
  'duo_layer.threshold_milliseconds': 200,
  'duo_layer.notification': true,
})
