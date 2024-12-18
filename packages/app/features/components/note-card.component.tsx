import { Bold, MoveRight } from "@tamagui/lucide-icons";
import {
  Button, Card, Paragraph, useTheme, Separator,
  styled, View, XStack, H1,
  Adapt,
  Dialog,
  Fieldset,
  Input,
  Label,
  Sheet,
  TooltipSimple,
  Unspaced,
  Text,
} from "tamagui";

import { X } from '@tamagui/lucide-icons'


const Highlight = styled(View, {
  color: 'tomato',
})

export const NoteCard = ({ title, description, date, keyword }) => {
  const theme = useTheme();
  return (
    <Card elevate size="$4"
      style={{
        backgroundColor: '#cdbcbc',
        width: '100%',
        maxWidth: '100%',
      }}>
      <Card.Header style={{
        fontSize: 18,
        color: "#fff",
        backgroundColor: '#32efas',
      }}>
        <Paragraph
          style={{ fontSize: 20, fontWeight: Bold, color: "#000", width: '100%', font: "inherit" }}>
          <Text>{title}</Text>
        </Paragraph>
        <Separator />

        <Paragraph style={{ fontSize: 10, color: 'tomato', }}>
        <Text style={{ float: 'right', }}>{date}</Text>
        </Paragraph>

        <Paragraph
          style={{ fontSize: 14, color: "#000", }}
        ><Text>{description}</Text>
        </Paragraph>
        <Separator />
      </Card.Header>

      <Card.Footer padded>
        <XStack flex={1} />
        <Dialog modal>
          <Dialog.Trigger asChild>
            <Button borderRadius="$10">Edit</Button>
          </Dialog.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
              <Sheet.Frame padding="$4" gap="$4">
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              animation="slow"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}/>

            <Dialog.Content
              bordered
              elevate
              key="content"
              animateOnly={['transform', 'opacity']}
              animation={['quicker',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              gap="$4">
              <Dialog.Title>Edit Note</Dialog.Title>
              <Fieldset gap="$4" horizontal>
                <Label width={130} justifyContent="flex-end" htmlFor="name">
                  <Text>Title</Text>
                </Label>
                <Input flex={1} id="name" defaultValue={title} />
              </Fieldset>
              <Fieldset gap="$4" horizontal>
                <Label width={130} justifyContent="flex-end" htmlFor="username">
                  <TooltipSimple label="Pick your favorite" placement="bottom-start">
                    <Paragraph>
                     <Text>Description</Text>
                    </Paragraph>
                  </TooltipSimple>
                </Label>
                <Input flex={1} id="description" defaultValue={description} />
              </Fieldset>

              <XStack alignSelf="flex-end" gap="$4">
                <Dialog.Close displayWhenAdapted asChild>
                  <Button theme="active" aria-label="Close">
                    Save changes
                  </Button>
                </Dialog.Close>
              </XStack>

              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                    icon={X}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </Card.Footer>
    </Card>
  );
};