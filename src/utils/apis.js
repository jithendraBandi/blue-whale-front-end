export const BASE_URL = "http://localhost:8080/api";

// Category --------------------------
export const GET_CATEGORIES = BASE_URL + "/category/get";
export const SAVE_CATEGORY = BASE_URL + "/category/save";
export const DELETE_CATEGORY = BASE_URL + "/category/{categoryId}/delete";

// Item --------------------------------
export const GET_ALL_ITEMS = BASE_URL + "/item/get";
export const SAVE_ITEM = BASE_URL + "/item/save";
export const DELETE_ITEM = BASE_URL + "/item/{itemId}/delete";

// Transaction --------------------------
export const GET_ALL_TRANSACTIONS = BASE_URL + "/transactions/get";
export const SAVE_TRANSACTION = BASE_URL + "/transactions/save";
export const DELETE_TRANSACTION = BASE_URL + "/transactions/{transactionId}/delete";

// Maintenance ----------------------------
export const GET_ALL_MAINTENANCE = BASE_URL + "/maintenance/get";
export const SAVE_MAINTENANCE = BASE_URL + "/maintenance/save";
export const DELETE_MAINTENANCE = BASE_URL + "/maintenance/{maintenanceId}/delete";

// Contact ----------------------------
export const GET_ALL_CONTACTS = BASE_URL + "/contacts";
export const SAVE_CONTACT = BASE_URL + "/contacts";
export const DELETE_CONTACT = BASE_URL + "/contacts/{contactId}";