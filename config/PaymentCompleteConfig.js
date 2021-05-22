import { FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

const PaymentStatusData = {
  success: {
    title: "PAYMENT SUCCESSFUL",
    message: "Your Order has been placed",
    icon: <FaCheckCircle size={100} color={"#4C814B"} />,
  },
  failure: {
    title: "PAYMENT FAILED",
    message:
      "We have encountered the following error : The bank returned the decline code `expired_card`.",
    icon: <RiCloseCircleFill size={100} color={"#E93C3C"} />,
  },
};

export default PaymentStatusData;
