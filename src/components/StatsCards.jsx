import React, { useMemo } from "react";
import employeesData from "../data/employees.json";

const StatsCards = () => {
  const employees = employeesData.employees;

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.isActive).length;
    const avgSalary = Math.round(
      employees.reduce((sum, e) => sum + e.salary, 0) / total
    );
    const avgRating = (
      employees.reduce((sum, e) => sum + e.performanceRating, 0) / total
    ).toFixed(2);

    return { total, active, avgSalary, avgRating };
  }, [employees]);

  return (
    <div className="row g-3 mb-3">
      <div className="col-12 col-md-3">
        <div className="stat-card">
          <div className="stat-label">Total Employees</div>
          <div className="d-flex align-items-end justify-content-between mt-2">
            <div className="stat-value">{stats.total}</div>
            <span className="stat-chip">Dataset size</span>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="stat-card">
          <div className="stat-label">Active Employees</div>
          <div className="d-flex align-items-end justify-content-between mt-2">
            <div className="stat-value">{stats.active}</div>
            <span className="stat-chip">
              {(stats.active / stats.total * 100).toFixed(0)}% active
            </span>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="stat-card">
          <div className="stat-label">Average Salary</div>
          <div className="d-flex align-items-end justify-content-between mt-2">
            <div className="stat-value">
              ${stats.avgSalary.toLocaleString()}
            </div>
            <span className="stat-chip">Per year</span>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3">
        <div className="stat-card">
          <div className="stat-label">Avg Performance</div>
          <div className="d-flex align-items-end justify-content-between mt-2">
            <div className="stat-value">{stats.avgRating}</div>
            <span className="stat-chip">Out of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
