import { useState, useContext, useEffect } from 'react';
import AppContext from '../app/AppContext';
import { Beers } from '@/common/domain/beer/Beers';
import { Beer } from '@/common/domain/beer/Beer';
import { Button, Input } from '@nextui-org/react';

const BeersView = () => {
  const { beers } = useContext(AppContext);
  const [beersList, setBeersList] = useState<Beer[]>([]);
  const [addBeer, setAddBeer] = useState<Beer>({ id: 0, name: '', abv: 0, ibu: 0, description: '' });

  const fetchData = async () => {
    setBeersList(await (beers as () => Beers)().list());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickedAddBeerButton = async () => {
    if (addBeer.id && !beersList.find(e => e.id === addBeer.id)) {
      try {
        await (beers as () => Beers)().add(addBeer);
        setBeersList([...beersList, addBeer]);
        setAddBeer({ id: '', type: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!beersList?.length) {
    return <div data-testid="loading">Loading...</div>;
  }
  return (
    <div data-testid="beers-list">
      {beersList.map(beer => (
        <div key={beer.id}>
          <b>Beer:</b> <span data-testid={'beer-' + beer.id}>{beer.description}</span>
        </div>
      ))}
      <label htmlFor="beer-add">Add a New Beer:</label>
      <Input
        isClearable
        fullWidth
        aria-label="beer-add"
        color="primary"
        size="sm"
        placeholder="Paper Towels"
        id="beer-add"
        type="text"
        onChange={(e: { target: { value: string } }) => setAddBeer({ name: e.target.value })}
        value={addBeer.description}
        data-testid="add-beer"
      ></Input>
      <Button onClick={clickedAddBeerButton} data-testid="add-beer-button" variant="shadow">
        Add
      </Button>
    </div>
  );
};
export default BeersView;
