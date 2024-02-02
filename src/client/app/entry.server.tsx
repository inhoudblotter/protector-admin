import { render as renderToString } from "preact-render-to-string";
import { App } from "./App";

export function render({ url = "/", preloadState = {} }) {
  return renderToString(
    <App url={url} server preloadState={preloadState} />,
    preloadState
  );
}
