import { h } from "preact";
import { Field } from "../ui/Field";
import styles from "./ClientFields.module.css";
interface IClientFields extends h.JSX.HTMLAttributes<HTMLFieldSetElement> {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  carNumber: string;
  setCarNumber: (v: string) => void;
}

export function ClientFields({
  name,
  setName,
  phone,
  setPhone,
  carNumber,
  setCarNumber,
}: IClientFields) {
  return (
    <fieldset class={styles.container}>
      <Field
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        label="Имя"
        maxLength={102}
      />
      <Field
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
        label="Телефон"
        maxLength={15}
      />
      <Field
        value={carNumber}
        onChange={(e) => setCarNumber(e.currentTarget.value)}
        label="Номер машины"
        maxLength={6}
      />
    </fieldset>
  );
}
