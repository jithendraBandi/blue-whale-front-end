import { notification } from "antd";

export const headerTabViews = {
    ITEMS: "itemsView",
    CATEGORIES: "categoryView",
    TRANSACTIONS: "transactionsView",
    MAINTENANCE: "maintainenceView",
}

export const errorNotification = (message) => (
    notification.error({
        message,
        placement: "bottomRight"
      })
);