import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, isFocused }) => css`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: ${theme.colors.backgroundCard};
    border-radius: 10px;
    border-width: 2px;
    border-color: ${isFocused
      ? theme.colors.negative
      : theme.colors.backgroundCard};
    flex-direction: row;
    align-items: center;
  `}
`;

export const TextInput = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    color: ${theme.colors.texts};
    font-size: 16px;
    font-family: ${theme.fonts['Poppins-Regular']};
  `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
