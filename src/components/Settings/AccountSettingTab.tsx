import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import {
  useSetSettingsStore,
  useSettingsStore,
} from '../../store/settingsStore';

const AccountSettingTab: NextPage = () => {
  const measurementUnits = useSettingsStore((state) => state.measurementUnits);
  const setSettings = useSetSettingsStore((state) => state.setSettings);

  const handleUnitsChange = (value: 'metric' | 'imperial') => {
    setSettings({ measurementUnits: value });
  };

  return (
    <div className="flex flex-col m-2">
      <span className="text-pb-dark-gray text-2xl small-caps font-bold">
        account settings panel
      </span>
      <div className="flex flex-row items-center justify-start mt-4 ml-2 space-x-5">
        <span className="text-pb-dark-gray text-xl small-caps font-bold ">unit of measurement</span>
        <Dropdown label={measurementUnits}>
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
