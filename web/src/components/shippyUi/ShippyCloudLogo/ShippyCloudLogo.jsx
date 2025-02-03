const ShippyCloudLogo = ({ heightWidthInt = 100, heightWidthString }) => {
  const floatingCloudStyle = `
    .floating-cloud {
      animation: float 6s ease-in-out infinite;
      display: inline-block;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(10%);
      }
    }
  `

  const heightAsString = heightWidthInt.toString()
  const widthAsString = (heightWidthInt * 1.5).toString()

  const hWStr = heightWidthString + ' inline-flex '

  return (
    <div className={`${hWStr}`}>
      <div className="floating-cloud">
        <svg
          width={'90'}
          height={'60'}
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

          <path
            d="M70 80q2 5 4 0q2 -5 4 0"
            stroke="black"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M90 80q2 5 4 0q2 -5 4 0"
            stroke="black"
            strokeWidth="1.5"
            fill="none"
          />

          <circle cx="70" cy="50" r="3" fill="black" />
          <circle cx="80" cy="50" r="3" fill="black" />

          <circle cx="75" cy="58" r="1.5" fill="black" />
        </svg>
      </div>
      <style>{floatingCloudStyle}</style>
    </div>
  )
}

export default ShippyCloudLogo
