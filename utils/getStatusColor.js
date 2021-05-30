import {
  CANCELLED,
  COMPLETED,
  IN_PROGRESS,
  SUCCEEDED,
  PROCESSING,
} from "./constants";

const getStatusColor = (status) => {
  switch (status.toUpperCase()) {
    case IN_PROGRESS:
      return "success";

    case CANCELLED:
      return "faiure";

    case COMPLETED:
      return "success";

    case SUCCEEDED:
      return "success";

    case PROCESSING:
      return "success";
  }
};

export default getStatusColor;
