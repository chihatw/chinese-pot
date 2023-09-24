import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Control, FieldValue, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  value,
  type,
}: {
  control: Control<T>;
  name: FieldValue<T>;
  label: ReactNode;
  value: string;
  type: HTMLInputTypeAttribute;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative h-9">
            <FormControl className="peer absolute">
              <Input {...field} type={type} />
            </FormControl>
            <FormLabel
              className={`absolute ${
                value
                  ? "-top-5 left-1 text-xs"
                  : "left-3 top-1.5 text-base peer-hover:left-2 peer-hover:top-1"
              }  duration-300 peer-focus:-top-5 peer-focus:left-1 peer-focus:text-xs`}
            >
              {label}
            </FormLabel>
          </div>
          <FormMessage className="absolute" />
        </FormItem>
      )}
    />
  );
};

export default TextField;
