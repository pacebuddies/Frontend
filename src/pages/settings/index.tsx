import {
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { NextPage } from 'next';
import { useState } from 'react';
import AccountSettingTab from '../../components/Settings/AccountSettingTab';
import HelpSettingsTab from '../../components/Settings/HelpSettingsTab';
import RecommendationsPreferencesSettingsTab from '../../components/Settings/RecommendationsPreferencesSettingsTab';
import Layout from '../../Layout';

enum SettingsTabs {
  Account = 'Account',
  RecommendationsPreferences = 'Preferences',
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
      <Layout>
        <div className="h-screen flex-col">
          {/*TODO: Poprawić wyświetlanie tabów*/}
          <div className="flex h-auto w-full">
            {/*Options tabs*/}
            <div className="flex h-[calc(100vh-71px)] w-24 flex-col overflow-y-auto border-r-[1px]  border-pb-gray md:w-80">
              <button
                onClick={() => {
                  setSettingsTab(SettingsTabs.Account);
                }}
                className="flex h-20 items-center justify-center  border-b-[1px] border-pb-gray"
              >
                <UserCircleIcon className="md:mr-1 h-6 w-6 text-pb-dark-gray" />
                <span className="hidden text-pb-dark-gray md:block">
                  Account
                </span>
              </button>
              <button
                onClick={() => {
                  setSettingsTab(SettingsTabs.RecommendationsPreferences);
                }}
                className="flex h-20  items-center justify-center border-b-[1px] border-pb-gray"
              >
                <AdjustmentsHorizontalIcon className="md:mr-1 h-6 w-6 text-pb-dark-gray" />
                <span className="hidden text-pb-dark-gray md:block">
                  Preferences
                </span>
              </button>
              <button
                onClick={() => {
                  setSettingsTab(SettingsTabs.Help);
                }}
                className="flex h-20 items-center justify-center border-b-[1px] border-pb-gray"
              >
                <QuestionMarkCircleIcon className="md:mr-1 h-6 w-6 text-pb-dark-gray" />
                <span className="hidden text-pb-dark-gray md:block">Help</span>
              </button>
              <div className="flex-auto grow"></div>
            </div>
            {/*Settings tab content*/}
            <div className="w-full">{selectSettingsTab(settingsTab)}</div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default SettingsPage;
