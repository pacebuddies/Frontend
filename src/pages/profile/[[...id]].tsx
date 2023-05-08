import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import TopNavBar from '../../components/TopNavBar';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IAthlete } from '../../internalTypes/interfaces';

const ProfilePage: NextPage = () => {
  const params = useRouter();

  const id: string[] | undefined = params.query['id'] as string[];

  const fetchAthlete = (id: string[] | undefined): Promise<IAthlete> => {
    if (id === undefined) {
      return pacebuddiesApi.get('bridge/athlete').then((result) => result.data);
    } else {
      return pacebuddiesApi
        .get(`bridge/athlete/${id[0]}`)
        .then((result) => result.data);
    }
  };
  const athleteQuery = useQuery<IAthlete>({
    queryKey: ['userProfileAthlete', id],
    queryFn: () => fetchAthlete(id),
  });

  const sex = () => {
    if (athleteQuery.data?.sex == 'M') return 'Male';
    if (athleteQuery.data?.sex == 'F') return 'Female';
    return 'Not specified';
  };

  return (
    <>
      <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">
        <TopNavBar />
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          {/*<span>Naglowek</span>*/}
          <img
            className="h-32 w-32 items-center border-2 border-pb-green"
            src={athleteQuery.data?.profile}
            alt="user avatar"
          />
          <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
            {`${athleteQuery.data?.firstname ?? ''} ${
              athleteQuery.data?.lastname ?? ''
            }`}
          </span>
        </div>
        <div className="flex h-full w-full justify-center border-t border-pb-green">
          <div className="flex h-full w-full flex-col items-center bg-white md:w-2/3">
            {/*number of activities + wykres ostatniego tygodnia*/}
            <div
              className="mt-2 flex flex-col items-center justify-between
                            space-y-4 md:flex-row md:space-x-14 md:space-y-0"
            >
              {/*number of activities*/}
              <div className="flex w-1/2 flex-col items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-xl text-pb-dark-gray">
                  NUMBER OF ACTIVITIES
                </span>
                <div className="flex flex-row space-x-6">
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      4
                    </span>
                    <span className="text-m self-center whitespace-nowrap font-istok-web text-pb-dark-gray">
                      LAST WEEK
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      15
                    </span>
                    <span className="text-m self-center whitespace-nowrap font-istok-web text-pb-dark-gray">
                      LAST 4 WEEKS
                    </span>
                  </div>
                </div>
              </div>
              {/*wykres*/}
              <div className="flex items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-xl italic text-pb-dark-gray">
                  WYKRES
                </span>
              </div>
            </div>
            {/*PERSONAL INFO SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*PERSONAL INFO HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Personal info
                </span>
              </div>
              {/*CONTENT PERSONAL INFO*/}
              <div className="mt-2 flex w-full flex-col items-start justify-start space-y-2">
                {/*GENDER SECTION*/}
                <div className="flex flex-row items-center justify-center space-x-5  pl-16">
                  {/*Gender header*/}
                  <span className="flex items-center justify-center text-pb-green">
                    Gender
                  </span>
                  {/*Zmienna athletes.sex*/}
                  <span className="flex items-center justify-center text-pb-dark-gray">
                    {sex()}
                  </span>
                </div>
                {/*LOCATION SECTION*/}
                <div className="flex flex-row items-center justify-center space-x-5 pl-14">
                  {/*Location header*/}
                  <span className="flex items-center justify-center text-pb-green">
                    Location
                  </span>
                  {/*Zmienna athletes.city + woj + kraj?*/}
                  <span className="flex items-center justify-center text-pb-dark-gray">
                    {athleteQuery.data?.city ?? 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
            {/*SUMMARY OF ACTV SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*SUMMARY OF ACTV HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Summary of Activities
                </span>
              </div>
              {/*WYKRESY*/}
              <div className="mt-2 flex w-full flex-col items-center justify-center space-y-3">
                <span className="flex text-lg text-pb-dark-gray">
                  Distance per day
                </span>
                <span className="flex text-xl italic">Wykres1</span>
                <span className="flex text-lg text-pb-dark-gray">
                  Sports Type
                </span>
                <span className="flex text-xl italic">Wykres2</span>
              </div>
            </div>
            {/*Latest Activities SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*Latest Activity HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Latest Activities
                </span>
              </div>
              <div className="flex flex-col items-center justify-center"></div>
            </div>
          </div>
        </div>
      </div>
      <RecommendationsButton />
      <MenuButton />
    </>
  );
};
export default ProfilePage;
