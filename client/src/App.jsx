import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LoadHandler } from "./components/LoadHandler";
import { ParliamentDisplay } from "./components/ParliamentDisplay";
import { Home } from "./components/Home";
import { ProjectListDisplay } from "./components/ProjectListDisplay";
import { WorldviewListDisplay } from "./components/WorldviewListDisplay";
import { AllocationDisplay } from "./components/AllocationDisplay";
import { SaveAndLoadDisplay } from "./components/SaveAndLoadDisplay";
import { Layout } from "./layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const withLayout = (Comp) => {
  return (
    <Layout>
      <Comp />
    </Layout>
  );
};
const PANEL_DISPLAYS = ["parliament", "projects"];
const router = createBrowserRouter([
  { path: "/", element: withLayout(Home) },
  { path: "/projects/:projectId", element: withLayout(ProjectListDisplay) },
  { path: "/projects", element: withLayout(ProjectListDisplay) },
  { path: "/worldviews/:worldviewId", element: withLayout(WorldviewListDisplay) },
  { path: "/worldviews", element: withLayout(WorldviewListDisplay) },
  { path: "/allocations/:allocationStrategy", element: withLayout(AllocationDisplay) },
  { path: "/allocations", element: withLayout(AllocationDisplay) },
  { path: "/parliament", element: withLayout(ParliamentDisplay) },
  { path: "/save_and_load", element: withLayout(SaveAndLoadDisplay) },
  {
    path: "/*",
    element: withLayout(() => (
      <div
        style={{
          fontSize: "15rem",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        404
      </div>
    )),
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadHandler />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
