import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.setItem("token");

  const handleClick = () => {
    const optn = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    };

    fetch(
      "https://3000-blue-felidae-jdc3rizy.ws-us25.gitpod.io/api/token",
      optn
    )
      .then(resp => {
        if (resp.status === 200) return resp.json();
        else alert("there has been an error");
      })
      .then(data =>{
		  sessionStorage.setItem("token", data.access_token);
	  })
      .catch((error) => {
        console.error("THERE WAS AN ERROR!!!", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
	  {(token && token!="" && token!=undefined) ? ("You are logged in with this token" + token) :
	  
	<div>
	  <input
		type="text"
		placeholder="Email"
		value={email}
		onChange={(e) => setEmail(e.target.value)}
	  />
	  <input
		type="password"
		placeholder="Password"
		value={password}
		onChange={(e) => setPassword(e.target.value)}
	  />
	  <button onClick={handleClick}>Login</button>
	</div>
	
	}
    </div>
  );
};
