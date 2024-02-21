import { IModal, Modal } from "src/client/shared/ui/Modal";
import styles from "./DeleteConfirm.module.css";
import { Button } from "src/client/shared/ui/Button";
import { cn } from "src/client/shared/utils/cn";
import { useState } from "preact/hooks";
interface IDeleteConfirm extends IModal {
  onSubmit: () => void;
}

export function DeleteConfirm({
  onSubmit,
  onClose,
  contentClass,
  ...props
}: IDeleteConfirm) {
  const [isSubmit, setSubmit] = useState(false);
  return (
    <Modal
      onClose={() => {
        if (isSubmit) onSubmit();
        onClose();
      }}
      setClose={isSubmit}
      contentClass={cn(contentClass, styles.content)}
      {...props}
    >
      <span class={styles.title}>Вы уверены?</span>
      <Button onClick={() => setSubmit(true)}>Удалить</Button>
    </Modal>
  );
}
