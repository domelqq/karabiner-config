import { map, toKey, withCondition, withMapper } from 'karabiner.ts'
import { arc, ifArc } from '../apps/arc'
import { ide, ifIde } from '../apps/jetbrains-ide'

export const tertiaryLeft = [
  withCondition(ifArc)({
    '[': arc.previousSpace,
    ']': arc.nextSpace,
  }),
  withCondition(ifIde)({
    // ← ↑ ↓ → + ⇧
    6: ide.moveCaret_previousCamelWord_withSelection,
    9: ide.moveCaret_nextCamelWord_withSelection,
  }),

  // ← ↑ ↓ → + ⇧
  withMapper({ h: '←', j: '↑', k: '↓', l: '→' } as const)((k, v) =>
    map(k).to(v, '⇧'),
  ),
  withMapper({ n: '←', m: '↑', ',': '↓', '.': '→' } as const)((k, v) =>
    map(k).to(v, '⌘⇧'),
  ),
  withMapper({ y: '←', u: '↑', i: '↓', o: '→' } as const)((k, v) =>
    map(k).to(v, '⌥⇧'),
  ),
]

export const tertiaryRight = [
  withCondition(ifIde)({
    '⏎': ide.edit_addCaretsToEndsOfSelectedLines,
    h: ide.edit_cloneCaret_above,
    j: ide.edit_cloneCaret_below,

    t: ide.view_quickTypeDefinition,
    r: ide.run_debugPopup,
    e: ide.view_errorDescription,
    w: ide.navigate_byReference_fileStructure,
    q: ide.view_quickDefinition,

    f: ide.find_addSelectionForNextOccurrence,
    d: ide.run_debugPopup,
    s: ide.navigate_byReference_selectIn,
    a: ide.view_parameterInfo,

    c: ide.edit_copyPathReference,
    v: ide.edit_findUsages_showUsages,
  }),

  { '⇥': toKey('⇥', '⌃') },
]

// More IDE only mapping
export const tertiaryRightIde = {
  '⏎': ide.runFile,

  r: ide.run_editConfigurations,
  w: ide.editorTabs_closeOtherTabs,
  f: ide.find_selectAllOccurrences,
  v: ide.edit_findUsages_findUsages,
}
