export const LeftArrow = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 4L7.5 12L16.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const SmallLeftArrow = () => {
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 4L7.5 12L16.5 20"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const DoubleLeftArrow = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 4L10.5 12L16.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 4L1.5 12L7.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const RightArrow = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 4L16.5 12L7.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const SmallRightArrow = () => {
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 4L16.5 12L7.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const RightArrowInSolidCicle = () => {
  return (
    <svg
      fill="#ffffff"
      height="20px"
      width="20px"
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M21.7,16.7l-4,4C17.5,20.9,17.3,21,17,21s-0.5-0.1-0.7-0.3 c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H10c-0.6,0-1-0.4-1-1s0.4-1,1-1h8.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4 c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.2,0.1,0.5,0,0.8C21.9,16.5,21.8,16.6,21.7,16.7z"></path>{' '}
      </g>
    </svg>
  )
}

export const DoubleRightArrow = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 4L16.5 12L10.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 4L8.5 12L3.5 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const CheckedCheckbox = () => {
  return (
    <input
      type="checkbox"
      className={`inline-flex px-2 mx-1 `}
      checked={true}
      disabled={true}
    />
  )
}

export const UnCheckedCheckbox = () => {
  return (
    <input
      type="checkbox"
      className={`inline-flex px-2 mx-1 `}
      checked={false}
      disabled={true}
    />
  )
}

export const Barcode = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      height="32px"
      width="32px"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 60 60"
      xmlSpace="preserve"
    >
      <g>
        <path d="M5,49c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v37C4,48.553,4.448,49,5,49z" />
        <path d="M55,49c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v37C54,48.553,54.448,49,55,49z" />
        <path d="M9,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C8,40.553,8.448,41,9,41z" />
        <path d="M12,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C11,40.553,11.448,41,12,41z" />
        <path d="M17,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C16,40.553,16.448,41,17,41z" />
        <path d="M20,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C19,40.553,19.448,41,20,41z" />
        <path d="M23,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C22,40.553,22.448,41,23,41z" />
        <path d="M29,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C28,40.553,28.448,41,29,41z" />
        <path d="M34,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C33,40.553,33.448,41,34,41z" />
        <path d="M37,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C36,40.553,36.448,41,37,41z" />
        <path d="M42,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C41,40.553,41.448,41,42,41z" />
        <path d="M45,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C44,40.553,44.448,41,45,41z" />
        <path d="M51,41c0.552,0,1-0.447,1-1V11c0-0.553-0.448-1-1-1s-1,0.447-1,1v29C50,40.553,50.448,41,51,41z" />
        <path d="M9,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C8,46.553,8.448,47,9,47z" />
        <path d="M12,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C11,46.553,11.448,47,12,47z" />
        <path d="M15,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C14,46.553,14.448,47,15,47z" />
        <path d="M17,45v1c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-0.553-0.448-1-1-1S17,44.447,17,45z" />
        <path d="M20,45v1c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-0.553-0.448-1-1-1S20,44.447,20,45z" />
        <path d="M23,45v1c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-0.553-0.448-1-1-1S23,44.447,23,45z" />
        <path d="M27,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C26,46.553,26.448,47,27,47z" />
        <path d="M29,45v1c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-0.553-0.448-1-1-1S29,44.447,29,45z" />
        <path d="M33,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C32,46.553,32.448,47,33,47z" />
        <path d="M35,46c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1V46z" />
        <path d="M38,46c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1V46z" />
        <path d="M42,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C41,46.553,41.448,47,42,47z" />
        <path d="M45,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C44,46.553,44.448,47,45,47z" />
        <path d="M48,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C47,46.553,47.448,47,48,47z" />
        <path d="M51,47c0.552,0,1-0.447,1-1v-1c0-0.553-0.448-1-1-1s-1,0.447-1,1v1C50,46.553,50.448,47,51,47z" />
        <path d="M0,5v50h60V5H0z M58,53H2V7h56V53z" />
      </g>
    </svg>
  )
}

