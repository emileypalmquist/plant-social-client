import React from "react";
import Loading from "../Loading";

function WithLoading(Component) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Loading />;
  };
}

export default WithLoading;
