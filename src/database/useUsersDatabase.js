import { useSQLiteContext } from "expo-sqlite";

export function useUserDatabase(){
  const database = useSQLiteContext();

async function authUser({email, password}) {
    console.log ("authUser email: ", email, " - password: ", password);
    try {
       const result = await database.getFirstAsync(`
        SELECT id, nome, email, role FROM users where email='${email}' and senha='${password}';
    `);
    return result 
    } catch (error) {
        console.error("useUserDatabase authUser error: ", error)
        throw error;
    }
    
}
   return {
    authUser, 
   };
}

