import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { MethodsTypes, ApiHistory } from '@/types/types'
import api from "@/Utils/api";

export interface Tab {
  _id: string;
  name: string;
  sidebar: string;
  method: MethodsTypes;
  historyData?: ApiHistory;
}

const defaultTabs: Tab[] = [
  { _id: "default-1", name: "New Tab", sidebar: "request", method: 'GET' },
];

type TabState = {
  tabs: Tab[];
  activeTab: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: TabState = {
  tabs: defaultTabs,
  activeTab: "default-1",
  status: "idle",
  error: null,
};

// Async Thunks
export const fetchTabs = createAsyncThunk("tabs/fetchTabs", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/tabs");
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch tabs");
  }
});

export const addTabAsync = createAsyncThunk("tabs/addTabAsync", async (payload: { name: string; sidebar: string; method: MethodsTypes }, { rejectWithValue }) => {
  try {
    const response = await api.post("/tabs", payload);
    return response.data.data; // the new tab from backend
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to add tab");
  }
});

export const removeTabAsync = createAsyncThunk("tabs/removeTabAsync", async (id: string, { rejectWithValue }) => {
  try {
    // If it's a local unsaved tab
    if (id.startsWith("default-") || id.startsWith("history-")) {
      return id;
    }
    await api.delete(`/tabs/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to remove tab");
  }
});

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTabFromHistory: (state, action: PayloadAction<ApiHistory>) => {
      const historyItem = action.payload;
      const existingTabId = `history-${historyItem._id}`;
      console.log(historyItem);
      console.log(existingTabId);
      
      const existingTab = state.tabs.find(tab => tab._id === existingTabId) || state.tabs.find(tab => tab.historyData?._id === historyItem._id);

      if (existingTab) {
        state.activeTab = existingTab._id;
      } else {
        const newTab: Tab = {
          _id: existingTabId,
          name: historyItem.apiUrl,
          sidebar: "history",
          method: historyItem.method,
          historyData: historyItem
        };
        state.tabs.push(newTab);
        state.activeTab = existingTabId;
      }
    },

    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchTabs
      .addCase(fetchTabs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTabs.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload && action.payload.length > 0) {
          state.tabs = action.payload;
          state.activeTab = action.payload[0]._id;
        }
      })
      .addCase(fetchTabs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // addTabAsync
      .addCase(addTabAsync.fulfilled, (state, action) => {
        state.tabs.push(action.payload);
        state.activeTab = action.payload._id;
      })
      // removeTabAsync
      .addCase(removeTabAsync.fulfilled, (state, action) => {
        const idToRemove = action.payload;
        const updatedTabs = state.tabs.filter(tab => tab._id !== idToRemove);
        state.tabs = updatedTabs;

        if (state.activeTab === idToRemove) {
          state.activeTab = updatedTabs.length > 0 ? updatedTabs[0]._id : "";
        }
        
        // If no tabs are left, we could optionally add a default tab back here
        if (state.tabs.length === 0) {
            const newTab: Tab = { _id: `default-${Date.now()}`, name: "New Tab", sidebar: "request", method: 'GET' };
            state.tabs.push(newTab);
            state.activeTab = newTab._id;
        }
      });
  }
});

export const { addTabFromHistory, setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;