import { useState } from "react";
import { handleFieldObjectChange } from "./form-functions";

const LogInPage = () => {
    const [logIn, setLogIn] = useState({
        username: "",
        password: "",
    })
    const handleField = handleFieldObjectChange(logIn)(setLogIn)

    return(
        <form>
            <label htmlFor="username">User Name:</label>
            <input type="text" name="username" id="username"
            value={logIn.username}
            onChange={(e) => handleField(e)}
            ></input>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"
            value={logIn.password}
            onChange={(e) => handleField(e)}></input>
            <button type="submit" onSubmit={(e) => handleField(e)}>Log In</button>
        </form>
    )
}

export default LogInPage;