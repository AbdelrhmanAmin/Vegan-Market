import Product from '../Components/Product';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('the product component', () => {
  const product = {
    name: 'Beans',
    description: 'They are healthy, eat them!',
    price: 1,
    URL: ''
  }
  beforeEach(() => {
    render(<Product product={product} />)
  })
  afterAll(cleanup)
  it('displays a popup modal', () => {
    expect(screen.getByTestId('popup')).toBeInTheDocument()
  })
  it('displays a popup modal img', () => {
    expect(screen.getByTestId('IMG')).toBeInTheDocument()
  })
  it('displays a popup modal exit btn', () => {
    const btn = screen.getByTestId('cancel')
    expect(btn).toBeInTheDocument()
  })
  it('displays a popup modal product name', () => {
    expect(screen.getByTestId('product-name')).toBeInTheDocument()
  })
  it('displays a popup modal product description', () => {
    expect(screen.getByTestId('product-desc')).toBeInTheDocument()
  })
})