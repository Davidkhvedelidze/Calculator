"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const STRIPE_JS_SRC = "https://js.stripe.com/v3/";

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Scripts can only be loaded in the browser."));
      return;
    }

    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        resolve();
      } else {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () =>
          reject(new Error(`Failed to load script: ${src}`))
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

function centsFromAmount(amount) {
  const dollars = Number.parseFloat(amount);
  if (Number.isNaN(dollars)) return 0;
  return Math.round(dollars * 100);
}

function formatUsd(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function PaymentWidget({
  defaultAmount = 500,
  description = "Secure your itinerary with a refundable planning deposit payable in USD.",
  heading = "Secure online payment",
  minAmount = 50,
  successMessage = "Payment successful! Check your email for confirmation.",
  tourTitle,
}) {
  const [amountInput, setAmountInput] = useState(String(defaultAmount));
  const normalizedAmount = useMemo(() => {
    const parsed = Number.parseFloat(amountInput.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(parsed)) return minAmount;
    return Math.max(minAmount, Math.round(parsed * 100) / 100);
  }, [amountInput, minAmount]);
  const centsAmount = useMemo(
    () => centsFromAmount(normalizedAmount),
    [normalizedAmount]
  );

  const [stripeReady, setStripeReady] = useState(false);
  const [stripeError, setStripeError] = useState("");
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const stripePaymentElementRef = useRef(null);
  const [paymentElement, setPaymentElement] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [stripeStatus, setStripeStatus] = useState("");
  const [receiptEmail, setReceiptEmail] = useState("");

  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const paypalButtonsContainerRef = useRef(null);
  const paypalButtonsInstanceRef = useRef(null);
  const [paypalStatus, setPaypalStatus] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function initStripe() {
      if (!STRIPE_PUBLISHABLE_KEY) {
        setStripeError(
          "Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment to enable Stripe payments."
        );
        return;
      }

      try {
        await loadExternalScript(STRIPE_JS_SRC);
        if (cancelled) return;
        if (!window.Stripe) {
          throw new Error("Stripe.js failed to initialize.");
        }
        const stripeInstance = window.Stripe(STRIPE_PUBLISHABLE_KEY);
        setStripe(stripeInstance);
        setStripeReady(true);
      } catch (error) {
        setStripeError(error.message);
      }
    }

    initStripe();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function createPaymentIntent() {
      if (!stripeReady || !STRIPE_PUBLISHABLE_KEY) return;
      if (centsAmount < 50) {
        setStripeError("Amount must be at least $0.50 USD.");
        return;
      }

      setIsCreatingIntent(true);
      setStripeError("");
      setStripeStatus("");

      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: centsAmount,
            description: tourTitle
              ? `Deposit for ${tourTitle}`
              : "Travel planning deposit",
            receiptEmail: receiptEmail?.trim() || undefined,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data?.error || "Unable to create Stripe payment intent."
          );
        }

        if (!cancelled) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        if (!cancelled) {
          setStripeError(error.message);
        }
      } finally {
        if (!cancelled) {
          setIsCreatingIntent(false);
        }
      }
    }

    const debounce = setTimeout(createPaymentIntent, 400);
    return () => {
      cancelled = true;
      clearTimeout(debounce);
    };
  }, [centsAmount, receiptEmail, stripeReady, tourTitle]);

  useEffect(() => {
    if (!stripe || !clientSecret || !stripePaymentElementRef.current) return;

    const stripeElements = stripe.elements({
      clientSecret,
      appearance: {
        theme: "stripe",
        variables: {
          colorPrimary: "#0f766e",
        },
      },
    });

    const paymentEl = stripeElements.create("payment");
    paymentEl.mount(stripePaymentElementRef.current);
    setElements(stripeElements);
    setPaymentElement(paymentEl);

    return () => {
      paymentEl.destroy();
      setPaymentElement(null);
      setElements(null);
    };
  }, [stripe, clientSecret]);

  const handleStripeSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setStripeError("Stripe.js has not finished loading. Please try again.");
      return;
    }

    setStripeStatus("processing");
    setStripeError("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      setStripeStatus("");
      setStripeError(
        error.message || "We were unable to confirm your payment."
      );
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setStripeStatus(successMessage);
    } else {
      setStripeStatus("Payment submitted! Check your email for confirmation.");
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function initPayPal() {
      if (!PAYPAL_CLIENT_ID) {
        setPaypalError(
          "Set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your environment to enable PayPal payments."
        );
        return;
      }

      try {
        await loadExternalScript(
          `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=CAPTURE&components=buttons`
        );
        if (!cancelled) {
          if (!window.paypal) {
            throw new Error("PayPal SDK failed to initialise.");
          }
          setPaypalReady(true);
        }
      } catch (error) {
        if (!cancelled) {
          setPaypalError(error.message);
        }
      }
    }

    initPayPal();

    return () => {
      cancelled = true;
      if (paypalButtonsInstanceRef.current) {
        paypalButtonsInstanceRef.current.close();
        paypalButtonsInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!paypalReady || !paypalButtonsContainerRef.current || !window.paypal)
      return;

    if (paypalButtonsInstanceRef.current) {
      paypalButtonsInstanceRef.current.close();
    }

    paypalButtonsInstanceRef.current = window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },
      createOrder: (_, actions) => {
        setPaypalStatus("");
        setPaypalError("");
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: normalizedAmount.toFixed(2),
              },
              description: tourTitle
                ? `Deposit for ${tourTitle}`
                : "Must See Georgia travel planning deposit",
            },
          ],
        });
      },
      onApprove: async (_, actions) => {
        try {
          const details = await actions.order.capture();
          setPaypalStatus(`Payment completed! Transaction ${details.id}`);
        } catch (error) {
          setPaypalError(error.message || "Unable to capture PayPal payment.");
        }
      },
      onError: (error) => {
        setPaypalError(
          error.message || "PayPal experienced an unexpected error."
        );
      },
    });

    paypalButtonsInstanceRef.current.render(paypalButtonsContainerRef.current);

    return () => {
      if (paypalButtonsInstanceRef.current) {
        paypalButtonsInstanceRef.current.close();
        paypalButtonsInstanceRef.current = null;
      }
    };
  }, [normalizedAmount, paypalReady, tourTitle]);

  return (
    <div className="card space-y-6 bg-white/80 p-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">{heading}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="text-xs text-slate-500">
          Accepted methods: PayPal, Apple Pay, Google Pay, and major cards.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Deposit amount (USD)
          <input
            type="number"
            min={minAmount}
            step="10"
            value={amountInput}
            onChange={(event) => setAmountInput(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
          />
          <span className="block text-xs text-slate-500">
            Minimum {formatUsd(minAmount)}. Current payment:{" "}
            {formatUsd(normalizedAmount)}.
          </span>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Receipt email (optional)
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={receiptEmail}
            onChange={(event) => setReceiptEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
          />
          <span className="block text-xs text-slate-500">
            We’ll send confirmations to this address for Stripe payments.
          </span>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Stripe · Cards & digital wallets
          </h4>
          {!STRIPE_PUBLISHABLE_KEY ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              Stripe is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
              and STRIPE_SECRET_KEY to your environment to accept Apple Pay,
              Google Pay, and card payments.
            </p>
          ) : (
            <form onSubmit={handleStripeSubmit} className="space-y-3">
              <div
                ref={stripePaymentElementRef}
                className="rounded-2xl border border-slate-200 bg-white p-3"
              >
                {(!stripeReady || isCreatingIntent || !clientSecret) &&
                  !stripeError && (
                    <p className="text-sm text-slate-500">
                      Preparing secure checkout…
                    </p>
                  )}
              </div>
              {stripeError && (
                <p className="text-sm text-rose-600">{stripeError}</p>
              )}
              {stripeStatus && !stripeError && (
                <p className="text-sm text-emerald-600">{stripeStatus}</p>
              )}
              <button
                type="submit"
                disabled={!stripeReady || !paymentElement || isCreatingIntent}
                className="btn-primary w-full justify-center"
              >
                {stripeStatus && !stripeError
                  ? "Submit another payment"
                  : `Pay ${formatUsd(normalizedAmount)} with Stripe`}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-3">
          {/* <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            PayPal
          </h4>
          {!PAYPAL_CLIENT_ID ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              PayPal is not configured. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your
              environment to enable the PayPal checkout button.
            </p>
          ) : (
            <div className="space-y-3">
              <div
                ref={paypalButtonsContainerRef}
                className="rounded-2xl border border-slate-200 bg-white p-3"
              >
                {!paypalReady && !paypalError && (
                  <p className="text-sm text-slate-500">Loading PayPal…</p>
                )}
              </div>
              {paypalError && (
                <p className="text-sm text-rose-600">{paypalError}</p>
              )}
              {paypalStatus && !paypalError && (
                <p className="text-sm text-emerald-600">{paypalStatus}</p>
              )}
            </div>
          )} */}
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            PayPal
          </h4>

          <PayPalScriptProvider
            options={{
              "client-id": PAYPAL_CLIENT_ID,
              currency: "USD",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [{ amount: { value: "79.00" } }],
                })
              }
              onApprove={(data, actions) => actions.order.capture()}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}
