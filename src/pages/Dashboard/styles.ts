import styled, { css } from 'styled-components/native';
import { lighten } from 'polished';
import { BorderlessButton } from 'react-native-gesture-handler';

interface CategoryItemProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 60px 24px 60px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleButton = styled(BorderlessButton)``;

export const FilterContainer = styled.View`
  padding: 0 24px;
  margin-top: -28px;
`;

const defaultTexts = css`
  ${({ theme }) => css`
    font-family: ${theme.fonts['Poppins-Regular']};
    font-style: normal;
    color: ${theme.colors.titles};
    font-weight: normal;
  `}
`;

export const Title = styled.Text`
  ${defaultTexts}
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  padding: 0 20px;
`;

export const CategoryContainer = styled.View`
  margin-top: 40px;
`;

export const CategorySlider = styled.ScrollView`
  margin-top: 16px;
`;

export const CategoryItem = styled.TouchableOpacity<CategoryItemProps>`
  ${({ theme, isSelected }) => css`
    background-color: ${theme.colors.backgroundCard};
    border: 2px;
    border-color: ${theme.colors.backgroundCard};
    height: 120px;
    width: 120px;
    border-radius: 8px;
    padding-top: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    ${isSelected &&
    css`
      border-color: ${theme.colors.negative};
      background-color: ${lighten(0.5, theme.colors.negative)};
    `}
  `}
`;

export const CategoryItemTitle = styled.Text`
  font-style: normal;
  color: ${({ theme }) => theme.colors.texts};
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
`;

export const FoodsContainer = styled.View`
  margin-top: 40px;
`;

export const FoodList = styled.View`
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
  background: #ffb84d;
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
  ${({ theme }) => css`
    font-family: ${theme.fonts['Poppins-Regular']};
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    color: ${theme.colors.titles};
  `}
`;
export const FoodDescription = styled.Text`
  ${defaultTexts}
  font-size: 10px;
  line-height: 16px;
  margin-top: 6px;
`;

export const FoodPricing = styled.Text`
  ${defaultTexts}
  font-size: 18px;
  line-height: 21px;
  margin-top: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.positive}; ;
`;
