import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from "preact/hooks";
import styles from "./OrdersList.module.css";
import { h } from "preact";
import { Loader } from "src/client/shared/ui/Loader";
import { Pagination } from "src/client/shared/ui/Pagination";
import { getOrders } from "src/client/api/orders/getOrders";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { Item } from "./Item";
import { IOrderResponse } from "src/client/shared/types/IOrderResponse";
import { useRouter } from "preact-router";
import { parseQuery } from "src/client/shared/utils/parseQuery";
import { DoneItem } from "./DoneItem";
import { AlertContext } from "src/client/shared/model/alertContext";

interface IOrdersList extends h.JSX.HTMLAttributes<HTMLElement> {}

export function OrdersList({}: IOrdersList) {
  const { setAction } = useContext(AlertContext);
  const [orders, setOrders] = useState<IOrderResponse[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [routerArgs] = useRouter();
  const [isOld, params] = useMemo(() => {
    const params = parseQuery(routerArgs.url);
    let isOld = false;
    if (routerArgs.path) {
      const path = routerArgs.path.split("/");
      isOld = path[path.length - 1] === "old" ? true : false;
    }
    return [isOld, params];
  }, [routerArgs.url]);
  const itemsRef = useRef<HTMLUListElement>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, limit, currentPage] = useMemo(() => {
    const offset = Number(params.offset) || 0;
    const limit = Number(params.limit) || 15;
    const currentPage = offset / limit + 1;
    return [offset, limit, currentPage];
  }, [params.offset, params.limit]);

  const refreshItems = useCallback(() => {
    const query = new URLSearchParams();
    if (params.name) query.set("name", params.name);
    if (params.phone) query.set("phone", params.phone);
    if (params.services) query.set("services", params.services);
    if (params.carNumber) query.set("carNumber", params.carNumber);
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortDirection) query.set("sortDirection", params.sortDirection);
    query.set("limit", limit.toString());
    query.set("offset", offset.toString());
    getOrders(query, isOld)
      .then((res) => {
        setOrders(res.data);
        setTotalCount(res.totalCount);
      })
      .catch((error) => {
        if (isError(error) || error instanceof Error) {
          setAction({
            type: "add",
            payload: { type: "error", message: error.message },
          });
        } else throw error;
      })
      .finally(() => setLoading(false));
  }, [
    params.name,
    params.phone,
    params.services,
    params.carNumber,
    params.sortBy,
    params.sortDirection,
    limit,
    offset,
    setLoading,
    setOrders,
    setTotalCount,
  ]);

  useEffect(() => {
    setLoading(true);
    refreshItems();
  }, [
    params.name,
    params.phone,
    params.services,
    params.carNumber,
    params.sortBy,
    params.sortDirection,
    limit,
    offset,
  ]);
  return (
    <>
      {isLoading ? (
        <div class={styles.loaderContainer}>
          <Loader class={styles.loader} />
        </div>
      ) : (
        <div class={styles.container}>
          {!totalCount && !isLoading ? (
            <span class={styles.blankMessage}>Пока здесь пусто</span>
          ) : (
            <ul class={styles.items}>
              {orders.map((order) => {
                if (isOld) {
                  return <DoneItem order={order} />;
                } else
                  return (
                    <Item
                      key={order.id}
                      order={order}
                      refreshItems={refreshItems}
                    />
                  );
              })}
            </ul>
          )}
          {totalCount > limit && (
            <Pagination
              class={styles.pagination}
              totalCount={totalCount}
              limit={limit}
              currentPage={currentPage}
              itemsRef={itemsRef}
            />
          )}
        </div>
      )}
    </>
  );
}
