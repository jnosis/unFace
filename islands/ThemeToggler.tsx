import type { TargetedMouseEvent } from 'preact';
import type { ThemeScheme } from '~/types.ts';
import { useSignal } from '@preact/signals';
import { IconAdjustments, IconMoon, IconSun } from '~/components/Icons.tsx';
import Panel from '~/components/Panel.tsx';
import { useTheme } from '~/hooks/useTheme.ts';

type ThemeTogglerProps = {
  prev: ThemeScheme;
};

export default function ThemeToggler({ prev }: ThemeTogglerProps) {
  const { scheme, darkMode, setScheme } = useTheme(prev);
  const panelOpened = useSignal<boolean>(false);

  const handleToggle = () => {
    setScheme(darkMode.value ? 'light' : 'dark');
  };

  const handleContextMenu = (e: TargetedMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    panelOpened.value = true;
  };

  const handleMouseLeave = () => {
    panelOpened.value = false;
  };

  return (
    <div
      class='relative px-4 py-2'
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseLeave}
    >
      <div class='cursor-pointer' onClick={handleToggle}>
        {darkMode.value ? <IconMoon /> : <IconSun />}
      </div>
      {panelOpened.value && (
        <Panel<ThemeScheme>
          name='theme'
          items={[
            { id: 'light', Icon: IconSun },
            { id: 'dark', Icon: IconMoon },
            { id: 'system', Icon: IconAdjustments },
          ]}
          checked={scheme.value}
          onChange={setScheme}
        />
      )}
    </div>
  );
}
