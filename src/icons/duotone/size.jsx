import createSvgIcon from "@mui/material/utils/createSvgIcon";

const SizesIcon = createSvgIcon(
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h6v6H3zM3 15h6v6H3zM15 3h6v6h-6zM15 15h6v6h-6z" />
    <path d="M9 9h6v6H9z" className="secondary" />
  </svg>,
  "SizesIcon"
);

export default SizesIcon;
