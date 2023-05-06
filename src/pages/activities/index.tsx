// Activities.js
import dynamic from 'next/dynamic';
import Layout from '../../Layout';
import { useSettingsStore } from "../../store/settingsStore";

const ClientOnlyActivities = dynamic(
  () => import('../../../src/components/Activity/ClientOnlyActivities'),
  { ssr: false },
);
const Activities = () => {

  return (
    <Layout>
      <div className="flex shrink-0 flex-col">
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          <span className="self-center whitespace-nowrap font-istok-web text-2xl small-caps font-bold text-pb-green">
            Activities
          </span>
        </div>
        <div className="flex h-full min-h-screen w-full justify-center border-t-2 border-t-pb-green bg-pb-gray">
          {/*Central content*/}
          <div className="flex w-full flex-col items-center bg-white md:w-2/3">
            <ClientOnlyActivities />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
