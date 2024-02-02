import { useState } from "preact/hooks";
import { Filters as Icon } from "src/client/shared/ui/icons/Filters";
import styles from "./Filters.module.css";
import { Form } from "./Form";

export function Filters() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div class={styles.container}>
      <button
        class={styles.btn}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <Icon class={styles.icon} />
      </button>
      {isModalOpen && <Form onClose={() => setModalOpen(false)} />}
    </div>
  );
}
