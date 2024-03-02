import { h } from "preact";
import { useState, useMemo, useCallback } from "preact/hooks";
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
  const [letsSearch, setLetsSearch] = useState(false);

  const handleSearch = useCallback(() => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (!["name", "phone", "services", "carNumber"].includes(k))
        query.set(k, v);
    });
    if (username.trim()) query.set("name", username.trim());
    if (phone.trim()) query.set("phone", cleanPhone(phone.trim()));
    if (services.length) query.set("services", services.join(","));
    if (carNumber.trim()) query.set("carNumber", carNumber.trim());
    console.log(query);
    route(`/orders?${query}`);
  }, [username, phone, services, params, route, carNumber]);

  const onModalClose = useCallback(() => {
    onClose();
    setModalClose(false);
    if (letsSearch) handleSearch();
  }, [onClose, setModalClose, handleSearch, letsSearch]);

  const onSubmit = useCallback(
    (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
      e.preventDefault();
      setLetsSearch(true);
      setModalClose(true);
    },
    [setLetsSearch, setModalClose]
  );
  return (
    <Modal
      onClose={onModalClose}
      setClose={isModalClose}
      class={styles.modal}
      contentClass={styles.container}
    >
      <form class={styles.form} onSubmit={onSubmit}>
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
        <ServicesPicker
          selectedItems={services}
          setSelectedItems={setServices}
        />
        <Button>Найти</Button>
      </form>
    </Modal>
  );
}
