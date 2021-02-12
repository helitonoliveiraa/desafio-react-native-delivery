import styled, { css } from 'styled-components/native';

const defaultTexts = css`
  ${({ theme }) => css`
    font-family: ${theme.fonts['Poppins-Regular']};
    font-style: normal;
    color: ${theme.colors.titles};
    font-weight: normal;
  `}
`;

const defaultFlex = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 40px 24px 20px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  ${defaultFlex};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  margin-top: -40px;
`;

export const FoodsContainer = styled.View`
  padding: 0 24px;
`;

export const Food = styled.View`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const FoodContent = styled.View`
  padding: 24px;
`;

export const FoodTitle = styled.Text`
  ${defaultTexts};
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
`;

export const FoodDescription = styled.Text`
  ${defaultTexts};
  font-size: 15px;
  line-height: 25px;
  margin-top: 8px;
`;

export const FoodPricing = styled.Text`
  ${defaultTexts};
  font-size: 24px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.texts};
  margin-top: 8px;
  font-weight: 600;
`;

export const Title = styled.Text`
  ${defaultTexts};
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`;

export const AdditionalsContainer = styled.View`
  padding: 0 24px;
  margin-top: 16px;
`;

export const AdittionalItem = styled.View`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 10px 15px;
  margin-top: 8px;
  ${defaultFlex};
`;

export const AdittionalItemText = styled.Text`
  ${defaultTexts};
  font-size: 15px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.texts};
`;

export const AdittionalQuantity = styled.View`
  ${defaultFlex};
  width: 105px;
`;

export const TotalContainer = styled.View`
  padding: 0 24px;
  margin-top: 20px;
`;

export const PriceButtonContainer = styled.View`
  ${defaultFlex};
  align-items: center;
`;

export const TotalPrice = styled.Text`
  ${defaultTexts};
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.positive};
  margin-top: 16px;
`;

export const QuantityContainer = styled.View`
  ${defaultFlex};
  align-items: center;
  width: 105px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 10px 15px;
  margin-top: 25px;
`;

export const FinishOrderButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.positive};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 26px;
`;

export const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
  text-align: center;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.positive};
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;
