// import { Modal } from "flowbite-react";
import { useState } from 'react';

interface IProps {
  opened: boolean;
}

const RecommendationsModal = (props: IProps) => {
  const [showModal, setShowModal] = useState(props.opened);
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
            <div className="relative my-6 mx-auto w-auto h-auto max-w-7xl max-h-[80rem]">
              {/*content*/}
              <div className="flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
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
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-lg leading-relaxed text-slate-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean ut mi vestibulum, ornare arcu aliquet, posuere mauris.
                    Sed quis justo orci. Quisque id lorem eget sapien pretium suscipit et vel elit.
                  </p>
                </div>
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