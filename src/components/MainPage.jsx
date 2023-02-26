import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentComp from "./Admin/DepartmentComp";
import { getDepartments } from "../api/Departments";
import BeatLoader from "react-spinners/BeatLoader";

export default function MainPage() {
  const navigate = useNavigate();

  const [Departments, setDepartments] = useState();
  const [inputSearch, setinputSearch] = useState([]);

  useEffect(() => {
    alldepartments();
  }, [inputSearch]);

  const alldepartments = async () => {
    const Deps = await getDepartments();
    const data = Deps?.data?.filter((dep) => dep.name.includes(inputSearch));
    setDepartments(data);
    console.log(data);
  };
  
  return (
    <div className="flex justify-center ">
      <div className="w-4/5 flex flex-col justify-center items-center">
        <p className="text-4xl my-20 text-center text-gray-400 font-bold">
          Welcome To Our Website !
        </p>
        <input
          onChange={(e) => setinputSearch(e.target.value)}
          className="mb-20 p-4 py-10 outline-none font-bold placeholder:text-pink-300 m-6 w-full md:w-1/2 h-12 border-current border-4 border-solid border-gray-200 placeholder:text-center text-center rounded-md"
          type="text"
          placeholder="What would you like to search for?"
        />

        {Departments ? (
          <div className="flex flex-wrap">
            {Departments?.filter((dep) => {
              if (inputSearch === "") {
                return dep;
              } else if (dep.name.includes(inputSearch)) {
                return dep;
              }
            }).map((dep) => (
              <div
                key={dep._id}
                onClick={() => navigate(`${`/storelist/${dep.name}`}`)}
              >
                <DepartmentComp img={dep.image} text={dep.name} />
              </div>
            ))}
          </div>
        ) : (
          <BeatLoader
            color={"black"}
            loading={true}
            cssOverride={{
              display: "flex",
              justifyContent: "center",
              height: "30vh",
              alignItems: "center",
            }}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </div>
  );
}
