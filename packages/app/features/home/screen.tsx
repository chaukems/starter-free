import {
  Button,
  Paragraph,
  XStack,
  YStack,
  H2,
  Separator,
  SwitchThemeButton,
  View,
} from '@my/ui'
import { useState } from 'react'
import { useLink } from 'solito/navigation'
import { NotesScreen } from '../notes/notes-screen'

export function HomeScreen() {

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
        <H2 ta="center" col="$color12"> Personal Notes App </H2>
        <Separator />
        <NotesScreen />
      </YStack>
    </YStack>
  )
}



