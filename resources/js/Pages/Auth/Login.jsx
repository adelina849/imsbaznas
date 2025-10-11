import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { router, Head } from "@inertiajs/react";

export default function Login() {
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [captchaType, setCaptchaType] = useState("checkbox");
  const recaptchaRef = useRef(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let token = "";
      if (recaptchaRef.current) {
        if (captchaType === "invisible") {
          token = await recaptchaRef.current.executeAsync();
          recaptchaRef.current.reset();
        } else {
          token = recaptchaRef.current.getValue();
          if (!token) {
            setErrors({ recaptcha: "Silakan verifikasi captcha terlebih dahulu." });
            setLoading(false);
            return;
          }
        }
      }

      router.post(
        "/login",
        { ...values, recaptcha_token: token },
        {
          onError: (errs) => {
            setErrors(errs || {});
            setLoading(false);
          },
          onFinish: () => setLoading(false),
        }
      );
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      setCaptchaType("checkbox");
      setLoading(false);
    }
  }

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .grecaptcha-badge {
        visibility: visible !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 50 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Head title="Login" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-300">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <img
              src="/assets/icon.png"
              alt="logo"
              className="mx-auto h-20 w-20 object-contain"
            />
            <h2 className="mt-4 font-bold text-2xl text-gray-800">
              IMS POS System
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Jl. Perintis Kemerdekaan No. 45, Bandung
            </p>
          </div>

          {/* Error Captcha */}
          {errors.recaptcha && (
            <div className="text-red-600 mb-3 text-sm text-center font-medium">
              {errors.recaptcha}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={values.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Masukkan username"
              />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Masukkan password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Captcha */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={siteKey}
                size={captchaType === "invisible" ? "invisible" : "normal"}
                ref={recaptchaRef}
                onErrored={() => setCaptchaType("checkbox")}
                onExpired={() => recaptchaRef.current.reset()}
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-md"
              }`}
            >
              {loading ? "Memproses..." : "Masuk Aplikasi"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              Pusat Bantuan
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
