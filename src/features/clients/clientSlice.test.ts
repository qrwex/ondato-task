import { add, update, del } from "./clientSlice";
import { v4 } from "uuid";
import { store } from "../../app/store";

jest.mock("uuid");

describe("clientSlice", () => {
  it("adds client", () => {
    expect(store.getState().client.all).toStrictEqual({});

    (v4 as jest.Mock).mockImplementationOnce(() => "1");
    store.dispatch(
      add({
        firstName: "foo",
        lastName: "bar",
        phoneNumber: "911",
        address: "white house 15",
      })
    );

    expect(store.getState().client.all).toMatchInlineSnapshot(`
        Object {
          "1": Object {
            "address": "white house 15",
            "firstName": "foo",
            "lastName": "bar",
            "phoneNumber": "911",
          },
        }
      `);

    (v4 as jest.Mock).mockImplementationOnce(() => "2");
    store.dispatch(
      add({
        firstName: "borris",
        lastName: "johnson",
        phoneNumber: "112",
        address: "england parliament 16",
      })
    );

    expect(store.getState().client.all).toMatchInlineSnapshot(`
        Object {
          "1": Object {
            "address": "white house 15",
            "firstName": "foo",
            "lastName": "bar",
            "phoneNumber": "911",
          },
          "2": Object {
            "address": "england parliament 16",
            "firstName": "borris",
            "lastName": "johnson",
            "phoneNumber": "112",
          },
        }
      `);
  });

  it("deletes client", () => {
    store.dispatch(del("1"));
    expect(store.getState().client.all).toMatchInlineSnapshot(`
        Object {
          "2": Object {
            "address": "england parliament 16",
            "firstName": "borris",
            "lastName": "johnson",
            "phoneNumber": "112",
          },
        }
      `);
  });

  it("updates client", () => {
    store.dispatch(
      update({
        id: "2",
        client: {
          firstName: "mamma",
          lastName: "rock & roll",
          phoneNumber: "033",
          address: "papaya str 12",
        },
      })
    );

    expect(store.getState().client.all).toMatchInlineSnapshot(`
        Object {
          "2": Object {
            "address": "papaya str 12",
            "firstName": "mamma",
            "lastName": "rock & roll",
            "phoneNumber": "033",
          },
        }
      `);
  });
});
