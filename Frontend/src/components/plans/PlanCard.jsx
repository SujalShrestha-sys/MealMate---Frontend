import React from "react";

import { Check, Package, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import subscriptionService from "../../api/services/subscription.service";
import paymentService from "../../api/services/payment.service";
import toast from "react-hot-toast";

const PlanCard = ({ plan, isCurrentPlan, hasActiveSub, status }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [isPurchasing, setIsPurchasing] = React.useState(false);

  const handleChoosePlan = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to purchase a plan");
      navigate("/login");
      return;
    }

    if (hasActiveSub && !isCurrentPlan) {
      toast.error("You already have an active subscription");
      return;
    }

    if (isCurrentPlan && status === "ACTIVE") {
      toast.success("This is your current plan!");
      return;
    }

    setIsPurchasing(true);
    try {
      // Step 1: Create pending subscription
      const subResponse = await subscriptionService.purchasePlan(plan.id);

      if (subResponse.success) {
        const subscriptionId = subResponse.data.id;

        // Step 2: Initiate Khalti Payment
        const paymentResponse = await paymentService.initiatePayment({
          orderId: null,
          subscriptionId,
          method: "KHALTI",
          return_url: `${window.location.origin}/payment/verify`,
        });

        if (paymentResponse.success) {
          // Redirect to Khalti
          window.location.href = paymentResponse.data.payment_url;
        } else {
          toast.error(paymentResponse.message || "Failed to initiate payment");
        }
      } else {
        toast.error(subResponse.message || "Failed to initiate subscription");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsPurchasing(false);
    }
  };
  return (
    <div
      className={`relative bg-white rounded-xl p-6 transition-all duration-300 flex flex-col group ${
        plan.popular
          ? "border-2 border-green-500 hover:shadow-lg "
          : "border border-gray-200 hover:border-green-300 hover:shadow-md"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-linear-to-r from-orange-300 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
          {plan.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-gray-900">
            Rs. {plan.price}
          </span>
          <span className="text-gray-500">/ {plan.period}</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          <Package size={16} />
          <span>{plan.meals} meals included</span>
        </div>
      </div>

      {/* Features List */}
      <div className="grow mb-6">
        <div className="space-y-3">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-0.5">
                <Check size={18} className="text-green-600" />
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Additional Info */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Delivery</span>
          <span className="font-semibold text-gray-900">Free</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Cancellation</span>
          <span className="font-semibold text-gray-900">Anytime</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleChoosePlan}
        disabled={isPurchasing || (status === "ACTIVE" && !isCurrentPlan)}
        className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
          isCurrentPlan && status === "ACTIVE"
            ? "bg-slate-100 text-slate-500 cursor-default"
            : plan.popular || (isCurrentPlan && status === "PENDING_PAYMENT")
              ? "bg-green-600 hover:bg-green-700 text-white disabled:opacity-70"
              : "bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:opacity-70"
        }`}
      >
        {isPurchasing ? (
          <Loader2 size={20} className="animate-spin" />
        ) : isCurrentPlan ? (
          status === "PENDING_PAYMENT" ? (
            "Complete Payment"
          ) : (
            "Current Plan"
          )
        ) : (
          "Choose Plan"
        )}
      </button>
    </div>
  );
};

export default PlanCard;
