import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "Contracts",
    "Users",
    "Employees",
    "TrainingPrograms",
    "ControlPoints",
    "TrainingVehicles",
    "HoursTypes",
    "TrainingPlaces",
    "Positions",
    "Branches",
    "Products",
    "Schools",
    "TrainingGroups",
    "Vassals",
    "Payments",
    "Sales",
    "drivingСlasses",
    "LibraryMaterials",
    "Avatar",
    "Auth",
    "UserMessages",
    "drivingSessions",
    "Slots",
    "TestingPack",
    "TestingTheme",
    "CardQuestion",
    "CardAnswer",
    "Attempts",
    "ContractsControlPoints",
    "TrainingMethods",
    "Billing",
    "Papers",
    "TrainingStage",
    "TrainingStageItems",
    "TestingMethod"
  ]
});


