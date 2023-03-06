// import { Modal } from "flowbite-react";
import ReactModal from 'react-modal';

interface IProps {
  opened: boolean;
}

const RecommendationsModal = (props: IProps) => {
  return (
    <>
      <ReactModal isOpen={props.opened}>Test modal</ReactModal>
    </>
  );
};
export default RecommendationsModal;
