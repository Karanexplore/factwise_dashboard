import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-theme-quartz.css";

import employeesData from "../data/employees.json";

const EmployeeGrid = () => {
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [search, setSearch] = useState("");

  const baseRowData = employeesData.employees;

  const rowData = useMemo(() => {
    return baseRowData.filter((emp) => {
      const matchesDept = departmentFilter
        ? emp.department === departmentFilter
        : true;
      const matchesLocation = locationFilter
        ? emp.location === locationFilter
        : true;
      const term = search.trim().toLowerCase();
      const matchesSearch = term
        ? (
            emp.firstName +
            " " +
            emp.lastName +
            " " +
            emp.position +
            " " +
            emp.department
          )
            .toLowerCase()
            .includes(term)
        : true;
      return matchesDept && matchesLocation && matchesSearch;
    });
  }, [baseRowData, departmentFilter, locationFilter, search]);

  const columnDefs = useMemo(
    () => [
      { headerName: "ID", field: "id", width: 90 },
      { headerName: "Name", valueGetter: (p) => p.data.firstName + " " + p.data.lastName, minWidth: 160 },
      { headerName: "Email", field: "email", flex: 1, minWidth: 180 },
      { headerName: "Department", field: "department", minWidth: 130 },
      { headerName: "Position", field: "position", flex: 1, minWidth: 160 },
      { headerName: "Location", field: "location", minWidth: 120 },
      { headerName: "Age", field: "age", width: 90 },
      {
        headerName: "Salary",
        field: "salary",
        minWidth: 130,
        valueFormatter: (p) => `$${p.value.toLocaleString()}`,
      },
      { headerName: "Hire Date", field: "hireDate", minWidth: 130 },
      {
        headerName: "Rating",
        field: "performanceRating",
        width: 110,
        cellClass: "text-center",
      },
      {
        headerName: "Projects",
        field: "projectsCompleted",
        width: 110,
        cellClass: "text-center",
      },
      {
        headerName: "Status",
        field: "isActive",
        width: 120,
        cellRenderer: (p) => (
          <span
            style={{
              padding: "2px 10px",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 500,
              backgroundColor: p.value ? "rgba(22,163,74,0.12)" : "rgba(239,68,68,0.12)",
              color: p.value ? "#16a34a" : "#ef4444",
            }}
          >
            {p.value ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        headerName: "Skills",
        field: "skills",
        flex: 1.2,
        minWidth: 200,
        cellRenderer: (p) => p.value.join(", "),
      },
      { headerName: "Manager", field: "manager", minWidth: 130 },
    ],
    []
  );

  const uniqueDepartments = Array.from(
    new Set(baseRowData.map((e) => e.department))
  );
  const uniqueLocations = Array.from(
    new Set(baseRowData.map((e) => e.location))
  );

  return (
    <div className="dashboard-card">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <div>
          <h5 className="mb-1">Employee Directory</h5>
          <small className="text-muted">
            Explore, filter, and sort employees using the interactive grid.
          </small>
        </div>
      </div>

      <div className="filters-row">
        <input
          type="text"
          className="form-control filter-input"
          placeholder="Search by name, role, or department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select filter-input"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          className="form-select filter-input"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>


     { /* jsx wrapper */ }
      <div className="ag-theme-quartz" style={{ height: 550 }}>
    <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
    />
    </div>

    </div>
  );
};

export default EmployeeGrid;
