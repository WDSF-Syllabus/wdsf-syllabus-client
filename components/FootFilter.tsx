import { FC } from "react";

interface Props {
  value: "Left" | "Right" | null;
  onChange: (value: "Left" | "Right" | null) => void;
}

export const FootFilter: FC<Props> = ({ value, onChange }) => (
  <div className="btn-group">
    <button
      className={`btn btn-outline ${value === "Left" ? "btn-active" : ""}`}
      onClick={() => onChange(value === "Left" ? null : "Left")}
    >
      LEFT
    </button>
    <button
      className={`btn btn-outline ${value === "Right" ? "btn-active" : ""}`}
      onClick={() => onChange(value === "Right" ? null : "Right")}
    >
      RIGHT
    </button>
  </div>
);
