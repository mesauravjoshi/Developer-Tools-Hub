import { createSlice, } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { MethodsTypes } from '@/types/types'

export interface Tab {
  id: number;
  name: string;
  method: MethodsTypes
}

const defaultTabs: Tab[] = [
  { id: 1, name: "New Tab", method: 'GET' },
];

type TabState = {
  tabs: Tab[];
  activeTab: number;
};

const initialState: TabState = {
  tabs: defaultTabs,
  activeTab: 1,
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state) => {
      const newTab: Tab = {
        id: Date.now(),
        name: `New Tab ${state.tabs.length}`,
        method: 'GET'
      }

      state.tabs.push(newTab)
      state.activeTab = newTab.id
    },

    closeTab: (state, action: PayloadAction<number>) => {
      const id = action.payload

      const updatedTabs = state.tabs.filter(tab => tab.id !== id)

      state.tabs = updatedTabs

      if (state.activeTab === id && updatedTabs.length > 0) {
        state.activeTab = updatedTabs[0].id
      }
    },

    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload
    }
  }
});

export const { addTab, closeTab, setActiveTab } = tabSlice.actions
export default tabSlice.reducer