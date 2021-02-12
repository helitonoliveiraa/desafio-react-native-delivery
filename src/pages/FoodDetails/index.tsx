import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

import formatValue from '../../utils/formatValue';
import { useTheme } from '../../context/index';

import api from '../../services/api';

import * as S from './styles';

interface Params {
  id: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  formattedPrice: string;
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const { currentTheme } = useTheme();

  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const { data } = await api.get<Food>(`/foods/${routeParams.id}`);

      const formattedData = {
        ...data,
        formattedPrice: formatValue(data.price),
      };

      const extraData = data.extras.map((extra: Extra) => ({
        ...extra,
        quantity: 0,
      }));

      setFood(formattedData);
      setExtras(extraData);
    }

    loadFood();
  }, [routeParams]);

  function handleIncrementExtra(id: number): void {
    const incrementedExtra = extras.map((extra: Extra) => {
      if (extra.id === id) {
        return {
          ...extra,
          quantity: extra.quantity + 1,
        };
      }

      return extra;
    });

    setExtras(incrementedExtra);
  }

  function handleDecrementExtra(id: number): void {
    const decrementedExtra = extras.map((extra: Extra) => {
      if (extra.id === id) {
        return {
          ...extra,
          quantity: extra.quantity >= 1 ? extra.quantity - 1 : extra.quantity,
        };
      }

      return extra;
    });

    setExtras(decrementedExtra);
  }

  function handleIncrementFood(): void {
    setFoodQuantity(foodQuantity + 1);
  }

  function handleDecrementFood(): void {
    if (foodQuantity === 1) return;

    setFoodQuantity(foodQuantity - 1);
  }

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      api.delete(`/favorites/${food.id}`);
    } else {
      api.post(`/favorites`, food);
    }

    setIsFavorite(!isFavorite);
  }, [isFavorite, food]);

  const cartTotal = useMemo(() => {
    const extraTotal = extras.reduce((accumulator, extra) => {
      return accumulator + extra.quantity * extra.value;
    }, 0);

    const foodTotal = food.price;

    return formatValue((foodTotal + extraTotal) * foodQuantity);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {}

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <S.LikeButton onPress={() => toggleFavorite()}>
          <MaterialIcon
            name={favoriteIconName}
            size={24}
            color={currentTheme.colors.secondary}
          />
        </S.LikeButton>
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite, currentTheme]);

  return (
    <S.Container>
      <S.Header />

      <S.ScrollContainer>
        <S.FoodsContainer>
          <S.Food>
            <S.FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </S.FoodImageContainer>
            <S.FoodContent>
              <S.FoodTitle>{food.name}</S.FoodTitle>
              <S.FoodDescription>{food.description}</S.FoodDescription>
              <S.FoodPricing>{food.formattedPrice}</S.FoodPricing>
            </S.FoodContent>
          </S.Food>
        </S.FoodsContainer>
        <S.AdditionalsContainer>
          <S.Title>Adicionais</S.Title>
          {extras.map(extra => (
            <S.AdittionalItem key={extra.id}>
              <S.AdittionalItemText>{extra.name}</S.AdittionalItemText>
              <S.AdittionalQuantity>
                <Icon
                  size={15}
                  color={currentTheme.colors.texts}
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                  testID={`decrement-extra-${extra.id}`}
                />
                <S.AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </S.AdittionalItemText>
                <Icon
                  size={15}
                  color={currentTheme.colors.texts}
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                  testID={`increment-extra-${extra.id}`}
                />
              </S.AdittionalQuantity>
            </S.AdittionalItem>
          ))}
        </S.AdditionalsContainer>
        <S.TotalContainer>
          <S.Title>Total do pedido</S.Title>
          <S.PriceButtonContainer>
            <S.TotalPrice testID="cart-total">{cartTotal}</S.TotalPrice>
            <S.QuantityContainer>
              <Icon
                size={15}
                color={currentTheme.colors.texts}
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <S.AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </S.AdittionalItemText>
              <Icon
                size={15}
                color={currentTheme.colors.texts}
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </S.QuantityContainer>
          </S.PriceButtonContainer>

          <S.FinishOrderButton onPress={() => handleFinishOrder()}>
            <S.ButtonText>Confirmar pedido</S.ButtonText>
            <S.IconContainer>
              <Icon
                name="check-square"
                size={24}
                color={currentTheme.colors.white}
              />
            </S.IconContainer>
          </S.FinishOrderButton>
        </S.TotalContainer>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default FoodDetails;
