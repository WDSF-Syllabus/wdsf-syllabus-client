import { FC } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const FigureSearch: FC<Props> = ({ value, onChange }) => (
  <form className="flex items-center justify-center gap-4">
    <label htmlFor="figure-search">Search...</label>
    <input
      name="figure-search"
      type="text"
      role="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </form>
);
