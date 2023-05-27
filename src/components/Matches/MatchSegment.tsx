import {
  FlagIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { ContactInfo } from '../../internalTypes/contactInfo';
import { MatchData } from '../../internalTypes/matchData';
import { ReportData } from '../../internalTypes/reportData';
import Accordion from '../Accordion';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  athlete: MatchData;
}

function fetchContactInfo(id: string) {
  return pacebuddiesApi
    .get(`bridge/athlete/${id}/contactinfo`)
    .then((response) => response.data);
}

const MatchSegment = ({ athlete, ...props }: IProps) => {
  const [openModal, setOpenModal] = useState<string | undefined>();

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
      .then(
        (response) =>{
          setReport(prevState => ({...prevState, reason: '', description: ''}))
          setOpenModal(undefined)
        return toast.success('Filed report successfully')}
      )
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
        athlete.upvoted = true;
        return toast.success('Liked user successfully')})
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

        athlete.upvoted = false;
        return toast.success('Disliked user successfully');})
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 400) {
            return toast.warning(`${error.response.data.message}`);
          }
        }
        return toast.error(`Failed to dislike user: ${error.message}`);
      });
  }

  const { data, isSuccess, isLoading } = useQuery<ContactInfo>({
    queryKey: ['contactInfo', athlete.id],
    queryFn: () => fetchContactInfo(athlete.id),
  });
  const { firstname, lastname, profile, sex, country, city, upvoted } = athlete;
  return (
    <>
      <div {...props}>
        <div className="flex justify-between border-[1px] border-pb-green">
          <div className="flex ">
            <Image
              src={profile}
              height={64}
              width={64}
              alt={`${firstname + ' ' + lastname} user avatar`}
              className="h-16 w-16"
              title={`${firstname + ' ' + lastname}`}
            />
            <div className="ml-4 flex w-[calc(100%-4rem)] shrink-0 flex-col">
              <span
                className=" truncate pr-3 text-xl font-bold text-pb-green"
                title={`${firstname + ' ' + lastname}`}
              >
                {firstname} {lastname}
              </span>
              <span className="truncate pr-3 text-sm font-bold text-pb-dark-gray">
                {sex == 'F' ? 'Female' : 'Male'}, {city}, {country}
              </span>
            </div>
          </div>
          <div className="pr-4">
            {/*Report flag icon*/}
            <FlagIcon
              className="h-6 w-6 cursor-pointer text-pb-orange"
              onClick={() => setOpenModal('default')}
            />
            {/*Upvote user icon*/}
            {upvoted ? (
              <HandThumbDownIcon
                className="h-6 w-6 cursor-pointer text-red-600"
                onClick={downvoteUser}
              />
            ) : (
              <HandThumbUpIcon
                className="h-6 w-6 cursor-pointer text-pb-green"
                onClick={upvoteUser}
              />
            )}
          </div>
        </div>
        <div>
          <Accordion title={'Contact info'}>
            <div>{data?.info ?? 'test'}</div>
          </Accordion>
        </div>
      </div>

      {/*Report user modal*/}
      <Modal
        show={openModal === 'default'}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              File a report
            </h3>
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
              <Button onClick={() => fileReport(report)} type="submit">
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
