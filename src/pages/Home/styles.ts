import { lighten, shade } from 'polished';
import styled, { css } from 'styled-components/native';

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  padding: 40px 40px 0;
  justify-content: space-around;
`;

export const Container = styled.View``;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 50px;
    color: ${theme.colors.white};
    margin-top: 80px;
    width: 250px;
    font-family: ${theme.fonts['Poppins-Regular']};
  `}
`;

export const NavigationButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: ${({ theme }) => shade(0.4, theme.colors.negative)};
  flex: 1;
  text-align: center;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => lighten(0.1, theme.colors.secondary)};
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;
