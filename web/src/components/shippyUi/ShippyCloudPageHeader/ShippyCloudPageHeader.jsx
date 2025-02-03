const ShippyCloudPageHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center my-0.5 py-4 px-8 bg-gradient-to-r from-sky-500 via-blue-400 to-blue-500 text-white rounded-t-2xl">
      <div className="flex items-center space-x-2 ">
        {/* <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 01.88-7.87 6 6 0 1111.24 0A4 4 0 1118 15H3z"
          />
        </svg> */}

        {/* <!-- Cloud body --> */}
        {/* <!-- Legs --> */}
        {/* <!-- Eyes --> */}
        {/* <!-- Mouth --> */}
        {/* <svg
          width="150"
          height="100"
          viewBox="0 0 150 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 40c-10 0-20 10-20 20s10 20 20 20h60c10 0 20-10 20-20s-10-20-20-20h-5c-5-10-15-15-25-15s-20 5-25 15h-5z"
            fill="lightblue"
            stroke="blue"
            strokeWidth="2"
          />

          <circle cx="70" cy="85" r="3" fill="black" />
          <circle cx="90" cy="85" r="3" fill="black" />

          <circle cx="70" cy="50" r="3" fill="black" />
          <circle cx="80" cy="50" r="3" fill="black" />

          <circle cx="75" cy="58" r="1.5" fill="black" />
        </svg> */}

        {/* <!-- Cloud body -->
        <!-- Wobbly Legs -->
        <!-- Eyes -->
        <!-- Mouth --> */}

        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ShippyCloudPageHeader
