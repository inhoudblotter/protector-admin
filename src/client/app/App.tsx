import Router, { Route, useRouter } from "preact-router";
import "./styles/globals.css";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Auth } from "../pages/Auth";
import { Order } from "../pages/Order/Order";
import { Orders } from "../pages/Orders";
import { Settings } from "../pages/Settings/Settings";
import { GlobalProvider } from "../shared/model/globalContext";
import { Alerts } from "../components/Alerts";
import { Reg } from "../pages/Reg";
import { Stats } from "../pages/Stats";

export function App({
  url,
  server,
  preloadState,
}: {
  url?: string;
  server?: boolean;
  preloadState?: any;
}) {
  return (
    <GlobalProvider>
      <Alerts />
      <Router url={url} static={server}>
        <Route path="/" component={() => <Home />} />
        <Route path="/login" component={() => <Auth />} />
        <Route path="/register" component={() => <Reg />} />
        <Route path="/orders/new" component={() => <Order />} />
        <Route
          path="/orders/:id"
          component={() => {
            if (!server && window.__order__)
              preloadState = { order: window.__order__ };
            return <Order preloadState={preloadState} />;
          }}
        />
        <Route path="/orders" component={() => <Orders />} />
        <Route path="/orders/old" component={() => <Orders />} />
        <Route path="/settings" component={() => <Settings />} />
        <Route path="/stats" component={() => <Stats />} />
        <Route path="*" default component={() => <NotFound />} />
      </Router>
    </GlobalProvider>
  );
}
