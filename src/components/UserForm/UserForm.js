import React, { useReducer, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
//import { useAppContext } from "../../context/appContext";
const max_step = 5;
const initialAuthState = {
  email: "",
  password: "",
  confirmPass: "",
};

const authReducer = (state, action) => {
  if (action.type === "setEmail") {
    return {
      ...state,
      email: action.payload,
    };
  } else if (action.type === "setPassword") {
    return {
      ...state,
      password: action.payload,
    };
  } else if (action.type === "setConfirmPassword") {
    return {
      ...state,
      confirmPass: action.payload,
    };
  }

  return state;
};
const UserForm = () => {
  const [formStep, setFormStep] = React.useState(0);
  const { registerProvider, displayAlert } = useAppContext();
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [inputError, setInputError] = useState(null);

  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const completeFormStep = () => {
    // e.preventDefault();
    // console.log("called " + formStep);
    const shouldDisable =
      formStep === 0 && authState.password !== authState.confirmPass;
    if (shouldDisable) {
      setInputError("Passwords do not match!");
      return;
    }
    setFormStep((prev) => {
      return prev + 1;
    });
  };

  const renderButton = () => {
    if (formStep > 4) {
      return undefined;
    } else if (formStep === 5) {
      return (
        <button
          disabled={!isValid}
          type="submit"
          className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      );
    } else if (formStep !== 4) {
      return (
        <button
          type="button"
          onClick={completeFormStep}
          disabled={!isValid}
          className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      );
    }
  };

  const formSubmit = (val) => {
    const provider = {
      ...val,
      ...authState,
    };
    console.log(provider);

    // registerProvider(provider);
    completeFormStep();
  };

  const prevStep = () => {
    setFormStep((prev) => {
      return prev - 1;
    });
  };
  return (
    <div className="min-h-screen bg-teal-100 flex flex-col items-start text-gray-900 antialiased relative">
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
          height: "34rem",
        }}
        className="absolute bg-teal-800 inset-x-0 top-0"
      ></div>
      <div className="mx-auto z-10 mt-40 text-center">
        <h1 className="text-white text-5xl font-semibold">
          Welcome to <span className="text-yellow-500">the Club</span>
        </h1>
        <p className="text-green-200 mt-2">
          Avail Any Cloud Service in 5 easy steps
        </p>
      </div>
      <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
        <div className="px-16 py-10">
          <form onSubmit={handleSubmit(formSubmit)}>
            {formStep < max_step && (
              <div className="flex mb-2">
                {formStep > 0 && (
                  <button
                    className="hover:text-green-600"
                    onClick={prevStep}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                )}
                <p className="ml-2">
                  step {formStep + 1} of {max_step}
                </p>
              </div>
            )}
            {formStep >= 0 && (
              <section className={`${formStep === 0 ? "block" : "hidden"}`}>
                <h2 className="font-semibold text-3xl mb-8">
                  Basic Requirments
                </h2>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => {
                    authDispatch({
                      type: "setEmail",
                      payload: e.target.value,
                    });
                  }}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => {
                    authDispatch({
                      type: "setPassword",
                      payload: e.target.value,
                    });
                  }}
                />
                <label htmlFor="confirmPass">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPass"
                  name="confirmPass"
                  className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => {
                    authDispatch({
                      type: "setConfirmPassword",
                      payload: e.target.value,
                    });
                  }}
                />
                {inputError && (
                  <p className=" mb-2 text-red-600 text-sm ">{inputError}</p>
                )}
              </section>
            )}
            {formStep >= 1 && (
              <section className={`${formStep === 1 ? "block" : "hidden"}`}>
                <h2 className="font-semibold text-3xl mb-8">
                  Service Requirments
                </h2>
                <label htmlFor="name">Brand Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "please enter name",
                    },
                  })}
                />
                {errors.name && (
                  <p className=" mb-4 text-red-600 text-sm ">
                    {errors.name.message}
                  </p>
                )}

                <label htmlFor="network_bandwidth">Bandwidth</label>
                <input
                  type="number"
                  id="network_bandwidth"
                  placeholder="in mbps"
                  name="network_bandwidth"
                  className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("network_bandwidth", {
                    required: {
                      value: true,
                      message: "please enter network_bandwidth",
                    },
                  })}
                />
                {errors.network_bandwidth && (
                  <p className=" mb-4 text-red-600 text-sm ">
                    {errors.network_bandwidth.message}
                  </p>
                )}

                <label htmlFor="responseTime">Response Time</label>
                <input
                  type="number"
                  id="responseTime"
                  placeholder="in ms"
                  name="responseTime"
                  className="mt-3 mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("responseTime", {
                    required: {
                      value: true,
                      message: "please enter Response time",
                    },
                  })}
                />
                {errors.responseTime && (
                  <p className=" mb-2 text-red-600 text-sm ">
                    {errors.responseTime.message}
                  </p>
                )}

                <label htmlFor="tos">Type of service</label>
                <select
                  id="tos"
                  name="tos"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("tos", {
                    required: {
                      value: true,
                      message: "please enter the type of service",
                    },
                  })}
                >
                  <option value="Storage">Storage</option>
                  <option value="Compute">Compute</option>
                  <option value="Database">Database</option>
                  <option value="Networking">Networking</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="storage">Storage</label>
                <input
                  type="number"
                  id="storage"
                  placeholder="in GB"
                  name="storage"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("storage", {
                    required: {
                      value: true,
                      message: "please enter storage",
                    },
                    min: {
                      value: 0,
                      message: "storage cannot be negative",
                    },
                  })}
                />
                {errors.storage && (
                  <p className=" text-red-600 text-sm mb-3">
                    {errors.storage.message}
                  </p>
                )}
              </section>
            )}

            {formStep >= 2 && (
              <section className={`${formStep === 2 ? "block" : "hidden"}`}>
                <h2 className="font-semibold text-3xl mb-8">
                  Budget And Cost Prefference
                </h2>
                <label htmlFor="budget">Budget Constraints</label>
                <input
                  type="number"
                  id="budget"
                  placeholder="in Rupee"
                  name="budget"
                  className=" mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("budget", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                    min: {
                      value: 0,
                      message: "cannot be negative",
                    },
                  })}
                />
                {errors.budget && (
                  <p className="text-red-600 text-sm mb-3">
                    {errors.budget.message}
                  </p>
                )}

                <label htmlFor="virtual_machine">
                  Avalaible Virtual Machine
                </label>
                <input
                  type="number"
                  id="virtual_machine"
                  name="virtual_machine"
                  className=" mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("virtual_machine", {})}
                />
                {errors.virtual_machine && (
                  <p className="text-red-600 text-sm mb-3">
                    {errors.virtual_machine.message}
                  </p>
                )}

                <label htmlFor="price-model">Pricing Model</label>
                <select
                  id="price-model"
                  name="price-models"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("price-model", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="pay-as-you-go">Pay-as-You-Go</option>
                  <option value="reserved_instances">Reserved-Instances</option>
                  <option value="spot_instances">Spot-Instances</option>
                  <option value="other">Other</option>
                </select>
              </section>
            )}

            {formStep >= 3 && (
              <section className={`${formStep === 3 ? "block" : "hidden"}`}>
                <h2 className="font-semibold text-3xl mb-8">
                  Technical Specifications
                </h2>

                <label htmlFor="cpucapacity">CPU Capacity</label>
                <select
                  id="cpucapacity"
                  name="cpucapacity"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("cpucapacity", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <label htmlFor="memorysize">Memory Size</label>
                <select
                  id="memorysize"
                  name="memorysize"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("memorysize", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <label htmlFor="boottime">Boot Time</label>
                <select
                  id="boottime"
                  name="boottime"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("boottime", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <label htmlFor="flexibility">Flexibility</label>
                <select
                  id="flexibility"
                  name="flexibility"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("flexibility", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="none">None</option>
                  <option value="yes">Yes</option>
                </select>
              </section>
            )}

            {formStep >= 4 && (
              <section className={`${formStep === 4 ? "block" : "hidden"}`}>
                <h2 className="font-semibold text-3xl mb-8">
                  Security And Compliance Need
                </h2>

                <label htmlFor="scaleup">Scale Up</label>
                <select
                  id="scaleup"
                  name="scaleup"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("scaleup", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <label htmlFor="scaledown">Scale Down</label>
                <select
                  id="scaledown"
                  name="scaledown"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("scaledown", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <label htmlFor="scaleuptime">Scale up Time</label>
                <select
                  id="scaleuptime"
                  name="scaleuptime"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("scaleuptime", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <label htmlFor="scaledowntime">Scale Down Time</label>
                <select
                  id="scaledowntime"
                  name="scaledowntime"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("scaledowntime", {
                    required: {
                      value: true,
                      message: "please enter price",
                    },
                  })}
                >
                  <option value="Veryhigh">Very High</option>
                  <option value="high">High</option>
                  <option value="meadium">Medium</option>
                  <option value="low">Low</option>
                  <option value="verylow">Very Low</option>
                </select>

                <button
                  disabled={!isValid}
                  type="submit"
                  className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Create Account
                </button>
              </section>
            )}

            {formStep >= 5 && (
              <section className={`${formStep === 5 ? "block" : "hidden"}`}>
                <h2 className="font-semibold text-3xl mb-6 ml-12">
                  Information Saved
                </h2>
              </section>
            )}

            {renderButton()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
