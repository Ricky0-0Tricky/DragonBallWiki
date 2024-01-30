import 'bootstrap/dist/css/bootstrap.min.css';

const Registo_Execute = async (username, email) => {
    // Cria uma String com o url da API
    let url = 'https://api.sheety.co/93e8e54c5fe88a74ad6071399fbec7b5/iw/user';

    // Cria um objeto com todos os dados necessários para o registo do utilizador
    let body = {
        user: {
            profileImage: 'https://i.ibb.co/dbyqP1g/unknown.png',
            username: username,
            email: email,
            admin: 0
        }
    };

    // Exclui o registo não tenha informação suficiente
    if (username.trim() === "" || email.trim() === "") {
        return false;
    } 

    // Tenta registar o utilizador 
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Registo Falhado
        if (!response.ok) {
            return false;
        }
        // Registo Sucedido
        return true;
    } catch (error) {
        return false;
    }
};

export default Registo_Execute;