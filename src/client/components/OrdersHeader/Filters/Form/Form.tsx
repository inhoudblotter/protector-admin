import { h } from "preact";
import { useState, useMemo } from "preact/hooks";
import { Modal } from "src/client/shared/ui/Modal";
import { Input } from "src/client/shared/ui/Input";
import { useRouter } from "preact-router";
import { parseQuery } from "src/client/shared/utils/parseQuery";
import { Button } from "src/client/shared/ui/Button";
import { cleanPhone } from "src/client/shared/utils/cleanPhone";
import { ServicesPicker } from "./ServicesPicker";
import styles from "./Form.module.css";

interface IForm extends h.JSX.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export function Form({ onClose }: IForm) {
  const [isModalClose, setModalClose] = useState(false);
  const [args, route] = useRouter();
  const params = useMemo(() => parseQuery(args.url), [args.url]);
  const [username, setUsername] = useState(params.name || "");
  const [phone, setPhone] = useState(params.phone || "");
  const [services, setServices] = useState(params.services?.split(",") || []);
  const [carNumber, setCarNumber] = useState(params.carNumber || "");
  function handleSearch() {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (!["name", "phone", "services", "carNumber"].includes(k))
        query.set(k, v);
    });
    if (username) query.set("name", username);
    if (phone) query.set("phone", cleanPhone(phone));
    if (services.length) query.set("services", services.join(","));
    route(`${args.path}?${query}`);
    setModalClose(true);
  }
  return (
    <Modal
      onClose={() => {
        onClose();
        setModalClose(false);
      }}
      setClose={isModalClose}
      class={styles.modal}
      contentClass={styles.container}
    >
      <Input
        placeholder={"Имя"}
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Input
        placeholder={"Телефон"}
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
      />
      <Input
        placeholder={"Номер авто"}
        value={carNumber}
        onChange={(e) => setCarNumber(e.currentTarget.value)}
      />
      <ServicesPicker selectedItems={services} setSelectedItems={setServices} />
      <Button onClick={handleSearch}>Найти</Button>
    </Modal>
  );
}
