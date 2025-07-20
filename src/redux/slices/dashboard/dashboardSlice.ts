import { config } from "@/constants/config";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardDetails =
  createAsyncThunk<ApiResponse.OrganizationResponse>(
    "dashboard/fetchDashboardDetails",
    async (payload, { getState, rejectWithValue }) => {
      const {
        auth: { token },
      } = getState() as RootState;
      if (!token) {
        return;
      }

      try {
        const response = await axios.get<any>(
          `${config.API_URL}/all_organisations_stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("dashboard", JSON.stringify(response.data));

        return response.data;
      } catch (err: any) {
        console.log("fetchDashboardDetails", err.response.data);
        return rejectWithValue(err.response.data);
      }
    }
  );
