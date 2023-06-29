import * as React from 'react';

function IconMoreButton(props) {
  return (
    <svg
      fill="#ffffff"
      viewBox="0 0 24 24"
      height="1.8em"
      width="1.8em"
      {...props}
    >
      <path
        fill="#ffffff"
        d="M14 6a2 2 0 11-4 0 2 2 0 014 0zM14 12a2 2 0 11-4 0 2 2 0 014 0zM14 18a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

export default IconMoreButton;