export const UpChevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

export const DownChevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export const Sun = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2" />
      <path d="M12 21v2" />
      <path d="M4.22 4.22l1.42 1.42" />
      <path d="M18.36 18.36l1.42 1.42" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
      <path d="M4.22 19.78l1.42-1.42" />
      <path d="M18.36 5.64l1.42-1.42" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

export const Moon = () => {
  return (
    <svg
      width="24"
      height="24"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Dash = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path d="M19,11H5a1,1,0,0,0,0,2h14a1,1,0,0,0,0-2Z" fill="black" />
    </svg>
  )
}

export const DashWhite = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path d="M19,11H5a1,1,0,0,0,0,2h14a1,1,0,0,0,0-2Z" fill="white" />
    </svg>
  )
}

export const BlackPlus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
        fill="black"
      />
    </svg>
  )
}

export const WhitePlus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
        fill="white"
      />
    </svg>
  )
}

export const Download = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 489.701 489.701"
      xmlSpace="preserve"
      className="w-6 h-6 hover:bg-white hover:fill-black rounded-lg p-0.5"
    >
      <g>
        <g>
          <g>
            <path d="M244.9,0c-9.5,0-17.1,7.7-17.1,17.2v312.3l-77.6-77.6c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l106.9,106.9     c3.2,3.2,7.6,5,12.1,5c4.6,0,8.9-1.8,12.1-5l106.9-107c6.7-6.7,6.7-17.6,0-24.3s-17.6-6.7-24.3,0L262,329.4V17.2     C262.1,7.7,254.4,0,244.9,0z" />
            <path d="M455.8,472.6c0-9.5-7.7-17.2-17.2-17.2H51.1c-9.5,0-17.2,7.7-17.2,17.2s7.7,17.1,17.2,17.1h387.6     C448.201,489.8,455.8,482.1,455.8,472.6z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export const EyeClosed = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      width={'24'}
      fill="white"
      height={'24'}
      viewBox="0 0 512 512"
    >
      <title>hide customizations</title>
      <path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z" />
    </svg>
  )
}

export const EyeOpen = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      width={'24'}
      fill="white"
      height={'24'}
      viewBox="0 0 512 512"
    >
      <title>show customizations</title>
      <path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z" />
    </svg>
  )
}

export const GreenCheck = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        fill="#c8e6c9"
        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
      ></path>
      <path
        fill="#4caf50"
        d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
      ></path>
    </svg>
  )
}

export const Copy = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z"
          fill="#080341"
        ></path>
      </g>
    </svg>
  )
}

export const TrashCan = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFFFFF"
      viewBox="0 0 26 26"
      width="22px"
      height="22px"
    >
      <path d="M 11.5 -0.03125 C 9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625 L 7.96875 4 L 4 4 C 3.449219 4 3 4.449219 3 5 L 3 6 L 2 6 L 2 8 L 4 8 L 4 23 C 4 24.644531 5.355469 26 7 26 L 19 26 C 20.644531 26 22 24.644531 22 23 L 22 8 L 24 8 L 24 6 L 23 6 L 23 5 C 23 4.449219 22.550781 4 22 4 L 18.03125 4 L 18.03125 3.5625 C 18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125 Z M 11.5 2.03125 L 14.5 2.03125 C 15.304688 2.03125 15.96875 2.6875 15.96875 3.5625 L 15.96875 4 L 10.03125 4 L 10.03125 3.5625 C 10.03125 2.6875 10.695313 2.03125 11.5 2.03125 Z M 6 8 L 11.125 8 C 11.25 8.011719 11.371094 8.03125 11.5 8.03125 L 14.5 8.03125 C 14.628906 8.03125 14.75 8.011719 14.875 8 L 20 8 L 20 23 C 20 23.5625 19.5625 24 19 24 L 7 24 C 6.4375 24 6 23.5625 6 23 Z M 8 10 L 8 22 L 10 22 L 10 10 Z M 12 10 L 12 22 L 14 22 L 14 10 Z M 16 10 L 16 22 L 18 22 L 18 10 Z" />
    </svg>
  )
}

