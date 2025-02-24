import React, { FC, useCallback } from 'react';
import { CalloutExtension, CalloutExtensionAttributes } from 'remirror/extensions';
import { useActive, useCommands } from '@remirror/react-core';

import { CommandButton, CommandButtonProps } from './command-button';

export interface ToggleCalloutButtonProps
  extends Omit<CommandButtonProps, 'commandName' | 'active' | 'enabled' | 'attrs' | 'onSelect'> {
  attrs?: Partial<CalloutExtensionAttributes>;
}

export const ToggleCalloutButton: FC<ToggleCalloutButtonProps> = ({ attrs = {}, ...rest }) => {
  const { toggleCallout } = useCommands<CalloutExtension>();

  const handleSelect = useCallback(() => {
    if (toggleCallout.enabled(attrs)) {
      toggleCallout(attrs);
    }
  }, [toggleCallout, attrs]);

  const active = useActive<CalloutExtension>().callout(attrs);
  const enabled = toggleCallout.enabled(attrs);

  return (
    <CommandButton
      {...rest}
      commandName='toggleCallout'
      active={active}
      enabled={enabled}
      attrs={attrs}
      onSelect={handleSelect}
    />
  );
};
