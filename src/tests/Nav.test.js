import Nav from '../Components/Nav';
import { screen, render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../Reducers/index';
import '@testing-library/jest-dom/extend-expect';


describe('the nav component', () => {
  const user = { name: 'Abdo Ali' }
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Nav userTest={user} />
        </Router>
      </Provider>
    )
  })
  afterEach(() => cleanup)
  it('display logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
  it('display user-img', () => {
    expect(screen.getByTestId('user-img')).toBeInTheDocument()
  })
  it('display username, if the full name provided it displays the last name only.', () => {
    expect(screen.getByTestId('username')).toHaveTextContent('Ali')
  })
  it('display market icon', () => {
    expect(screen.getByTestId('market')).toBeInTheDocument()
  })
  it('display logout icon', () => {
    expect(screen.getByTestId('logout')).toBeInTheDocument()
  })
})