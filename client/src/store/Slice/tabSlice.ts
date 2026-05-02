import { createSlice, } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { MethodsTypes } from '@/types/types'

export interface Tab {
  id: number;
  name: string;
  sidebar: string;
  method: MethodsTypes
}

const defaultTabs: Tab[] = [
  { id: 1, name: "New Tab", sidebar: "request", method: 'GET' },
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
        sidebar: "request",
        method: 'GET'
      }

      state.tabs.push(newTab)
      state.activeTab = newTab.id
    },

    // New action: Creates or updates a single history tab
    setHistoryTab: (state, action: PayloadAction<{ method: MethodsTypes; name: string }>) => {
      const HISTORY_TAB_ID = 999999999; // Fixed ID for history tab
      const { method, name } = action.payload
      
      // Check if history tab already exists
      const existingTab = state.tabs.find(tab => tab.id === HISTORY_TAB_ID)

      if (existingTab) {
        // Update existing history tab
        existingTab.method = method
        existingTab.name = name
      } else {
        // Create new history tab
        const newTab: Tab = {
          id: HISTORY_TAB_ID,
          name: name,
          sidebar: "request",
          method: method
        }
        state.tabs.push(newTab)
      }

      // Set as active tab
      state.activeTab = HISTORY_TAB_ID
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

export const { addTab, closeTab, setActiveTab, setHistoryTab } = tabSlice.actions
export default tabSlice.reducer