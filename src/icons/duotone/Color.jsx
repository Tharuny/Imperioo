import createSvgIcon from "@mui/material/utils/createSvgIcon";

const ColorPicker = createSvgIcon(
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path
      d="M12.5 6.5l-6 6c-0.5 0.5-1.5 0.5-2 0l-2-2c-0.5-0.5-0.5-1.5 0-2l6-6 4 4zM13.5 5.5l-4-4 1.5-1.5c0.5-0.5 1.5-0.5 2 0l2 2c0.5 0.5 0.5 1.5 0 2l-1.5 1.5z"
      className="secondary"
    />
    <path d="M16 12c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.5 0.8-2.8 2-3.4l4.7-4.7 1.4 1.4-4.7 4.7c0.4 0.4 0.6 0.9 0.6 1.5 0 1.1-0.9 2-2 2s-2-0.9-2-2c0-0.6 0.2-1.1 0.6-1.5l-5.3-5.3 1.4-1.4 5.3 5.3c0.6-0.3 1.3-0.5 2-0.5 2.2 0 4 1.8 4 4z" />
  </svg>,
  "ColorPicker"
);

export default ColorPicker;