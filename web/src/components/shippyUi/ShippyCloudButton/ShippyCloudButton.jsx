const ShippyCloudButton = ({ onClick, text }) => {
  return (
    <button
      className="rw-button bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ShippyCloudButton
