import {
  FlagIcon,
  HandThumbUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { ContactInfo } from '../../internalTypes/contactInfo';
import { MatchData } from '../../internalTypes/matchData';
import { ReportData } from '../../internalTypes/reportData';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import Accordion from '../Accordion';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  athlete: MatchData;
  sportType: SportTypeEnum;
}

function fetchContactInfo(id: string) {
  return pacebuddiesApi
    .get(`bridge/athlete/${id}/contactinfo`)
    .then((response) => response.data);
}

const MatchSegment = ({ sportType, athlete, ...props }: IProps) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [userUpvoted, setUserUpvoted] = useState<boolean>(
    athlete.is_upvoted,
  );
  const [unMatched, setUnMatched] = useState<boolean>(false);
  const [report, setReport] = useState<ReportData>({
    reported_athlete_id: athlete.id,
    reason: '',
    description: '',
  });
  function fileReport(report: ReportData) {
    return pacebuddiesApi
      .post(`bridge/report`, {
        ...report,
      })
      .then((response) => {
        setReport((prevState) => ({
          ...prevState,
          reason: '',
          description: '',
        }));
        setOpenModal(undefined);
        return toast.success('Filed report successfully');
      })
      .catch((error) => {
        return toast.error(`Failed to file report: ${error.message}`);
      });
  }

  function upvoteUser() {
    return pacebuddiesApi
      .post(`recommender/upvote`, {
        rated_athlete_id: athlete.id,
      })
      .then((response) => {
        setUserUpvoted(true);
        return toast.success('Liked user successfully');
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 400) {
            return toast.warning(`${error.response.data.message}`);
          }
        }
        return toast.error(`Failed to like user: ${error.message}`);
      });
  }
  function downvoteUser() {
    return pacebuddiesApi
      .delete(`recommender/upvote`, {
        data: {
          rated_athlete_id: athlete.id,
        },
      })
      .then((response) => {
        setUserUpvoted(false);
        return toast.success('Disliked user successfully');
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 400) {
            return toast.warning(`${error.response.data.message}`);
          }
        }
        return toast.error(`Failed to dislike user: ${error.message}`);
      });
  }

  function unmatchUser() {
    return pacebuddiesApi
      .post(`recommender/recommendations/match/decline`, {
        recommendation_athlete_id: athlete.id,
        sport_type: sportType,
      })
      .then((response) => {
        setUnMatched(true);
        return toast.success('Unmatched user successfully');
      })
      .catch((error) => {
        return toast.error(`Failed to unmatch user: ${error.message}`);
      });
  }

  const {
    data: ContactData,
    isSuccess,
    isLoading,
  } = useQuery<ContactInfo[]>({
    queryKey: ['contactInfo', athlete.id],
    queryFn: () => fetchContactInfo(athlete.id),
  });
  const { firstname, lastname, profile, sex, country, city } = athlete;
  const { className } = props;
  return (
    <>
      <div {...props} className={(unMatched ? 'hidden ' : '') + className}>
        <div className={'flex justify-between border-[1px] border-pb-green'}>
          <div className="flex ">
            <Image
              src={profile}
              height={96}
              width={96}
              alt={`${firstname + ' ' + lastname} user avatar`}
              className="h-24 w-24"
              title={`${firstname + ' ' + lastname}`}
            />
            <div className="ml-4 flex w-[calc(100%-4rem)] shrink-0 flex-col justify-center">
              <Link href={`/profile/${athlete.id}`}
                className=" truncate pr-3 text-xl font-bold text-pb-green"
                title={`${firstname + ' ' + lastname}`}
              >
                {firstname} {lastname}
              </Link>
              <span className="truncate pr-3 text-sm font-bold text-pb-dark-gray">
                {sex == 'F' ? 'Female' : 'Male'}, {city}, {country}
              </span>
            </div>
          </div>
          <div className="flex pr-1 md:pr-4">
            <div className="flex w-10 items-center justify-center">
              {/*Upvote user icon*/}
              {userUpvoted ? (
                <HandThumbUpIcon
                  className="h-12 w-12 cursor-pointer text-pb-gray"
                  onClick={downvoteUser}
                />
              ) : (
                <HandThumbUpIcon
                  className="h-12 w-12 cursor-pointer text-pb-green"
                  onClick={upvoteUser}
                />
              )}
            </div>
            <div className="flex w-20 flex-col items-center justify-center p-1 md:w-40">
              <a
                href={`https://www.strava.com/athletes/${athlete.id}`}
                target={'_blank'} rel="noreferrer">
                <Button
                color="strava"
                className="w-full">
                <span>View on Strava</span>
              </Button>
              </a>
            </div>

            <div className="flex flex-col justify-between">
              <XMarkIcon
                className="h-6 w-6 cursor-pointer"
                onClick={unmatchUser}
              />
              {/*Report flag icon*/}
              <FlagIcon
                className="h-6 w-6 cursor-pointer text-pb-orange"
                onClick={() => setOpenModal('default')}
              />
            </div>
          </div>
        </div>
        <div>
          <Accordion title={'Contact info'}>
            <div className="grid grid-cols-2">
              {isSuccess &&
                ContactData.map((contactInfo) => (
                  <div key={contactInfo.id} className="col-span-3">
                    <div className="flex items-center border-b-[1px] border-pb-gray">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center"></div>
                      <div className="mr-2 text-sm font-bold text-pb-dark-gray w-20 shrink-0">
                        {contactInfo.label}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-pb-dark-gray">
                          User: {contactInfo.info}
                        </div>

                        <div className="text-sm font-bold text-pb-dark-gray">
                          Description: {contactInfo.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {isLoading && (
              <div className="text-sm font-bold text-pb-dark-gray">
                Loading...
              </div>
            )}
            {!isLoading && isSuccess && ContactData.length === 0 && (
              <div className="text-sm font-bold text-pb-dark-gray">
                No contact info available
              </div>
            )}
          </Accordion>
        </div>
      </div>

      {/*Report user modal*/}
      <Modal
        show={openModal === 'default'}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>File a report</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="reason" value="Reason" />
              </div>
              <TextInput
                id="reason"
                required
                value={report.reason}
                onChange={(e) =>
                  setReport((prevState) => {
                    return { ...prevState, reason: e.target.value };
                  })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                placeholder="Leave a description..."
                rows={4}
                required
                value={report.description}
                onChange={(e) =>
                  setReport((prevState) => {
                    return { ...prevState, description: e.target.value };
                  })
                }
              />
            </div>

            <div className="w-full">
              <Button
                color="success"
                onClick={() => fileReport(report)}
                type="submit"
              >
                Send
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MatchSegment;
