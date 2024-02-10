import { h } from "preact";
import { Link } from "preact-router";
import { Calendar } from "src/client/shared/ui/icons/Calendar/Calendar";
import { Report } from "src/client/shared/ui/icons/Report/Report";
import { Plus } from "src/client/shared/ui/icons/Plus/Plus";
import { Settings } from "src/client/shared/ui/icons/Settings/Settings";
import styles from "./Nav.module.css";
import { Client } from "src/client/shared/ui/icons/Client/Client";

const ITEMS: { href: string; icon: h.JSX.Element }[] = [
  { href: "/stats", icon: <Report /> },
  { href: "/", icon: <Calendar /> },
  { href: "/orders/new", icon: <Plus /> },
  { href: "/orders", icon: <Client /> },
  { href: "/settings", icon: <Settings /> },
];

export function Nav() {
  return (
    <nav class={styles.container}>
      <ul class={styles.items}>
        {ITEMS.map((item) => (
          <li key={item.href} class={styles.item}>
            <Link class={styles.link} href={item.href}>
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
