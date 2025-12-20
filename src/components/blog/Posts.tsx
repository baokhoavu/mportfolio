import { Column, Text } from "@once-ui-system/core";

interface PostsProps {
  range?: [number, number];
  columns?: string;
}

export function Posts({ range, columns }: PostsProps) {
  return (
    <Column fillWidth horizontal="center" padding="24">
      <Text variant="body-default-l" onBackground="neutral-weak">
        Blog posts coming soon...
      </Text>
    </Column>
  );
}