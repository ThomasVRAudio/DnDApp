import { View, TextInput, StyleSheet, Modal, Text } from "react-native";
import Colors from "../../styles/Colors";
import { useEffect, useState } from "react";
import { SpellData } from "../DataInterfaces";
import LocalSpells from "../LocalSpells";

interface Props {
  setModal: (updateModel: boolean) => void;
  saveSpell: (spellData: SpellData) => void;
}

interface api {
  results: SpellData[];
}

const AddSpellModal = (props: Props) => {
  const [apiData, setApiData] = useState<api | null>(null);
  const [search, setSearch] = useState<string>("");
  const [chosenSearch, setChosenSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<string[] | null>(null);

  const URL: string = `https://www.dnd5eapi.co/api/spells/`;

  useEffect(() => {
    FillAPIDataAtStart();
  }, []);

  function FillAPIDataAtStart() {
    fetch(`${URL}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (!json.error) {
          setApiData(json);
        }
      })
      .catch((error) => console.error(error));
  }

  function ConfirmSearch() {
    props.setModal(false);

    if (!chosenSearch) return;

    let localSearch: SpellData | undefined = LocalSpells.find(
      (data) => data.name === chosenSearch
    );

    if (localSearch) {
      props.saveSpell(localSearch);
      return;
    }

    let searchTerm: string = chosenSearch
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/'/g, "-")
      .replace(/,/g, "");

    fetch(`${URL}${searchTerm}`)
      .then((resp) => resp.json())
      .then((json: SpellData) => {
        if (json && !json.error) {
          //let updatedSpellList = props.spell ? [...props.spell, json] : [json];
          props.saveSpell(json);
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    UpdateSearches();
  }, [search]);

  function UpdateSearches() {
    if (!apiData) return;

    if (search.length === 0) {
      setSearchList([]);
      return;
    }

    let term: string = search.toLowerCase().trimEnd();

    let itemList: string[] = [];

    let localFilteredItems: SpellData[] = LocalSpells.filter((item) => {
      return item.name.toLocaleLowerCase().startsWith(`${term}`);
    });

    let filteredItems: SpellData[] = apiData.results.filter((item) => {
      return item.name.toLocaleLowerCase().startsWith(`${term}`);
    });

    if (!filteredItems && !localFilteredItems) {
      setSearchList([]);
      return;
    }

    let maxItems = 3;

    for (let index = 0; index < localFilteredItems.length; index++) {
      if (index >= 3) break;
      maxItems -= 1;
      itemList.push(localFilteredItems[index].name);
    }

    for (let index = 0; index < filteredItems.length; index++) {
      if (index >= 3 || maxItems === 0) break;
      maxItems -= 1;
      itemList.push(filteredItems[index].name);
    }
    setSearchList(itemList);
    setChosenSearch(itemList[0]);
  }

  return (
    <View style={styles.container}>
      <Modal transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder={"Acid Arrow"}
              placeholderTextColor="grey"
              onSubmitEditing={() => {
                ConfirmSearch();
              }}
              onChangeText={(newText) => {
                setSearch(newText);
              }}
            ></TextInput>
            {searchList === null || searchList?.length === 0 ? (
              <View></View>
            ) : (
              <View style={styles.line}></View>
            )}
            {searchList?.map((item, index) => (
              <Text
                key={index}
                style={
                  index === 0 ? styles.firstSearchResult : styles.searchResult
                }
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddSpellModal;

const styles = StyleSheet.create({
  container: {},
  suggestion: { fontFamily: "Regular" },
  searchContainer: {
    backgroundColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: Colors.primary,
    width: "60%",
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    opacity: 1,
  },
  input: {
    fontFamily: "Regular",
  },
  searchResult: {
    fontFamily: "Regular",
    paddingBottom: 5,
  },
  firstSearchResult: {
    color: Colors.secundary,
    fontFamily: "Bold",
    marginTop: 10,
    paddingBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
  },
});
