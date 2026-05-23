import Lottie from "lottie-react";
import successAnimation from "../../assets/animation/payment-success.json";

const PaymentSuccessAnimation = () => {
  return (
    <div className="w-56">
      <Lottie
        animationData={successAnimation}
        loop={false}
      />
    </div>
  );
};

export default PaymentSuccessAnimation;
