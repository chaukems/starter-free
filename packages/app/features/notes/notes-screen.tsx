import { Separator, styled, XStack, Button, YStack, Input, H1, Label, SwitchThemeButton } from '@my/ui'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { Eye, Search } from '@tamagui/lucide-icons'
import { useLink, useRouter } from 'solito/navigation'
import { NoteCard } from '../components/note-card.component'

export function NotesScreen() {

  const linkTarget = '/notes/create-note'
  const linkProps = useLink({
    href: `${linkTarget}`
  })

  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentDate, setCurrentDate] = useState(getDate());

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const fetchAllNotes = async (searchValue: string) => {
    try {
      const allNotes: any = [];

      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];

            if (value.includes(searchValue)) {
              allNotes.push(JSON.parse(value))
            }
          });
        });
      });

      setNotes(allNotes)
      console.log(notes)

    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = useCallback((searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    setSubmittedKeyword(searchKeyword);
    if (searchKeyword != '') {
      fetchAllNotes(searchKeyword);
    }

  }, []);

  useEffect(() => {
    fetchAllNotes('@note-');
  }, []);


  return (
    <YStack
      f={1}
      jc="center"
      gap="$4"
      p="$4"
      bg="$background"
      t="$8"
      w="100%">

<YStack  maxWidth='100%'
          w="100%" space="$4" gap="$4">
          <XStack alignItems="center" space="$4">
            <Button {...linkProps}>Create Note</Button>
            <Button
              noTextWrap
              tag="span"
              iconAfter={<Search size={'$2'} />}

              onPress={() => {
                onSearch(searchKeyword);
              }} >
              <Input
                borderWidth={'$0'}
                placeholder="Search notes"
                fontWeight={'$2'}
                value={searchKeyword}
                onChangeText={(text) => {
                  setSearchKeyword(text);
                }}
              />
            </Button>
          </XStack>

          <YStack maxWidth='100%' width="100%">
              <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <><NoteCard title={item.title} description={item.description}
                    date={currentDate} keyword={item.title}>
                  </NoteCard><div style={styles.spacer}></div></>
                )}
              />
          </YStack>
        </YStack>
    </YStack >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 25,
    fontStyle: 'italic',
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#636e72",
    color: "white",
    padding: 10,
  },
  noteSelectedIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 999,
  },

  spacer: {
    fontSize: 20,
    height: 15
  },
})

