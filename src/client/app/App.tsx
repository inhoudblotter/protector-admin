import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import "./styles/globals.css";
import { GlobalProvider } from "../shared/model/globalContext";
import { Alerts } from "../components/Alerts";

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
        <AsyncRoute
          path="/"
          getComponent={() =>
            import("../pages/Home/Home").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/login"
          getComponent={() =>
            import("../pages/Auth/Auth").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/register"
          getComponent={() =>
            import("../pages/Reg/Reg").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/orders/new"
          getComponent={() =>
            import("../pages/Order/Order").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/orders/:id"
          getComponent={() =>
            import("../pages/Order/Order").then((module) => {
              if (!server && window.__order__)
                preloadState = { order: window.__order__ };
              return <module.default preloadState={preloadState} />;
            })
          }
        />
        <AsyncRoute
          path="/orders"
          getComponent={() =>
            import("../pages/Orders/Orders").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/orders/old"
          getComponent={() =>
            import("../pages/Orders/Orders").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/settings"
          getComponent={() =>
            import("../pages/Settings/Settings").then(
              (module) => module.default
            )
          }
        />
        <AsyncRoute
          path="/stats"
          getComponent={() =>
            import("../pages/Stats/Stats").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="*"
          default
          getComponent={() =>
            import("../pages/NotFound/NotFound").then(
              (module) => module.default
            )
          }
        />
      </Router>
    </GlobalProvider>
  );
}
