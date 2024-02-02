import { h } from "preact";
import { useRouter } from "preact-router";
import { Tab } from "./Tab";
import { cn } from "src/client/shared/utils/cn";
import styles from "./Tabs.module.css";

interface ITabs extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function Tabs({ class: className }: ITabs) {
  const [routerArgs] = useRouter();
  return (
    <div class={cn(className, styles.container)}>
      <Tab
        name="Открытые"
        href={"/orders"}
        isActive={routerArgs.path === "/orders"}
      />
      <Tab
        name="Закрытые"
        href={"/orders/old"}
        isActive={routerArgs.path === "/orders/old"}
      />
    </div>
  );
}
