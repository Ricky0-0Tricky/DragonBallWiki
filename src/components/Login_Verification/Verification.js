import 'bootstrap/dist/css/bootstrap.min.css';

const Verification = async (username, email) => {
    const url = `https://api.sheety.co/93e8e54c5fe88a74ad6071399fbec7b5/iw/user?filter[email]=${email}&filter[username]=${username}`;

    try {
        const response = await fetch(url);
        const json = await response.json();

        if (json && Array.isArray(json.user) && json.user.length > 0 && username.trim() !== "" && email.trim() !== "") {
            // Rejeita com um erro a indicar a existência do user ou violação das condições definidas
            throw new Error("UserExists");
        } else {
            // Resolve com uma string a indicar a inexistência do user
            return "UserNotFound";
        }
    } catch (error) {
        // Rejeita com um erro a indicar um erro no fetch da API
        throw new Error("UserExists");
    }
};

export default Verification;