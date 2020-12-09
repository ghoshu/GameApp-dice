import { store } from "react-notifications-component";

const alert = (msg, type, duration = 5000, screen = true) => {
  if ((type = "danger")) {
    store.addNotification({
      title: "Error!",
      message: msg,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: duration,
        onScreen: screen,
      },
      width: 500,
    });
  } else if ((type = "success")) {
    store.addNotification({
      title: "Success!",
      message: msg,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: duration,
        onScreen: screen,
      },
      width: 500,
    });
  }
};

export default alert;
