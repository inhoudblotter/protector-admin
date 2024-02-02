export type IRender = ({
  url,
  preloadState,
}: {
  url: string;
  preloadState?: object;
}) => Promise<string>;
