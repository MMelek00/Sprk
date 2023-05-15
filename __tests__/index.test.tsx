import { render, screen } from '@testing-library/react';
import Home from '@/pages';
import '@testing-library/jest-dom';

describe('Home', () => {
  const renderComponent = () => {
     return render(<Home />)
   }
  it('renders a Barcode Scanner', () => {
    renderComponent()
 
    const heading = screen.getByRole('heading', {
      name: /Barcode Scanner/i,
    });
 
    expect(heading).toBeInTheDocument();
    const button = screen.getByRole('button', {
      name: /Start Scanner/i,
    });
 
    expect(button).toBeInTheDocument();
  });
  //TODO: Cover ALL scenarios for Scanner component
});