import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

export default function Payment() {
    const [valor, setValor] = useState("0,00");
    const [sugestoes, setSugestoes] = useState([
        {
            "id": 1,
            "nome": "Dory Dossantos"
          }, {
            "id": 2,
            "nome": "Emilia Jacquemard"
          }, {
            "id": 3,
            "nome": "Coop Nouch"
          }, {
            "id": 4,
            "nome": "Sollie Abrams"
          }, {
            "id": 5,
            "nome": "Verney Ridder"
          }, {
            "id": 6,
            "nome": "Tadeo Velareal"
          }, {
            "id": 7,
            "nome": "Sela Whittock"
          }, {
            "id": 8,
            "nome": "Moises Seyler"
          }, {
            "id": 9,
            "nome": "Ambrosio Lening"
          }, {
            "id": 10,
            "nome": "Donia Harvard"
          }, {
            "id": 11,
            "nome": "Gunilla Blasdale"
          }, {
            "id": 12,
            "nome": "Yancy Cleeve"
          }, {
            "id": 13,
            "nome": "Cassaundra Dunridge"
          }, {
            "id": 14,
            "nome": "Duky Champ"
          }, {
            "id": 15,
            "nome": "Benton Casbon"
          }, {
            "id": 16,
            "nome": "Corine Drayson"
          }, {
            "id": 17,
            "nome": "Pattin Castagna"
          }, {
            "id": 18,
            "nome": "Bryce Ede"
          }, {
            "id": 19,
            "nome": "Tucky Topaz"
          }, {
            "id": 20,
            "nome": "Debora Audiss"
          }, {
            "id": 21,
            "nome": "Hazlett Apedaile"
          }, {
            "id": 22,
            "nome": "Alejandrina Mold"
          }, {
            "id": 23,
            "nome": "Hermann Capini"
          }, {
            "id": 24,
            "nome": "Thornie Dibbin"
          }, {
            "id": 25,
            "nome": "Matthaeus Dawney"
          }, {
            "id": 26,
            "nome": "Chrissy Gaskin"
          }, {
            "id": 27,
            "nome": "Ermentrude Luney"
          }, {
            "id": 28,
            "nome": "Moe Kennet"
          }, {
            "id": 29,
            "nome": "Peadar Witul"
          }, {
            "id": 30,
            "nome": "Georgeanna Gillyett"
          }, {
            "id": 31,
            "nome": "Mattias McNevin"
          }, {
            "id": 32,
            "nome": "Cathrine Godsell"
          }, {
            "id": 33,
            "nome": "Nona Pemble"
          }, {
            "id": 34,
            "nome": "Tito McKilroe"
          }, {
            "id": 35,
            "nome": "Mufi Deathridge"
          }
  ]); 
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  return (
    <View style={styles.content}>
      <Text>Inserir Pagamentos</Text>
      <View style={styles.inputView}>
        <Ionicons name="wallet-outline" size={24} color="black" />
        <TextInput
          placeholder="Valor"
          keyboardType="decimal-pad"
          style={styles.inputValor}
          value={valor}
          onChangeText={setValor}
        />
      </View>
      <View style={styles.inputView}>
        <Picker
          selectedValue={id}
          onValueChange={(itemValue, index) => {
            setId(itemValue);
          }}
          style={{ width: "100%" }}
        >
          {sugestoes?.map((item) => {
            return (
              <Picker.Item key={item.id} label={item.nome} value={item.id} />
            );
          })}
        </Picker>
        </View>
      <View style={styles.inputView}>
        <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
          {data.toLocaleDateString().split("T")[0]}
        </Text>
        {viewCalendar && (
          <DateTimePicker
            value={data}
            onChange={handleCalendar}
            mode="date"
            testID="DateTimePicker"
          />
        )}
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Observações"
          style={styles.inputObservacao}
          value={observacao}
          onChangeText={setObservacao}
          multiline={true}
        />
      </View>
      <View style={styles.contentButtons}>
        <Button title="Salvar" />
        <Button title="Continuar" />
        <Button title="Cancelar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  contentButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
  },
  inputValor: {
    textAlign: "right",
    padding: 10,
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
  },
  inputObservacao: {
    fontSize: 16,
    flex: 1,
    lineHeight: 20,
  },
});
