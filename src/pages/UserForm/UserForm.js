import React from "react";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const max_step = 4;
  const [formStep, setFormStep] = React.useState(0);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const completeFormStep = () => {
    setFormStep((prev) => {
      return prev + 1;
    });
  };

  const renderButton = () => {
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 3) {
      return (
        <button
          disabled={!isValid}
          type="submit"
          className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      );
    } else {
      return (
        <button
          onClick={completeFormStep}
          disabled={!isValid}
          type="button"
          className="mt-6 bg-green-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      );
    }
  };

  const formSubmit = (val) => {
    window.alert(JSON.stringify(val, null, 2));
    console.log(watch());
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
          Avail Any Cloud Service in 4 easy steps
        </p>
      </div>
      <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
        <div className="px-16 py-10">
          <form onSubmit={handleSubmit(formSubmit)}>
            {formStep < max_step && (
              <div className="flex mb-2">
                {formStep >= 1 && (
                  <button
                    className="hover:text-green-600"
                    onClick={prevStep}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
            {formStep === 0 && (
              <section>
                <h2 className="font-semibold text-3xl mb-8">
                  Service Requirments
                </h2>
                <label htmlFor="csp">Preffered Cloud Provider</label>
                <select
                  id="csp"
                  name="csp"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("csp", {
                    required: {
                      value: true,
                      message: "please enter your name",
                    },
                  })}
                >
                  <option value="AWS">AWS</option>
                  <option value="Azure">Azure</option>
                  <option value="Google Cloud">Google-Cloud</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="tos">Type of service</label>
                <select
                  id="tos"
                  name="tos"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("tos", {
                    required: {
                      value: true,
                      message: "please enter your name",
                    },
                  })}
                >
                  <option value="Storage">Storage</option>
                  <option value="Compute">Compute</option>
                  <option value="Database">Database</option>
                  <option value="Networking">Networking</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="cpu">CPU cores</label>
                <input
                  type="number"
                  id="cpu"
                  name="cpu"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("cpu", {
                    required: {
                      value: true,
                      message: "please enter no. of cors",
                    },
                    min: {
                      value: 0,
                      message: "no. of cors cannot be negative",
                    },
                  })}
                />
                {errors.cpu && (
                  <p className=" mb-3 text-red-600 text-sm ">
                    {errors.cpu.message}
                  </p>
                )}

                <label htmlFor="ram">RAM</label>
                <input
                  type="number"
                  id="ram"
                  placeholder="in GB"
                  name="ram"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("ram", {
                    required: {
                      value: true,
                      message: "please enter RAM",
                    },
                    min: {
                      value: 0,
                      message: "RAM cannot be negative",
                    },
                  })}
                />
                {errors.ram && (
                  <p className=" text-red-600 text-sm mb-3">
                    {errors.ram.message}
                  </p>
                )}

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

            {formStep === 1 && (
              <section>
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

            {formStep === 2 && (
              <section>
                <h2 className="font-semibold text-3xl mb-8">
                  Technical Specifications
                </h2>
                <label htmlFor="dc_location">
                  Preffered Data Center Location
                </label>
                <input
                  type="text"
                  id="dc_location"
                  name="dc_location"
                  className=" mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("dc_location", {
                    required: {
                      value: true,
                      message: "please enter reigon",
                    },
                  })}
                />
                {errors.dc_location && (
                  <p className="text-red-600 text-sm  mb-3">
                    {errors.dc_location.message}
                  </p>
                )}

                <label htmlFor="os">Operating System Prefference</label>
                <select
                  id="os"
                  name="pos"
                  className="mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("os", {
                    required: {
                      value: true,
                      message: "please enter your name",
                    },
                  })}
                >
                  <option value="windows">Windows</option>
                  <option value="linux">Linux</option>
                  <option value="mac-os">Mac-os</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="api_comp">API Compatibility</label>
                <input
                  type="text"
                  id="api_comp"
                  name="api_comp"
                  className=" mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("api_comp")}
                />
              </section>
            )}

            {formStep === 3 && (
              <section>
                <h2 className="font-semibold text-3xl mb-8">
                  Security And Compliance Need
                </h2>
                <label htmlFor="security-req">Data Security Requirments</label>
                <input
                  type="text"
                  id="security-req"
                  name="security-req"
                  className=" mt-3 mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  {...register("security-req")}
                />
                Encrption Prefference
                <div className="flex items-center mt-3 mb-4 ml-3">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    name="first"
                    value="first"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                  >
                    Data Encrption
                  </label>
                </div>
                <div className="flex items-center ml-3">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    name="second"
                    value="secnd"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                  >
                    Transport Encrption
                  </label>
                </div>
              </section>
            )}

            {formStep === 4 && (
              <section>
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
