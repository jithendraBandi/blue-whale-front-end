import { notification } from "antd";

export const inputPassedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

export const headerTabViews = {
    ITEMS: "itemsView",
    CATEGORIES: "categoryView",
    TRANSACTIONS: "transactionsView",
    MAINTENANCE: "maintainenceView",
};

export const tradeTypes = {
    BUY: "BUY",
    SELL: "SELL",
};

export const quantityFilters = {
    OK: "GREEN",
    WARNING: "YELLOW",
    ZERO: "RED",
}

export const successNotification = (message) => (
    notification.success({
        message,
        placement: "bottomRight",
        duration: 3,
      })
);
export const errorNotification = (message) => (
    notification.error({
        message,
        placement: "bottomRight",
        duration: 3,
      })
);