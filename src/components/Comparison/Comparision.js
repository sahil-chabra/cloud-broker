import React, { useState } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useAppContext } from "../../context/appContext";
const providers = [
  {
    id: 1,
    csp: "AWS",
    tos: "Storage",
    cpu: 5,
    ram: 10,
    storage: 100,
    budget: 10000,
    priceModal: "pay-as-you-go",
    dc_location: "Lucknow",
    os: "linux",
    api_comp: "yes",
    data_encrypt: "yes",
    transport_encrypt: "no",
    url: "https://aws.amazon.com/",
  },
  {
    id: 2,
    csp: "Azure",
    tos: "Storage",
    cpu: 5,
    ram: 6,
    storage: 200,
    budget: 10000,
    priceModal: "pay-as-you-go",
    dc_location: "Indore",
    os: "linux",
    api_comp: "yes",
    data_encrypt: "yes",
    transport_encrypt: "no",
    url: "https://azure.microsoft.com/en-us/",
  },
  {
    id: 3,
    csp: "IBM",
    tos: "Computing",
    cpu: 5,
    ram: 5,
    storage: 10,
    budget: 100,
    priceModal: "pay-as-you-go",
    dc_location: "Indore",
    os: "windows",
    api_comp: "yes",
    data_encrypt: "yes",
    transport_encrypt: "no",
    url: "https://www.ibm.com/cloud",
  },
  {
    id: 4,
    csp: "Google",
    tos: "Computing",
    cpu: 5,
    ram: 5,
    storage: 10,
    budget: 100,
    priceModal: "pay-as-you-go",
    dc_location: "Indore",
    os: "windows",
    api_comp: "yes",
    data_encrypt: "yes",
    transport_encrypt: "no",
    url: "https://cloud.google.com/?hl=en",
  },
];
export default function Comparision() {
  // const { userReq } = useAppContext();
  // const [data, setData] = useState(userReq);
  // console.log(data);

  return (
    <div
      style={{
        height: "100%",
        background: "#101522",
        paddingTop: "8rem",
        paddingBottom: "2rem",
        width: "100vw",
      }}
    >
      <MDBContainer className="py-5 text-center shadow-4-strong bg-light rounded-6">
        <MDBTable
          responsive
          striped
          className="text-successtable-border border-light "
        >
          <MDBTableHead className="border-light">
            <tr>
              <th scope="col"></th>
              {providers.map((prv, index) => {
                return (
                  <th scope="col" key={index} style={{ fontSize: "1.5rem" }}>
                    <strong>{prv.csp}</strong>
                  </th>
                );
              })}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <th scope="row">TOS</th>
              {providers.map((prv, index) => {
                // console.log(prv.tos + " " + data.tos);
                // const checked = prv.tos === data.tos;
                return <td>{prv.tos}</td>;
              })}
            </tr>
            <tr>
              <th scope="row">CPU</th>
              {providers.map((prv, index) => {
                // const checked = prv.cpu >= +data.cpu;
                return <td>{prv.cpu}</td>;
              })}
            </tr>
            <tr>
              <th scope="row">RAM</th>
              {providers.map((prv, index) => {
                // const checked = prv.ram >= +data.ram;
                return <td>{prv.ram}</td>;
              })}
            </tr>
            <tr>
              <th scope="row">Storage</th>
              {providers.map((prv, index) => {
                // const checked = prv.storage >= +data.storage;
                return <td>{prv.storage}</td>;
              })}
            </tr>
            <tr>
              <th scope="row">Budget</th>
              {providers.map((prv, index) => {
                // const checked = prv.budget <= +data.budget;
                return <td>{prv.budget}</td>;
              })}
            </tr>
            <tr>
              <th scope="row">Price Model</th>
              {providers.map((prv, index) => {
                return <td>{prv.priceModal}</td>;
              })}
            </tr>
            <tr>
              <th></th>
              {providers.map((prv, index) => {
                return (
                  <th key={index}>
                    <MDBBtn href={prv.url} target="_blank">
                      Buy Now
                    </MDBBtn>
                  </th>
                );
              })}
            </tr>
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </div>
  );
}
