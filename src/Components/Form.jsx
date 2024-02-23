import { useContext } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../Contexts/DataProvider";
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userData, setData } = useContext(DataContext);

  // form submit handler
  const onSubmit = (data) => {
    // console.log(data);
    setData((prevState) => {
      const updatedState = [...prevState, data];
      localStorage.setItem("data", JSON.stringify(updatedState));
      return updatedState;
    });

    reset();
  };

  return (
    <div className="mx-auto w-[96%] rounded-lg border border-slate-600 p-3  sm:w-10/12 sm:px-8 sm:py-8 ">
      <h1 className="mb-6 text-3xl text-slate-100">Personal Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4  sm:flex-row">
          {/* First Name */}
          <div className="flex grow flex-col gap-1">
            <label
              htmlFor="firstName"
              className="text-md font-semibold text-slate-300"
            >
              First name
            </label>
            <input
              {...register("First Name", {
                required: "First name is required",
              })}
              type="text"
              id="firstName"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["First Name"] && (
              <span className="text-red-500">
                {errors["First Name"].message}
              </span>
            )}
          </div>
          {/* Last Name */}
          <div className="flex grow flex-col gap-1">
            <label
              htmlFor="lastName"
              className="text-md font-semibold text-slate-300"
            >
              Last name
            </label>
            <input
              {...register("Last Name", { required: "Last name is required" })}
              type="text"
              id="lastName"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["Last Name"] && (
              <span className="text-red-500">
                {errors["Last Name"].message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Age */}
          <div className="flex grow flex-col  gap-1">
            <label
              htmlFor="age"
              className="text-md font-semibold text-slate-300"
            >
              Age
            </label>
            <input
              {...register("Age", { required: "Age is required" })}
              type="number"
              id="age"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["Age"] && (
              <span className="text-red-500">{errors["Age"].message}</span>
            )}
          </div>
          {/* Phone Number */}
          <div className="flex grow flex-col  gap-1">
            <label
              htmlFor="phoneNumber"
              className="text-md font-semibold text-slate-300"
            >
              Phone Number
            </label>
            <input
              {...register("Phone Number", {
                required: "Phone number is required",
              })}
              type="number"
              id="phoneNumber"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["Phone Number"] && (
              <span className="text-red-500">
                {errors["Phone Number"].message}
              </span>
            )}
          </div>
        </div>
        {/* Email address */}
        <div className="flex grow flex-col  gap-1">
          <label
            htmlFor="email"
            className="text-md font-semibold text-slate-300"
          >
            Email address
          </label>
          <input
            {...register("Email Address", { required: "Email is required" })}
            type="email"
            id="email"
            className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
          />
          {errors["Email Address"] && (
            <span className="text-red-500">
              {errors["Email Address"].message}
            </span>
          )}
        </div>
        {/* Street address */}
        <div className="flex grow flex-col  gap-1">
          <label
            htmlFor="address"
            className="text-md font-semibold text-slate-300"
          >
            Street address
          </label>
          <input
            {...register("Street Address", {
              required: "Street address is required",
            })}
            type="text"
            id="address"
            className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
          />
          {errors["Street Address"] && (
            <span className="text-red-500">
              {errors["Street Address"].message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4  sm:grid-cols-3 ">
          {/* City */}
          <div className="flex  flex-col  gap-1">
            <label
              htmlFor="city"
              className="text-md font-semibold text-slate-300"
            >
              City
            </label>
            <input
              {...register("City", {
                required: "City is required",
              })}
              type="text"
              id="city"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["City"] && (
              <span className="text-red-500">{errors["City"].message}</span>
            )}
          </div>
          {/* State */}
          <div className="flex  flex-col  gap-1">
            <label
              htmlFor="state"
              className="text-md font-semibold text-slate-300"
            >
              State
            </label>
            <input
              {...register("State", {
                required: "State is required",
              })}
              type="text"
              id="state"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["State"] && (
              <span className="text-red-500">{errors["State"].message}</span>
            )}
          </div>
          {/* ZIP */}
          <div className="col-span-2 flex flex-col  gap-1  sm:col-span-1">
            <label
              htmlFor="postal"
              className="text-md font-semibold text-slate-300"
            >
              ZIP / Postal Code
            </label>
            <input
              {...register("Postal Code", {
                required: "Postal code is required",
              })}
              type="number"
              id="postal"
              className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-50 hover:border-slate-50"
            />
            {errors["Postal Code"] && (
              <span className="text-red-500">
                {errors["Postal Code"].message}
              </span>
            )}
          </div>
        </div>
        {/* Form actions */}
        <div className="mt-10 space-x-4 text-center">
          <button
            className="w-min rounded-md border px-3 py-1 text-left text-lg text-slate-50 transition-all duration-[300] hover:scale-105"
            type="submit"
          >
            Submit
          </button>
          <button
            className="w-min rounded-md border px-3 py-1 text-left text-lg text-slate-50 transition-all duration-[300] hover:scale-105"
            type="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
