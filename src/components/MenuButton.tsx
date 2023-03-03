const menuButton = () => {
  return (
    <div className="fixed bottom-6 left-4 flex h-14 w-14 items-center justify-center rounded-full bg-pb-gray">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="h-10 w-10 stroke-pb-green"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
};

export default menuButton;
