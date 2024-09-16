// src/pages/Cart.js
import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from '../../redux/cartSlice'; 

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart); // Lấy danh sách sản phẩm từ Redux store

  const handleRemoveFromCart = productId => {
    dispatch(removeFromCart(productId));
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.Image}} style={styles.productImage} />
      <Text style={styles.productName}>Name: {item.Name}</Text>
      <Text style={styles.productPrice}>Price: {item.Price}</Text>
      <Button
        title="Remove from Cart"
        onPress={() => handleRemoveFromCart(item.id)}
        color="#E74C3C"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      {cartProducts.length > 0 ? (
        <FlatList
          data={cartProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.emptyMessage}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FDF2E9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8E44AD',
    textAlign: 'center',
    marginBottom: 16,
  },
  productContainer: {
    alignItems: 'center',
    backgroundColor: '#F39C12',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFEB3B',
    marginBottom: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#3498DB',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Cart;
