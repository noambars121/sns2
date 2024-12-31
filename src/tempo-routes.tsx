import React from "react";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/tempobook/*",
    element: <div />, // Tempo will handle this route
  },
];

export default routes;
