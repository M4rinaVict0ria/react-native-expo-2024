import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";

export default function List() {
  const [data, setData] = useState([]); // Lista de pagamentos
  const { getPayments, addPayment } = usePaymentsDatabase(); // Função de busca de pagamentos
  const [page, setPage] = useState(0); // Página atual
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [refreshing, setRefreshing] = useState(false); // Estado para pull-to-refresh
  const [hasMore, setHasMore] = useState(true); // Controle de paginação

  // Função para buscar dados
  async function fetchData(reset = false) {
    if (!hasMore && !reset) return;

    setLoading(true);
    try {
      const payments = await getPayments(reset ? 0 : page);

      // Verificar os dados recebidos
      console.log("Pagamentos recebidos: ", payments);

      if (reset) {
        setData(payments); // Substitui os dados no refresh
        setPage(1); // Reinicia a paginação
        setHasMore(payments.length >= 5);
      } else {
        if (payments.length < 5) setHasMore(false); // Define se tem mais itens
        setData((prevData) => [...prevData, ...payments]); // Adiciona novos itens
      }
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Efeito para buscar os dados inicialmente e quando a página mudar
  useEffect(() => {
    fetchData();
  }, [page]);

  // Função de recarregamento completo da lista (Pull-to-Refresh)
  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    fetchData(true); // Busca do zero
  };

  // Adicionar um novo pagamento e forçar a atualização da lista
  const addNewPayment = async (newPayment) => {
    try {
      await addPayment(newPayment); // Supondo que a função addPayment insira no banco de dados
      fetchData(true); // Força uma atualização da lista ao adicionar um novo pagamento
    } catch (error) {
      console.error("Erro ao adicionar pagamento:", error);
    }
  };

  // Renderiza cada item da lista
  const renderItem = ({ item }) => {
    if (!item) return null;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentName}>{item.nome || "Sem Nome"}</Text>
          <Text style={styles.paymentDate}>
            {formatDateToBrazilian(item.data_pagamento || new Date())}
          </Text>
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentReceipt}>
            Recibo: {item.numero_recibo || "N/A"}
          </Text>
          <Text style={styles.paymentAmount}>
            {formatCurrencyBRL(item.valor_pago || 0)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && data.length === 0 ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlashList
          data={data} // Dados da lista
          renderItem={renderItem} // Função de renderização
          estimatedItemSize={50} // Tamanho estimado dos itens
          onEndReached={() => setPage((prev) => prev + 1)} // Paginação
          onEndReachedThreshold={0.5} // Limite para carregar mais
          keyExtractor={(item) => item.id.toString()} // Chave única dos itens
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          } // Controle de pull-to-refresh
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Nenhum pagamento encontrado.</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paymentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paymentDate: {
    fontSize: 14,
    color: "#888",
  },
  paymentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentReceipt: {
    fontSize: 14,
    color: "#555",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});
