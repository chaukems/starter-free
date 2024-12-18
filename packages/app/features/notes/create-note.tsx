import {
  useTheme, styled, Text, View, YStack, Separator, XStack,
  Button,
  H1,
  Label,
  Input,
  H2
} from "tamagui";
import { ChevronLeft, Save } from "@tamagui/lucide-icons";
import { useRouter } from "solito/navigation";
import { note } from "app/types/note";
import { useId, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _uniqueId from 'lodash/uniqueId';
import { useToastController } from "@my/ui";

export const CreateNoteScreen = () => {
  const router = useRouter()

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToastController()

  const addNote = async (note: note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);

    console.log("newNotes = ", newNotes);
    try {
      await AsyncStorage.setItem(`${note.id}`, JSON.stringify(note));
      console.log("note added");
      console.log("note added, note = ", AsyncStorage.getItem(`${note.id}`));

    } catch (e) {
      console.log("error adding note", e);
    }
  };

  return (
    <YStack
      f={1}
      jc="center"
      ai="center"
      gap="$8"
      p="$4"
      bg="$background"
      t="$6"
      pos="absolute"
      w="100%">
      <YStack gap="$4"> 
        <Text><H2 ta="center" col="$color12"> Personal Notes App - Create Note</H2></Text>
        <YStack padding="$3" minWidth={300} space="$4">
          <XStack alignItems="center" space="$4">
            <Label width={90} htmlFor="name">
              <Text>Title</Text>
            </Label>
            <Input flex={1} id="name" placeholder="title"
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
          </XStack>

          <XStack alignItems="center" space="$4">
            <Label width={90} htmlFor="name">
              <Text>Description</Text>
            </Label>
            <Input flex={1} id="notes-description" placeholder="description"
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </XStack>
        </YStack>
        <Separator />
        <XStack
          w="100%"
          gap="$6"
          jc="center"
          fw="wrap">
          <>
            <Button icon={ChevronLeft}
              onPress={() => { router.back() }}>
              Back
            </Button>
            <Button
              icon={Save}
              onPress={() => {
                addNote({
                  id: `@note-` + Math.random().toString(16).slice(-6),
                  title: title,
                  description: description
                })

                toast.show('Notes!', {
                  message: 'Note added successfully.',
                })

              }}>
              Add Note
            </Button>
          </>
        </XStack>
        <Separator />
      </YStack>
    </YStack>
  );
};
