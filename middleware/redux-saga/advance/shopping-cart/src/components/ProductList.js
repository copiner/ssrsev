import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ProductItem from './ProductItem'

import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'


class ProductList extends Component {
  render() {
    const { products, addToCart } = this.props

    return (
      <div>
        <h3>Products</h3>
        {products.map(product =>
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => addToCart(product.id)} />
        )}
      </div>
    )
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

// export default connect(
//   state => ({ products: getVisibleProducts(state.products) }),
//   { addToCart }
// )(ProductList)


//mapDispatchToProps可以是一个Function，也可以是Object,作用是绑定action创建函数到props上

// 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作Redux action creator，
// 而且这个对象会与 Redux store绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。

// 如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，
// 这个函数通过 dispatch 函数与 action creator 以某种方式绑定在一起。
const mapStateToProps = state => ({ products: getVisibleProducts(state.products) })


//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，
//其中所定义的方法名将作为属性名，合并到组件的 props 中。
const mapDispatchToProps = {
  addToCart: addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
