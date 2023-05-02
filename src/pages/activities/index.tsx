// Activities.js
import dynamic from 'next/dynamic';

const ClientOnlyActivities = dynamic(
  () => import('../../../src/components/Activity/ClientOnlyActivities'),
  { ssr: false },
);

const Activities = () => {
  return <ClientOnlyActivities />;
};

export default Activities;
