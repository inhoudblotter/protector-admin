import { Dates } from "./Dates";
import { Header } from "./Header";
import { StateUpdater, useState } from "preact/hooks";
import { IModal, Modal } from "src/client/shared/ui/Modal";
import styles from "./DatePicker.module.css";
interface IDatePicker extends IModal {
  date: string;
  setDate: StateUpdater<string>;
}

export function DatePicker({ date, setDate, onClose, ...props }: IDatePicker) {
  const [isClose, setClose] = useState(false);
  const [month, setMonth] = useState(date || new Date().toDateString());
  return (
    <Modal
      onClose={() => {
        setClose(false);
        onClose();
      }}
      contentClass={styles.container}
      setClose={isClose}
      {...props}
    >
      <Header month={month} setMonth={setMonth} />
      <Dates
        month={month}
        setDate={(v) => {
          setClose(true);
          setDate(v.toString());
        }}
      />
    </Modal>
  );
}
