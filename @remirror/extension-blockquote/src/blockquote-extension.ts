import {
  ApplyExtraAttributes,
  CommandFunction,
  KeyBindings,
  NodeExtension,
  NodeExtensionSpec,
  NodeGroup,
  toggleWrap,
} from '@remirror/core';
import { wrappingInputRule } from '@remirror/pm/inputrules';

export class BlockquoteExtension extends NodeExtension {
  get name() {
    return 'blockquote' as const;
  }

  createNodeSpec(extra: ApplyExtraAttributes): NodeExtensionSpec {
    return {
      attrs: extra.defaults(),
      content: 'block*',
      group: NodeGroup.Block,
      defining: true,
      draggable: false,
      parseDOM: [{ tag: 'blockquote', getAttrs: extra.parse, priority: 100 }],
      toDOM: (node) => ['blockquote', extra.dom(node.attrs), 0],
    };
  }

  createCommands = () => {
    return {
      /**
       * Toggle the blockquote at the current selection.
       *
       * If none exists one will be created or the existing blockquote content will be
       * lifted out of the blockquote node.
       *
       * ```ts
       * actions.blockquote();
       * ```
       */
      toggleBlockquote: (): CommandFunction => toggleWrap(this.type),
    };
  };

  createKeymap = (): KeyBindings => {
    return {
      'Ctrl->': toggleWrap(this.type),
    };
  };

  createInputRules = () => {
    return [wrappingInputRule(/^\s*>\s$/, this.type)];
  };
}
