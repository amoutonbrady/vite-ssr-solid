import type { Component } from "solid-js";
import { MetaProvider } from "solid-meta";
import { App } from "./App";

export interface TagDescription {
  tag: string;
  props: Record<string, unknown>;
}

export interface ServerProps {
  tags: TagDescription[];
}

const Server: Component<ServerProps> = (props) => {
  return (
    <MetaProvider tags={props.tags}>
      <App />
    </MetaProvider>
  );
};

export default Server;
