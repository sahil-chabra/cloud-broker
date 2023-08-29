import { useState } from "react";
import { FormRow, Alert } from "../components/index";

import Wrapper from "../assests/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  region: "",
  cores: "",
  RAM: "",
  storage: "",
  cost: "",
  availability: "",
  bandwidth: "",
};

const UserForm = () => {
  const [values, setValues] = useState(initialState);
  const { showAlert, isLoading, displayAlert, submitUserRequirements } =
    useAppContext();

  const handleChange = (e) => {
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { region, cores, RAM, availability, bandwidth, cost, storage } =
      values;
    if (
      !region ||
      !cores ||
      !RAM ||
      !availability ||
      !cost ||
      !storage ||
      !bandwidth
    ) {
      displayAlert("danger", "Please provide all values!");
      return;
    }

    const userRequirements = {
      region,
      cores,
      RAM,
      availability,
      bandwidth,
      cost,
      storage,
    };

    submitUserRequirements(userRequirements);
  };

  return (
    <Wrapper>
      <Wrapper className="full-page">
        <form className="form" onSubmit={handleFormSubmit}>
          {showAlert && <Alert />}

          <h4>Enter your requirements</h4>

          <FormRow
            type="text"
            name="region"
            labelText="Region"
            value={values.region}
            onChange={handleChange}
          />

          <FormRow
            type="number"
            name="cores"
            labelText="Cores"
            value={values.cores}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="RAM"
            labelText="RAM"
            value={values.RAM}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="storage"
            labelText="Storage (in GB)"
            value={values.storage}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="cost"
            labelText="Cost (INR)"
            value={values.cost}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="availability"
            labelText="Availability (in %)"
            value={values.availability}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="bandwidth"
            labelText="Bandwidth"
            value={values.bandwidth}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            submit
          </button>
        </form>
      </Wrapper>
    </Wrapper>
  );
};
export default UserForm;
