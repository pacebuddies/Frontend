import { NextPage } from 'next';
import { useState } from 'react';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import AccountSettingTab from '../../components/Settings/AccountSettingTab';
import HelpSettingsTab from '../../components/Settings/HelpSettingsTab';
import RecommendationsPreferencesSettingsTab from '../../components/Settings/RecommendationsPreferencesSettingsTab';
import TopNavBar from '../../components/TopNavBar';

enum SettingsTabs {
  Account = 'Account',
  RecommendationsPreferences = 'Recommendations Preferences',
  // Privacy = 'Privacy',
  // Notifications = 'Notifications',
  Help = 'Help',
}

//Choose which tab to display
const selectSettingsTab = (settingsTab: SettingsTabs) => {
  switch (settingsTab) {
    case SettingsTabs.Account:
      return <AccountSettingTab />;
    case SettingsTabs.RecommendationsPreferences:
      return <RecommendationsPreferencesSettingsTab />;
    case SettingsTabs.Help:
      return <HelpSettingsTab />;
    default:
      return null;
  }
};

const SettingsPage: NextPage = () => {
  const [settingsTab, setSettingsTab] = useState<SettingsTabs>(
    SettingsTabs.Account,
  );
  return (
    <>
      <TopNavBar />
      {/*TODO: Poprawić wyświetlanie tabów*/}
      <div className="mt-[91px] flex h-screen">
        {/*Options tabs*/}
        <div className="flex h-full w-72  flex-col overflow-y-auto  border-r-[1px] border-pb-gray">
          <button
            onClick={() => {
              setSettingsTab(SettingsTabs.Account);
            }}
            className="flex h-20 items-center justify-center  border-b-[1px] border-pb-gray"
          >
            <span>Account</span>
          </button>
          <button
            onClick={() => {
              setSettingsTab(SettingsTabs.RecommendationsPreferences);
            }}
            className="flex h-20  items-center justify-center border-b-[1px] border-pb-gray"
          >
            <span>Recommendations Preferences</span>
          </button>
          <button
            onClick={() => {
              setSettingsTab(SettingsTabs.Help);
            }}
            className="flex h-20  items-center justify-center border-b-[1px] border-pb-gray"
          >
            <span>Help</span>
          </button>
          <div className="flex-auto grow"></div>
        </div>
        {/*Settings tab content*/}
        <div>{selectSettingsTab(settingsTab)}</div>
      </div>
      <RecommendationsButton />
      <MenuButton />
    </>
  );
};
export default SettingsPage;
