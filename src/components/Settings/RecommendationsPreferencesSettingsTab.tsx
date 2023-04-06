import { NextPage } from 'next';
import { useState } from 'react';
import RangeSlider from './RangeSlider';

const RecommendationsPreferencesSettingsTab: NextPage = () => {
  const [value, setValue] = useState({ min: 0, max: 100 });
  console.log(value);
  return (
    <div>
      Recommendations Preferences Settings Tab
      <RangeSlider step={5} min={10} max={100} onChange={setValue} />
    </div>
  );
};

export default RecommendationsPreferencesSettingsTab;