export const Bell = () => {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  )
}

export const Hamburger = () => {
  return (
    <svg
      className="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export const Xsymbol = () => {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

export const Notepad = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <title>show notes</title>
      <g>
        <g>
          <g>
            <path d="M179.184,170.667h170.667c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533H179.184     c-4.71,0-8.533,3.823-8.533,8.533C170.651,166.844,174.474,170.667,179.184,170.667z" />
            <path d="M484.754,351.497l-17.067-17.067c-13.124-13.116-33.092-13.09-46.199,0L309.684,446.234     c-1.604,1.596-2.5,3.772-2.5,6.033v51.2c0,4.71,3.814,8.533,8.533,8.533h51.2c2.27,0,4.437-0.896,6.033-2.5l111.804-111.804     C498.348,384.102,498.348,365.099,484.754,351.497z M410.454,369.596l13.534,13.534l-74.138,74.138l-13.534-13.534     L410.454,369.596z M324.251,494.933v-39.134l39.134,39.134H324.251z M375.451,482.867l-13.534-13.534l74.138-74.138     l13.525,13.534L375.451,482.867z M472.688,385.63l-11.034,11.034l-39.134-39.134l11.034-11.034c6.758-6.75,15.292-6.767,22.067,0     l17.067,17.067C479.591,370.475,479.591,378.726,472.688,385.63z" />
            <path d="M315.717,51.2h17.067c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-17.067     c-4.719,0-8.533,3.823-8.533,8.533C307.184,47.377,310.998,51.2,315.717,51.2z" />
            <path d="M366.917,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.159-20.489-17.067-24.03V8.533c0-4.71-3.814-8.533-8.533-8.533     s-8.533,3.823-8.533,8.533V52.77c-9.907,3.541-17.067,12.919-17.067,24.03C341.317,90.914,352.803,102.4,366.917,102.4z      M366.917,68.267c4.71,0,8.533,3.831,8.533,8.533c0,4.702-3.823,8.533-8.533,8.533s-8.533-3.831-8.533-8.533     C358.384,72.098,362.207,68.267,366.917,68.267z" />
            <path d="M179.184,221.867h153.6c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-153.6     c-4.71,0-8.533,3.823-8.533,8.533C170.651,218.044,174.474,221.867,179.184,221.867z" />
            <path d="M401.051,51.2h17.067c12.442,0,25.6,13.158,25.6,25.6v221.158c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533     V76.8c0-21.931-20.736-42.667-42.667-42.667h-17.067c-4.719,0-8.533,3.823-8.533,8.533C392.517,47.377,396.332,51.2,401.051,51.2     z" />
            <path d="M281.584,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.159-20.489-17.067-24.03V8.533c0-4.71-3.814-8.533-8.533-8.533     c-4.719,0-8.533,3.823-8.533,8.533V52.77c-9.907,3.541-17.067,12.919-17.067,24.03C255.984,90.914,267.47,102.4,281.584,102.4z      M281.584,68.267c4.71,0,8.533,3.831,8.533,8.533c0,4.702-3.823,8.533-8.533,8.533s-8.533-3.831-8.533-8.533     C273.051,72.098,276.874,68.267,281.584,68.267z" />
            <path d="M375.451,264.533c0-4.71-3.814-8.533-8.533-8.533H179.184c-4.71,0-8.533,3.823-8.533,8.533     c0,4.71,3.823,8.533,8.533,8.533h187.733C371.636,273.067,375.451,269.244,375.451,264.533z" />
            <path d="M179.184,307.2c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h170.667c4.719,0,8.533-3.823,8.533-8.533     s-3.814-8.533-8.533-8.533H179.184z" />
            <path d="M281.584,443.733c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533H34.117V76.8c0-12.442,13.158-25.6,25.6-25.6     h17.067c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533H59.717c-21.931,0-42.667,20.736-42.667,42.667v392.533     c0,21.931,20.736,42.667,42.667,42.667h221.867c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533H59.717     c-9.574,0-19.507-7.808-23.612-17.067h245.478c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533H34.117v-17.067H281.584     z" />
            <path d="M127.984,204.8h-17.067c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.71,0,8.533-3.823,8.533-8.533C136.517,208.623,132.694,204.8,127.984,204.8z" />
            <path d="M127.984,358.4h-17.067c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h17.067c4.71,0,8.533-3.823,8.533-8.533     S132.694,358.4,127.984,358.4z" />
            <path d="M230.384,51.2h17.067c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-17.067     c-4.71,0-8.533,3.823-8.533,8.533C221.851,47.377,225.674,51.2,230.384,51.2z" />
            <path d="M298.651,358.4H179.184c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h119.467     c4.719,0,8.533-3.823,8.533-8.533S303.37,358.4,298.651,358.4z" />
            <path d="M127.984,153.6h-17.067c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.71,0,8.533-3.823,8.533-8.533C136.517,157.423,132.694,153.6,127.984,153.6z" />
            <path d="M127.984,256h-17.067c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.71,0,8.533-3.823,8.533-8.533C136.517,259.823,132.694,256,127.984,256z" />
            <path d="M145.051,51.2h17.067c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533h-17.067     c-4.71,0-8.533,3.823-8.533,8.533C136.517,47.377,140.34,51.2,145.051,51.2z" />
            <path d="M127.984,307.2h-17.067c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h17.067c4.71,0,8.533-3.823,8.533-8.533     S132.694,307.2,127.984,307.2z" />
            <path d="M196.251,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.151-20.489-17.067-24.03V8.533c0-4.71-3.823-8.533-8.533-8.533     s-8.533,3.823-8.533,8.533V52.77c-9.916,3.541-17.067,12.919-17.067,24.03C170.651,90.914,182.137,102.4,196.251,102.4z      M196.251,68.267c4.702,0,8.533,3.831,8.533,8.533c0,4.702-3.831,8.533-8.533,8.533c-4.702,0-8.533-3.831-8.533-8.533     C187.717,72.098,191.549,68.267,196.251,68.267z" />
            <path d="M110.917,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.151-20.489-17.067-24.03V8.533c0-4.71-3.823-8.533-8.533-8.533     c-4.71,0-8.533,3.823-8.533,8.533V52.77C92.468,56.311,85.317,65.69,85.317,76.8C85.317,90.914,96.803,102.4,110.917,102.4z      M110.917,68.267c4.702,0,8.533,3.831,8.533,8.533c0,4.702-3.831,8.533-8.533,8.533c-4.702,0-8.533-3.831-8.533-8.533     C102.384,72.098,106.215,68.267,110.917,68.267z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export const NotepadBlack = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <title>show notes</title>
      <g>
        <g>
          <g>
            <path d="M179.184,170.667h170.667c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533H179.184     c-4.71,0-8.533,3.823-8.533,8.533C170.651,166.844,174.474,170.667,179.184,170.667z" />
            <path d="M484.754,351.497l-17.067-17.067c-13.124-13.116-33.092-13.09-46.199,0L309.684,446.234     c-1.604,1.596-2.5,3.772-2.5,6.033v51.2c0,4.71,3.814,8.533,8.533,8.533h51.2c2.27,0,4.437-0.896,6.033-2.5l111.804-111.804     C498.348,384.102,498.348,365.099,484.754,351.497z M410.454,369.596l13.534,13.534l-74.138,74.138l-13.534-13.534     L410.454,369.596z M324.251,494.933v-39.134l39.134,39.134H324.251z M375.451,482.867l-13.534-13.534l74.138-74.138     l13.525,13.534L375.451,482.867z M472.688,385.63l-11.034,11.034l-39.134-39.134l11.034-11.034c6.758-6.75,15.292-6.767,22.067,0     l17.067,17.067C479.591,370.475,479.591,378.726,472.688,385.63z" />
            <path d="M315.717,51.2h17.067c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-17.067     c-4.719,0-8.533,3.823-8.533,8.533C307.184,47.377,310.998,51.2,315.717,51.2z" />
            <path d="M366.917,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.159-20.489-17.067-24.03V8.533c0-4.71-3.814-8.533-8.533-8.533     s-8.533,3.823-8.533,8.533V52.77c-9.907,3.541-17.067,12.919-17.067,24.03C341.317,90.914,352.803,102.4,366.917,102.4z      M366.917,68.267c4.71,0,8.533,3.831,8.533,8.533c0,4.702-3.823,8.533-8.533,8.533s-8.533-3.831-8.533-8.533     C358.384,72.098,362.207,68.267,366.917,68.267z" />
            <path d="M179.184,221.867h153.6c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-153.6     c-4.71,0-8.533,3.823-8.533,8.533C170.651,218.044,174.474,221.867,179.184,221.867z" />
            <path d="M401.051,51.2h17.067c12.442,0,25.6,13.158,25.6,25.6v221.158c0,4.71,3.814,8.533,8.533,8.533s8.533-3.823,8.533-8.533     V76.8c0-21.931-20.736-42.667-42.667-42.667h-17.067c-4.719,0-8.533,3.823-8.533,8.533C392.517,47.377,396.332,51.2,401.051,51.2     z" />
            <path d="M281.584,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.159-20.489-17.067-24.03V8.533c0-4.71-3.814-8.533-8.533-8.533     c-4.719,0-8.533,3.823-8.533,8.533V52.77c-9.907,3.541-17.067,12.919-17.067,24.03C255.984,90.914,267.47,102.4,281.584,102.4z      M281.584,68.267c4.71,0,8.533,3.831,8.533,8.533c0,4.702-3.823,8.533-8.533,8.533s-8.533-3.831-8.533-8.533     C273.051,72.098,276.874,68.267,281.584,68.267z" />
            <path d="M375.451,264.533c0-4.71-3.814-8.533-8.533-8.533H179.184c-4.71,0-8.533,3.823-8.533,8.533     c0,4.71,3.823,8.533,8.533,8.533h187.733C371.636,273.067,375.451,269.244,375.451,264.533z" />
            <path d="M179.184,307.2c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h170.667c4.719,0,8.533-3.823,8.533-8.533     s-3.814-8.533-8.533-8.533H179.184z" />
            <path d="M281.584,443.733c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533H34.117V76.8c0-12.442,13.158-25.6,25.6-25.6     h17.067c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533H59.717c-21.931,0-42.667,20.736-42.667,42.667v392.533     c0,21.931,20.736,42.667,42.667,42.667h221.867c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533H59.717     c-9.574,0-19.507-7.808-23.612-17.067h245.478c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533H34.117v-17.067H281.584     z" />
            <path d="M127.984,204.8h-17.067c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.71,0,8.533-3.823,8.533-8.533C136.517,208.623,132.694,204.8,127.984,204.8z" />
            <path d="M127.984,358.4h-17.067c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h17.067c4.71,0,8.533-3.823,8.533-8.533     S132.694,358.4,127.984,358.4z" />
            <path d="M230.384,51.2h17.067c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533h-17.067     c-4.71,0-8.533,3.823-8.533,8.533C221.851,47.377,225.674,51.2,230.384,51.2z" />
            <path d="M298.651,358.4H179.184c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h119.467     c4.719,0,8.533-3.823,8.533-8.533S303.37,358.4,298.651,358.4z" />
            <path d="M127.984,153.6h-17.067c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.71,0,8.533-3.823,8.533-8.533C136.517,157.423,132.694,153.6,127.984,153.6z" />
            <path d="M127.984,256h-17.067c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.71,0,8.533-3.823,8.533-8.533C136.517,259.823,132.694,256,127.984,256z" />
            <path d="M145.051,51.2h17.067c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533h-17.067     c-4.71,0-8.533,3.823-8.533,8.533C136.517,47.377,140.34,51.2,145.051,51.2z" />
            <path d="M127.984,307.2h-17.067c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h17.067c4.71,0,8.533-3.823,8.533-8.533     S132.694,307.2,127.984,307.2z" />
            <path d="M196.251,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.151-20.489-17.067-24.03V8.533c0-4.71-3.823-8.533-8.533-8.533     s-8.533,3.823-8.533,8.533V52.77c-9.916,3.541-17.067,12.919-17.067,24.03C170.651,90.914,182.137,102.4,196.251,102.4z      M196.251,68.267c4.702,0,8.533,3.831,8.533,8.533c0,4.702-3.831,8.533-8.533,8.533c-4.702,0-8.533-3.831-8.533-8.533     C187.717,72.098,191.549,68.267,196.251,68.267z" />
            <path d="M110.917,102.4c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.151-20.489-17.067-24.03V8.533c0-4.71-3.823-8.533-8.533-8.533     c-4.71,0-8.533,3.823-8.533,8.533V52.77C92.468,56.311,85.317,65.69,85.317,76.8C85.317,90.914,96.803,102.4,110.917,102.4z      M110.917,68.267c4.702,0,8.533,3.831,8.533,8.533c0,4.702-3.831,8.533-8.533,8.533c-4.702,0-8.533-3.831-8.533-8.533     C102.384,72.098,106.215,68.267,110.917,68.267z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export const PrinterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
    >
      <g id="Printer">
        <path d="M57.7881012,14.03125H52.5v-8.0625c0-2.2091999-1.7909012-4-4-4h-33c-2.2091999,0-4,1.7908001-4,4v8.0625H6.2119002   C2.7871001,14.03125,0,16.8183498,0,20.2431507V46.513649c0,3.4248009,2.7871001,6.2119026,6.2119002,6.2119026h2.3798995   c0.5527,0,1-0.4472008,1-1c0-0.5527-0.4473-1-1-1H6.2119002C3.8896,50.7255516,2,48.8359489,2,46.513649V20.2431507   c0-2.3223,1.8896-4.2119007,4.2119002-4.2119007h51.5762024C60.1102982,16.03125,62,17.9208508,62,20.2431507V46.513649   c0,2.3223-1.8897018,4.2119026-4.2118988,4.2119026H56c-0.5527992,0-1,0.4473-1,1c0,0.5527992,0.4472008,1,1,1h1.7881012   C61.2128983,52.7255516,64,49.9384499,64,46.513649V20.2431507C64,16.8183498,61.2128983,14.03125,57.7881012,14.03125z    M13.5,5.96875c0-1.1027999,0.8971996-2,2-2h33c1.1027985,0,2,0.8972001,2,2v8h-37V5.96875z" />
        <path d="M44,45.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,47.0302505,20,47.0302505h24   c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,45.0322495,44,45.0322495z" />
        <path d="M44,52.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,54.0302505,20,54.0302505h24   c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,52.0322495,44,52.0322495z" />
        <circle cx="7.9590998" cy="21.8405495" r="2" />
        <circle cx="14.2856998" cy="21.8405495" r="2" />
        <circle cx="20.6121998" cy="21.8405495" r="2" />
        <path d="M11,62.03125h42v-26H11V62.03125z M13.4036999,38.4349518h37.1925964v21.1925964H13.4036999V38.4349518z" />
      </g>
    </svg>
  )
}

export const MagnifyingGlass = () => {
  return (
    <svg
      fill="#ffffff"
      height="16px"
      width="16px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 490.4 490.4"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
		s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
		 M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"
        />
      </g>
    </svg>
  )
}

export const Refresh = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      height="16px"
      width="16px"
      viewBox="0 0 24 24"
    >
      <g data-name="Layer 2">
        <g data-name="refresh">
          <rect width="24" height="24" opacity="0" />
          <path d="M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19 7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7 7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83 1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.34 1.34 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.21 9.21 0 0 0 12.18 3 9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25z" />
        </g>
      </g>
    </svg>
  )
}
