import { Nav } from "src/client/components/Nav";
import { OrdersHeader } from "src/client/components/OrdersHeader";
import { OrdersList } from "src/client/components/OrdersList";
import styles from "./Orders.module.css";

export default function Orders() {
  return (
    <>
      <Nav />
      <main class={styles.main}>
        <OrdersHeader />
        <OrdersList />
      </main>
    </>
  );
}
