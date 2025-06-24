'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

// 👇 Extend the window object for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

type Props = {
  currentPlan: string; // "free" | "pro" | "team"
};
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  loading?: boolean;
}

const Button = ({ loading, children, ...props }: ButtonProps) => (
  <button {...props} disabled={loading || props.disabled}>
    {loading ? "Loading..." : children}
  </button>
);

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function ClientSubscription({ currentPlan }: Props) {
  const [loading, setLoading] = useState<Record<string, boolean>>({
    free: false,
    pro: false,
    team: false
  });

  const plans = [
    {
      name: "Free Plan",
      planKey: "free",
      price: "₹0",
      description: "Perfect for getting started with basic features.",
      features: [
        "10 Reminders / month",
        "Email notifications",
        "Basic support",
      ],
      highlight: false
    },
    {
      name: "Pro Plan",
      planKey: "pro",
      price: "₹199 / month",
      description: "Ideal for individuals with moderate usage.",
      features: [
        "100 Reminders / month",
        "Priority email support",
        "Custom reminder intervals",
      ],
      highlight: true
    },
    {
      name: "Team Plan",
      planKey: "team",
      price: "₹499 / month",
      description: "For teams and power users with unlimited needs.",
      features: [
        "Unlimited Reminders",
        "Team collaboration tools",
        "Premium support",
      ],
      highlight: false
    },
  ];

  
const handleSubscription = async (planKey: string) => {
  if (planKey === 'free') return;

  setLoading(prev => ({ ...prev, [planKey]: true }));

  try {
    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) throw new Error('Failed to load payment gateway');

    const response = await axios.post('/api/payment/checkout', {
      planId: planKey,
      amount: planKey === 'pro' ? 19900 : 49900,
      currency: 'INR',
    });

    const { orderId, amount } = response.data;

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: 'INR',
      name: "SNOOZEMAIL",
      description: `${planKey} Plan Subscription`,
      order_id: orderId,
      handler: async function (response: RazorpayResponse) {
        try {
          const verificationResponse = await axios.post('/api/payment/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            planId: planKey,
            amount: planKey === 'pro' ? 19900 : 49900,
          });

          if (verificationResponse.data.success) {
            alert('Payment successful! Plan upgraded.');
            window.location.reload();
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (verifyError) {
          console.error('Verification failed:', verifyError);
          alert('Something went wrong during payment verification.');
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  } finally {
    setLoading(prev => ({ ...prev, [planKey]: false }));
  }
};

  return (
    <div className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Select the perfect plan for your needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const isCurrent = plan.planKey === currentPlan;
          const isDisabled = isCurrent || (plan.planKey === "free" && currentPlan !== "free");

          return (
            <div 
              key={index}
              className={`relative ${plan.highlight ? 'md:transform md:scale-105 z-10' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    POPULAR
                  </Badge>
                </div>
              )}
              
              <Card
                className={`h-full flex flex-col border-2 ${
                  isCurrent 
                    ? 'border-sky-500 dark:border-sky-400' 
                    : plan.highlight 
                      ? 'border-sky-300 dark:border-sky-600' 
                      : 'border-sky-200 dark:border-sky-800'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <CardHeader className="pb-4">
                  <CardTitle className={`text-2xl ${
                    plan.highlight 
                      ? 'text-sky-600 dark:text-sky-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  } font-bold`}>
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                      {plan.price}
                    </span>
                    {!plan.price.includes('₹0') && (
                      <span className="text-gray-600 dark:text-gray-400 ml-1">/month</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow pt-0 pb-6">
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li 
                        key={i} 
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button
                      className={`w-full py-6 text-lg font-medium ${
                        isCurrent
                          ? "border-2 border-sky-500 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-800/20 dark:text-sky-300"
                          : plan.highlight
                            ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg"
                            : "bg-sky-600 hover:bg-sky-700 text-white"
                      } transition-colors duration-300`}
                      variant={isCurrent ? "outline" : "default"}
                      disabled={isDisabled}
                      onClick={() => !isDisabled && handleSubscription(plan.planKey)}
                      loading={loading[plan.planKey]}
                    >
                      {isCurrent
                        ? "Current Plan"
                        : plan.planKey === "free" && currentPlan !== "free"
                          ? "Already Subscribed"
                          : `Upgrade to ${plan.name.split(' ')[0]}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Need help choosing? <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Contact our sales team</a></p>
        <p className="mt-2">All plans come with a 14-day money-back guarantee</p>
      </div>
    </div>
  );
}