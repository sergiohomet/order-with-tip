import { menuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "add-item"; payload: { item: menuItem } }
  | { type: "remove-item"; payload: { id: menuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export type OrderState = {
  order: OrderItem[];
  tip: number;
};

export const initialState: OrderState = {
  order: [],
  tip: 0,
};

export const orderReducer = (state: OrderState, action: OrderActions) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );

    let updatedOrder: OrderItem[] = [];
    if (itemExist) {
      updatedOrder = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      updatedOrder = [...state.order, newItem];
    }

    return {
      ...state,
      order: updatedOrder,
    };
  }

  if (action.type === "remove-item") {
    const order = state.order.filter(
      (orderItem) => orderItem.id !== action.payload.id
    );
    return {
      ...state,
      order,
    };
  }

  if (action.type === "place-order") {
    return {
      order: [],
      tip: 0,
    };
  }

  if (action.type === "add-tip") {
    const tip = action.payload.value;

    return {
      ...state,
      tip,
    };
  }

  return state;
};
