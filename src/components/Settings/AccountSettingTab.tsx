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
    <div className="m-2 flex flex-col">
      <span className="small-caps flex items-center justify-center text-2xl font-bold text-pb-dark-gray">
        account settings panel
      </span>
      <div className="ml-2 mt-4 flex flex-row items-center justify-start space-x-5">
        <span className="small-caps text-xl font-bold text-pb-dark-gray ">
          unit of measurement
        </span>
        <Dropdown
          label={measurementUnits}
          gradientDuoTone="greenToDarkGreen"
          outline={true}
        >
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
