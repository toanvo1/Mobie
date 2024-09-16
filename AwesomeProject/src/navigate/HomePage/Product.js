import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from '../../redux/productSlice';
import {addProduct} from '../../redux/cartSlice';

const Product = ({username}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useSelector(state => state.products);
  console.log('Username:', username);

  const [newProduct, setNewProduct] = useState({
    id: '',
    Name: '',
    Price: '',
    Image: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    if (!newProduct.Name || !newProduct.Price || !newProduct.Image) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    dispatch(createProduct(newProduct));
    setNewProduct({id: '', Name: '', Price: '', Image: ''});
  };

  const handleUpdateProduct = () => {
    if (
      !newProduct.id ||
      !newProduct.Name ||
      !newProduct.Price ||
      !newProduct.Image
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    dispatch(editProduct(newProduct));
    setNewProduct({id: '', Name: '', Price: '', Image: ''});
  };

  const handleRemoveProduct = id => {
    dispatch(deleteProduct(id));
  };

  const handleAddToCart = product => {
    dispatch(addProduct(product));
    navigation.navigate('Cart');
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.Image}} style={styles.productImage} />
      <Text style={styles.productName}>{item.Name}</Text>
      <Text style={styles.productPrice}>{item.Price}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Update"
          onPress={() => {
            // Set product details in the form for update
            setNewProduct({
              id: item.id,
              Name: item.Name,
              Price: item.Price,
              Image: item.Image,
            });
          }}
          color="#3498DB"
        />
        <Button
          title="Remove"
          onPress={() => handleRemoveProduct(item.id)}
          color="#E74C3C"
        />
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.addToCartText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfume Collection</Text>
      <Text style={styles.welcomeText}>Hello, {username}!</Text>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Product ID"
          value={newProduct.id}
          onChangeText={text => setNewProduct(prev => ({...prev, id: text}))}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Name"
          value={newProduct.Name}
          onChangeText={text => setNewProduct(prev => ({...prev, Name: text}))}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={newProduct.Price}
          onChangeText={text => setNewProduct(prev => ({...prev, Price: text}))}
          style={styles.input}
        />
        <TextInput
          placeholder="Image URL"
          value={newProduct.Image}
          onChangeText={text => setNewProduct(prev => ({...prev, Image: text}))}
          style={styles.input}
        />
        <Button
          title="Add Product"
          onPress={handleAddProduct}
          color="#2ECC71"
        />
        <Button
          title="Update Product"
          onPress={handleUpdateProduct}
          color="#3498DB"
        />
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
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
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3498DB',
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    shadowColor: '#BDC3C7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#2ECC71',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: 24,
    color: '#FFF',
  },
});

export default Product;
