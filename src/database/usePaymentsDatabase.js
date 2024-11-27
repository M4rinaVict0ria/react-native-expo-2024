import { useSQLiteContext } from "expo-sqlite";

export function usePaymentsDatabase() {
  const database = useSQLiteContext();

  async function createPayment({
    user_id,
    user_cadastro,
    valor_pago,
    data_pagamento,
    observacao,
    numero_recibo, // Certifique-se de que o numero_recibo seja passado
  }) {
    // Verifica se numero_recibo está vazio e, caso esteja, atribui um valor padrão
    if (!numero_recibo) {
      numero_recibo = "SEM_NUMERO"; // ou qualquer valor padrão
    }

    const statment = await database.prepareAsync(`
      INSERT INTO payments (user_id, user_cadastro, valor_pago, data_pagamento, observacao, numero_recibo) 
      VALUES ($user_id, $user_cadastro, $valor_pago, $data_pagamento, $observacao, $numero_recibo)
    `);

    try {''
      const result = await statment.executeAsync({
        $user_id: user_id,
        $user_cadastro: user_cadastro,
        $valor_pago: valor_pago,
        $data_pagamento: data_pagamento,
        $observacao: observacao,
        $numero_recibo: numero_recibo, // Passando o numero_recibo para a consulta
      });
      const insertedID = result.lastInsertRowId.toString();
      return { insertedID };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await statment.finalizeAsync();
    }
  }

  async function getPayments(page) {
    try {
      const payments = await database.getAllAsync(
        `SELECT p.*, u.nome FROM payments p, users u WHERE u.id = p.user_id ORDER BY data_pagamento DESC LIMIT 5 OFFSET ${page * 5}`
      );
      return payments;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { createPayment, getPayments };
}
