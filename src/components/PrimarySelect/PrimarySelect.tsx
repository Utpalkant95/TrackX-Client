import { Dispatch, SetStateAction } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IPrimarySelect {
  label: string;
  placeholder: string;
  data: string[];
  onValueChange : Dispatch<SetStateAction<string>>;
  value : string;
}

const PrimarySelect = ({ label, placeholder, data, onValueChange,value }: IPrimarySelect) => {
  return (
    <>
      <Label htmlFor="exercise-select" className="text-white mb-2 block">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id="exercise-select"
          className="w-full sm:w-[180px] bg-[#2A2A2A] text-white"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#2A2A2A] text-white">
          {data.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default PrimarySelect;