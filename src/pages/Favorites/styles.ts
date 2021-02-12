import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
}

const defaultTexts = css`
  ${({ theme }) => css`
    font-family: ${theme.fonts['Poppins-Regular']};
    font-style: normal;
    color: ${theme.colors.titles};
    font-weight: normal;
  `}
`;

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 60px 24px 60px;
  background: ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  ${defaultTexts};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export const FoodsContainer = styled.View`
  flex: 1;
  margin-top: -60px;
`;

export const FoodList = styled(FlatList as new () => FlatList<Food>)`
  flex: 1;
  padding: 0 20px;

  margin-top: 16px;
`;

export const Food = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 8px;

  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: ${({ theme }) => theme.colors.secondary};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 16px;

  height: 100%;
`;

export const FoodContent = styled.View`
  flex: 1;

  padding: 16px;
`;
export const FoodTitle = styled.Text`
  ${defaultTexts};
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
`;
export const FoodDescription = styled.Text`
  ${defaultTexts};
  font-size: 10px;
  line-height: 16px;

  margin-top: 6px;
`;

export const FoodPricing = styled.Text`
  ${defaultTexts};

  font-size: 18px;
  line-height: 21px;

  margin-top: 8px;

  font-weight: 600;

  color: ${({ theme }) => theme.colors.positive};
`;
