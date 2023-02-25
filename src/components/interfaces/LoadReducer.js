export const INITIAL_STATE = {
  interface: "Main_Interface",
  data: {},
};

export const LoadReducer = (state, action) => {
  switch (action.type) {
    case "Loading_Interface":
      return {
        interface: "Loading_Interface",
        data: {},
      };
    case "Main_Interface":
      return {
        interface: "Main_Interface",
        data: action.payload,
      };
    case "Profile_Interface":
      return {
        interface: "Profile_Interface",
        data: action.payload,
      };
    case "Settings_Interface":
      return {
        interface: "Settings_Interface",
        data: action.payload,
      };
    case "Error_Interface":
      return {
        interface: "Error_Interface",
        data: action.payload,
      };
    default:
      return state;
  }
};

export const LOAD_TYPES = {
  Loading_Interface: "Loading_Interface",
  Main_Interface: "Main_Interface",
  Profile_Interface: "Profile_Interface",
  Settings_Interface: "Settings_Interface",
  Error_Interface: "Error_Interface",
};
