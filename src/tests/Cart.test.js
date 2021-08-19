import Cart from '../Components/Cart';
import { screen, render, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../Reducers/index';
import '@testing-library/jest-dom/extend-expect';

describe('the product component', () => {
  const cart = [{
    name: 'Beans',
    product_price: 1,
    id: 1,
    product_id: 1
  },
  {
    name: 'Beans233',
    product_price: 2,
    id: 2,
    product_id: 2,
  }]
  const products = [{
    URL: ''
  }, {
    URL: ''
  },
  {
    URL: ''
  }, {
    URL: ''
  }]
  const user = { name: 'Abdo Ali' }
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Cart loadingTest={false} cartTest={cart} userTest={user} productsTest={products} />
        </Router>
      </Provider>
    )
  })
  afterEach(() => cleanup)
  it('displays orders-container', () => {
    expect(screen.getByTestId('orders-container')).toBeInTheDocument()
  })
  it('displays order-container', () => {
    expect(screen.getByTestId('order-container1')).toBeInTheDocument()
  })
  it('displays order-name', () => {
    expect(screen.getByTestId('name1')).toBeInTheDocument()
  })
  it('displays order-price', () => {
    expect(screen.getByTestId('price1')).toBeInTheDocument()
  })
  it('displays orders total price', () => {
    expect(screen.getByTestId('total')).toHaveTextContent(3)
  })
  it('remove order and change total price', async () => {
    fireEvent.click(screen.getByTestId('remove1'))
    await waitForElementToBeRemoved(() => screen.getByTestId('order-container1'))
    expect(screen.queryByTestId('order-container1')).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent(2)
  })

})