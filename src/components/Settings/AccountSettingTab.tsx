import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import {
  useSetSettingsStore,
  useSettingsStore,
} from '../../store/settingsStore';

const AccountSettingTab: NextPage = () => {
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSetSettingsStore((state) => state.setSettings);

  const handleUnitsChange = (value: 'metric' | 'imperial') => {
    setSettings({ settings: { measurementUnits: value } });
  };

  return (
    <div>
      Account settings panel
      <div>
        <Dropdown label={settings.measurementUnits}>
          <Dropdown.Item onClick={() => handleUnitsChange('metric')}>
            Metric
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUnitsChange('imperial')}>
            Imperial
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default AccountSettingTab;
