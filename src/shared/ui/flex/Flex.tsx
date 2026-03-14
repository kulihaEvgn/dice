import { Stack, StackProps } from '@mui/material';

export interface IProps extends Omit<StackProps, 'direction'> {}

export const Flex = (props: IProps) => {
  return (
    <Stack direction={'row'} {...props}>
      {props.children}
    </Stack>
  );
};
