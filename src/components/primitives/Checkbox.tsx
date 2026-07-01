import { MdCheck } from "react-icons/md";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox = ({ id, label, checked, onChange, disabled }: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={[
        "flex select-none items-center gap-2.5",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      ].join(" ")}
    >
      {/* Hidden native checkbox for accessibility */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />

      {/* Visual checkbox */}
      <div
        aria-hidden="true"
        className={[
          "flex size-4 shrink-0 items-center justify-center rounded border transition-colors duration-150",
          checked
            ? "border-blue-600 bg-blue-600"
            : "border-gray-300 bg-white",
        ].join(" ")}
      >
        {checked && <MdCheck className="size-3 text-white" />}
      </div>

      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
};

export default Checkbox;