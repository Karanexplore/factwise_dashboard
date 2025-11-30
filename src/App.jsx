import React from "react";
import Layout from "./components/Layout";
import StatsCards from "./components/StatsCards";
import EmployeeGrid from "./components/EmployeeGrid";

const App = () => {
  return (
    <Layout>
      <StatsCards />
      <EmployeeGrid />
    </Layout>
  );
};

export default App;
