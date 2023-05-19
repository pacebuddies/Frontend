// Activities.js
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IActivity } from '../../internalTypes/interfaces';
import Layout from '../../Layout';
import { useSettingsStore } from '../../store/settingsStore';

const ClientOnlyActivities = dynamic(
  () => import('../../../src/components/Activity/ClientOnlyActivities'),
  { ssr: false },
);
const Activities = () => {
  const settingStore = useSettingsStore((store) => store.measurementUnits);

  const fetchActivities = () => {
    return pacebuddiesApi
      .get('bridge/athlete/activities', { params: { count: 20 } })
      .then((res) => res.data);
  };

  const { data, isSuccess } = useQuery<IActivity[]>({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });
  console.log(data);
  return (
    <Layout>
      <div className="flex shrink-0 flex-col">
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          <span className="small-caps self-center whitespace-nowrap font-istok-web font-bold text-7xl capitalize text-transparent bg-clip-text bg-gradient-to-r from-pb-green to-pb-orange ">
            Activities
          </span>
        </div>
        <div className="flex h-full min-h-screen w-full justify-center border-t-2 border-t-pb-green bg-pb-gray">
          {/*Central content*/}
          <div className="flex w-full flex-col items-center bg-white md:w-2/3">
            {isSuccess && (
              <ClientOnlyActivities
                activities={data}
                unitPreference={settingStore}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
