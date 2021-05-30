import {
  CANCELLED,
  COMPLETED,
  IN_PROGRESS,
  PROCESSING,
  DELIVERED,
  DISPATCHED,
  SHIPPED,
  FAILED,
} from "./constants";

const getStatusColor = (status) => {
  switch (status.toUpperCase()) {
    case IN_PROGRESS:
      return "success";

    case CANCELLED:
      return "failure";

    case FAILED:
      return "failure";

    case DELIVERED:
      return "success";

    case COMPLETED:
      return "success";

    case DISPATCHED:
      return "success";

    case SHIPPED:
      return "success";

    case PROCESSING:
      return "success";
  }
};

export default getStatusColor;
