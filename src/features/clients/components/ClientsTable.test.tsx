import { ClientsTable } from "./ClientsTable";
import { fireEvent, render } from "@testing-library/react";
import { RootState } from "../../../app/store";

describe(`${ClientsTable.name}`, () => {
  const props: any = {
    onDelete: jest.fn(),
    onModify: jest.fn(),
  };

  it("renders without crash", () => {
    const { baseElement } = render(<ClientsTable {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("handles delete click", () => {
    const { queryAllByLabelText } = render(<ClientsTable {...props} />);

    fireEvent.click(queryAllByLabelText("delete")[0]);
    expect(props.onDelete).toBeCalledWith("1");

    fireEvent.click(queryAllByLabelText("delete")[1]);
    expect(props.onDelete).toBeCalledWith("2");
  });

  it("handles modify click", () => {
    const { queryAllByLabelText } = render(<ClientsTable {...props} />);

    fireEvent.click(queryAllByLabelText("edit")[0]);
    expect(props.onModify).toBeCalledWith("1");

    fireEvent.click(queryAllByLabelText("edit")[1]);
    expect(props.onModify).toBeCalledWith("2");
  });
});

jest.mock("../../../app/hooks", () => ({
  useAppSelector: (): RootState["client"]["all"] => ({
    "1": {
      firstName: "foo",
      lastName: "bar",
      phoneNumber: "911",
      address: "mars",
    },
    "2": {
      firstName: "jr. foo",
      lastName: "bar",
      phoneNumber: "112",
      address: "5451",
    },
  }),
}));

jest.mock("@material-ui/core", () => ({
  IconButton: "icon-button",
  Table: "table",
  TableBody: "tbody",
  TableCell: "td",
  TableHead: "thead",
  TableRow: "tr",
}));

jest.mock("@material-ui/icons", () => ({
  Edit: "svg",
  Delete: "svg",
}));
