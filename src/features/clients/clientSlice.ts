import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "../../app/store";

export interface Client {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export interface ClientState {
  all: {
    [k in string]: Client;
  };
}

const initialState: ClientState = {
  all: {},
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    add: (state, { payload }: { payload: Client }) => {
      state.all[uuid()] = payload;
    },
    del: (state, { payload }: { payload: string }) => {
      delete state.all[payload];
    },
    update: (
      state,
      { payload }: { payload: { id: string; client: Client } }
    ) => {
      state.all[payload.id] = payload.client;
    },
  },
});

export const { add, del, update } = clientSlice.actions;

export const selectAll = (state: RootState) => state.client.all;

export default clientSlice.reducer;
