import {  Spin } from "antd";
import { lazy, Suspense } from "react";
// import LoadingScreen from "../components/Loading";

const Loadable = ({ loader }) => {
  const Component = lazy(loader);

  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};

export default Loadable;
