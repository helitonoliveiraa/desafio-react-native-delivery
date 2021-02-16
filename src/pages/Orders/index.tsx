import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import * as S from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);
  const [isFoodVisible, setIsFoodVisible] = useState(false);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const { data } = await api.get<Food[]>('/orders');

      const formattedData = data.map(food => ({
        ...food,
        formattedPrice: formatValue(food.price),
      }));

      setOrders(formattedData);

      setTimeout(() => {
        setIsFoodVisible(true);
      }, 2000);
    }

    loadOrders();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Meus pedidos</S.HeaderTitle>
      </S.Header>

      <S.FoodsContainer>
        <S.FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <S.Food key={item.id} activeOpacity={0.6}>
              <S.FoodImageContainer>
                <ShimmerPlaceholder
                  style={styles.foodImg}
                  visible={isFoodVisible}
                >
                  <Image
                    style={{ width: 88, height: 88 }}
                    source={{ uri: item.thumbnail_url }}
                  />
                </ShimmerPlaceholder>
              </S.FoodImageContainer>
              <S.FoodContent>
                <ShimmerPlaceholder
                  style={styles.foodTitle}
                  visible={isFoodVisible}
                >
                  <S.FoodTitle>{item.name}</S.FoodTitle>
                </ShimmerPlaceholder>

                <ShimmerPlaceholder
                  style={styles.foodDescription}
                  visible={isFoodVisible}
                >
                  <S.FoodDescription>{item.description}</S.FoodDescription>
                </ShimmerPlaceholder>

                <ShimmerPlaceholder
                  style={styles.foodPrice}
                  visible={isFoodVisible}
                >
                  <S.FoodPricing>{item.formattedPrice}</S.FoodPricing>
                </ShimmerPlaceholder>
              </S.FoodContent>
            </S.Food>
          )}
        />
      </S.FoodsContainer>
    </S.Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  foodContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 16,
  },

  foodImg: {
    width: 88,
    height: 88,
    borderRadius: 40,
    zIndex: 5,
  },

  foodTitle: {
    width: 150,
  },

  foodDescription: {
    width: 200,
    marginTop: 2,
  },

  foodPrice: {
    width: 80,
    marginTop: 2,
  },
});
