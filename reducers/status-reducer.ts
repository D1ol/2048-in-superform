type State = {
  subscribed: boolean;
};

export const initialState: State =
  {
    subscribed: false
  };

type Action =
  | { type: "change_subscribe", status: boolean }

export default function statusReducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case "change_subscribe": {
      return {
        subscribed: action.status
      };
    }
    default:
      return state;
  }
}
