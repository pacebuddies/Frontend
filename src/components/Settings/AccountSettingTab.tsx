import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import { getSession, signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import pacebuddiesApi, {
  stravaOauthApi,
} from '../../instances/axiosConfigured';
import {
  useSetSettingsStore,
  useSettingsStore,
} from '../../store/settingsStore';
import ContactInfo from "./ContactInfo";

const Modal = dynamic(() => import('flowbite-react').then((mod) => mod.Modal), {
  ssr: false,
});
const ModalBody = dynamic(
  () => import('flowbite-react').then((mod) => mod.Modal.Body),
  { ssr: false },
);
const ModalHeader = dynamic(
  () => import('flowbite-react').then((mod) => mod.Modal.Header),
  { ssr: false },
);
const AccountSettingTab: NextPage = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const router = useRouter();
  const measurementUnits = useSettingsStore((state) => state.measurementUnits);
  const setSettings = useSetSettingsStore((state) => state.setSettings);

  const handleUnitsChange = (value: 'metric' | 'imperial') => {
    setSettings({ measurementUnits: value });
  };
  async function Deauthorize() {
    const session = await getSession();
    stravaOauthApi
      .post('/deauthorize', {
        access_token: `${session?.accessToken}`,
      })
      .then((res) => {})
      .catch((err) => {});

    return await signOut({ callbackUrl: '/' });
  }
  const handleDeleteAccount = async () => {
    pacebuddiesApi.delete('bridge/athlete').then(() => {
      localStorage.clear();
      Deauthorize();
    });
  };

  return (
    <div className="m-2 flex h-full flex-col">
      <span className="small-caps flex items-center justify-center text-2xl font-bold text-pb-dark-gray">
        account settings panel
      </span>
      <div className="flex h-full flex-col justify-between pb-28">
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
        <ContactInfo />
        <div className="ml-2 mt-4 flex flex-row items-center justify-start space-x-5">
          <span className="small-caps text-xl font-bold text-pb-dark-gray ">
            Remove account permanently
          </span>
          <Button color="failure" onClick={() => setOpenModal('default')}>
            Delete account
          </Button>



          {/*Modal*/}
          <Modal
            show={openModal === 'default'}
            onClose={() => setOpenModal(undefined)}
            popup
            size="md"
          >
            <ModalHeader />
            <ModalBody>
              <div className="text-center">
                <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete this account? There is no
                  going back once you do this.
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteAccount}>
                    Yes, I&apos;m sure
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(undefined)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingTab;
