// import { Modal } from "flowbite-react";
import { useState } from 'react';
import RecommendationsModalContent from './RecommendationsModalContent';

interface IProps {
  opened: boolean;
}

interface RecommendationData {
  name: string;
  surname: string;
  age: number;
}

const data1: RecommendationData[] = [
  {
    name: 'John',
    surname: 'Doe',
    age: 30,
  },
  {
    name: 'Jane',
    surname: 'Doe',
    age: 38,
  },
  {
    name: 'Jane',
    surname: 'Marks',
    age: 29,
  },
];

const RecommendationsModal = (props: IProps) => {
  const [showModal, setShowModal] = useState(props.opened);
  const [recommendationNumber, setRecommendationNumber] = useState(0);
  return (
    <>
      <button
        className="mr-1 mb-1 rounded bg-pink-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open large modal
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto h-auto max-h-[80rem] w-auto max-w-7xl">
              {/*content*/}
              <div className="flex w-full flex-row rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                {/*<div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">*/}
                {/*  <h3 className="text-3xl font-semibold">Modal Title</h3>*/}
                {/*  <button*/}
                {/*    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"*/}
                {/*    onClick={() => setShowModal(false)}*/}
                {/*  >*/}
                {/*    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">*/}
                {/*      ×*/}
                {/*    </span>*/}
                {/*  </button>*/}
                {/*</div>*/}
                {/*body*/}
                <button className="rounded-full bg-pb-gray">P</button>
                <div className="relative h-16 flex-auto bg-blue-500 p-6 md:h-64 md:w-128 lg:h-96 lg:w-192 xl:h-128 xl:w-256">
                  <RecommendationsModalContent />
                </div>
                <button>R</button>
                {/*footer*/}
                {/*<div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">*/}
                {/*  <button*/}
                {/*    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"*/}
                {/*    type="button"*/}
                {/*    onClick={() => setShowModal(false)}*/}
                {/*  >*/}
                {/*    Close*/}
                {/*  </button>*/}
                {/*  <button*/}
                {/*    className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"*/}
                {/*    type="button"*/}
                {/*    onClick={() => setShowModal(false)}*/}
                {/*  >*/}
                {/*    Save Changes*/}
                {/*  </button>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};
export default RecommendationsModal;
