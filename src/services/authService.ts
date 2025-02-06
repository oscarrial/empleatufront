const URL_BASE = 'http://localhost:3000/api/'
export const loginUser = async (email: string, password: string) => {
    try{
        const response = await fetch(URL_BASE + 'auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {email, password} ),
                credentials: 'include'
            }
        )
        if(!response.ok){
            throw new Error('Error al iniciar sesión')
        }
        return await response.json()

    }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}