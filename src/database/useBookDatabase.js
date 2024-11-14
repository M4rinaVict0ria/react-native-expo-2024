import { useSQLiteContext } from "expo-sqlite";

export function useBooksDatabase() {
  const database = useSQLiteContext();

  async function createBook({
    titulo,
    autor,
    descricao,
    capa,
    usuario_id,
    status_leitura,
  }) {
    const statement = await database.prepareAsync(`
      INSERT INTO books (titulo, autor, descricao, capa, usuario_id, status_leitura)
      VALUES ($titulo, $autor, $descricao, $capa, $usuario_id, $status_leitura)
    `);

    try {
      const result = await statement.executeAsync({
        $titulo: titulo,
        $autor: autor,
        $descricao: descricao,
        $capa: capa,
        $usuario_id: usuario_id,
        $status_leitura: status_leitura,
      });
      const insertedID = result.lastInsertRowId.toString();
      return { insertedID };
    } catch (error) {
      console.log("Error inserting book:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getBooksByUserId(usuario_id) {
    const statement = await database.prepareAsync(`
      SELECT * FROM books WHERE usuario_id = $usuario_id
    `);

    try {
      const result = await statement.executeAsync({ $usuario_id: usuario_id });
      return result.rows._array; // Retorna os livros encontrados
    } catch (error) {
      console.log("Error fetching books:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return { createBook, getBooksByUserId };
}
