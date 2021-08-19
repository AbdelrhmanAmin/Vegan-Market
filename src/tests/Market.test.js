import Market from '../Components/Market';
import { screen, render, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../Reducers/index';
import '@testing-library/jest-dom/extend-expect';

describe('the product component', () => {
  const products = [{
    name: 'Beans',
    description: 'They are healthy, eat them!',
    price: 1,
    URL: '',
    id: 1
  },
  {
    name: 'Beans233',
    description: 'They are healthy, eat them!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!hey are healthy, eat them!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!LOREM IPSUM!',
    price: 2,
    URL: '',
    id: 2
  }]
  const cart = [{}]
  const user = { name: 'Abdo Ali' }
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Market loadingTest={false} productsTest={products} userTest={user} cart={cart} />
        </Router>
      </Provider>
    )
  })
  afterEach(() => cleanup)
  it('displays products grid', () => {
    expect(screen.getByTestId('p-grid')).toBeInTheDocument()
  })
  it('displays product name', () => {
    expect(screen.getAllByTestId('name')[0]).toHaveTextContent('Beans')
  })
  it('displays product price', () => {
    expect(screen.getAllByTestId('price')[0]).toHaveTextContent(1)
  })
  it('displays product img', () => {
    expect(screen.getAllByTestId('img')[0]).toBeInTheDocument()
  })
  it('displays product desc if less than 160 chars', () => {
    expect(screen.getByTestId('desc2')).toHaveTextContent('They are healthy, eat them!')
  })
  it('displays sliced product desc if greater than 160 chars', () => {
    expect(screen.getByTestId('desc1')).toHaveTextContent('READ MORE')
  })
  it('displays a popup modal when you click on readmore', () => {
    fireEvent.click(screen.getByTestId('read-more'))
    expect(screen.getByTestId('popup')).toBeInTheDocument()
  })
  it('removes a popup modal when you click on x btn', () => {
    fireEvent.click(screen.getByTestId('read-more'))
    fireEvent.click(screen.getByTestId('cancel'))
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument()
  })
  it('Add item to Cart and remove the add btn', async () => {
    fireEvent.click(screen.getByTestId('add-btn1'))
    await waitForElementToBeRemoved(() => screen.queryByTestId('add-btn1'))
    expect(screen.queryByTestId('add-btn1')).not.toBeInTheDocument()
  })
})