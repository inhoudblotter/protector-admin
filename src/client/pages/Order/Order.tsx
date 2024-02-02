import { useEffect, useMemo, useState } from "preact/hooks";
import { Nav } from "src/client/components/Nav";
import { OrderForm } from "src/client/components/OrderForm";
import { IOrder } from "src/client/shared/types/IOrder";
import { useRouter } from "preact-router";
import { getOrder } from "src/client/api/order/getOrder";
import { Loader } from "src/client/shared/ui/Loader";
import styles from "./Order.module.css";
interface IOrderPage {
  preloadState?: { order: IOrder };
}

export function Order({ preloadState }: IOrderPage) {
  const [args, route] = useRouter();

  const id = useMemo(() => {
    if (args.path === "/orders/:id") {
      const url = args.url.split("/");
      const id = Number(url[url.length - 1]);
      if (isNaN(id)) route("/not-found", true);
      return id;
    }
  }, [args.path, args.url]);
  const [order, setOrder] = useState(preloadState?.order || undefined);
  const [isLoading, setLoading] = useState(id && !order ? true : false);

  useEffect(() => {
    if (!order && id) {
      setLoading(true);
      getOrder(id)
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.code === 404) route("/not-found", true);
          if (error.code === 500) route("/server-error", true);
        });
    }
  }, [order, id, setLoading]);

  return (
    <>
      <Nav />
      <main>
        {isLoading ? (
          <div class={styles.loaderContainer}>
            <Loader class={styles.loader} />
          </div>
        ) : (
          <OrderForm preloadState={order} type={id ? "update" : "new"} />
        )}
      </main>
    </>
  );
}
