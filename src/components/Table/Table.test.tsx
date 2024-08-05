import { fireEvent, render, screen } from "@testing-library/react";
import Table from "./Table";

const data = [
  {
    id: 1234,
    name: "John Doe",
    email: "jdoe@gmail.com",
  },
  {
    id: 2345,
    name: "Jane Doe",
    email: "jandoe@gmail.com",
  },
  {
    id: 36787,
    name: "John Smith",
    email: "jsmith@smith.com",
  },
];
const columns = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Email",
    name: "email",
  },
];

describe("Render Table component", () => {
  it("renders without crashing", () => {
    render(<Table data={[]} columns={[]} loading={false} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
  it("renders loading message", () => {
    render(<Table data={[]} columns={[]} loading={true} />);
    const loading = screen.getByText("Cargando la informacion");
    expect(loading).toBeInTheDocument();
  });
  it("renders table with data", () => {
    render(<Table data={data} columns={columns} loading={false} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
  });

  it("renders table with data and sorts by name", () => {
    render(<Table data={data} columns={columns} loading={false} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    const nameHeader = screen.getByText("Name");
    nameHeader.click();

    const sortedNames = screen
      .getAllByRole("row")
      .map((row) => row.textContent);

    expect(sortedNames).toEqual([
      "NameEmail",
      "Name: John DoeEmail: jdoe@gmail.com",
      "Name: Jane DoeEmail: jandoe@gmail.com",
      "Name: John SmithEmail: jsmith@smith.com",
    ]);
  });

  it("should toggle menu visibility on button click", () => {
    render(
      <Table
        data={data}
        columns={columns}
        loading={false}
        actions={[
          { action: "Edit", do: jest.fn() },
          { action: "Delete", do: jest.fn() },
        ]}
      />
    );

    const button = screen.getAllByText("Acciones")[0];

    fireEvent.click(button);

    expect(screen.getByText("Edit")).toBeVisible();
    expect(screen.getByText("Delete")).toBeVisible();

    fireEvent.click(button);

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("should call action.do and set menuVisibleRowId to null on button click", () => {
    const mockData = [
      { id: "1", name: "Row 1", logo: "logo1.png" },
      { id: "2", name: "Row 2", logo: "logo2.png" },
    ];

    const mockColumns = [
      { name: "name", label: "Name" },
      { name: "logo", label: "Logo" },
    ];
    const mockActions = [
      { action: "Edit", do: jest.fn() },
      { action: "Delete", do: jest.fn() },
    ];

    render(
      <Table
        data={mockData}
        columns={mockColumns}
        loading={false}
        actions={mockActions}
      />
    );

    const accionesButton = screen.getAllByText("Acciones")[0];
    fireEvent.click(accionesButton);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockActions[0].do).toHaveBeenCalledWith(mockData[0]);

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });
});
