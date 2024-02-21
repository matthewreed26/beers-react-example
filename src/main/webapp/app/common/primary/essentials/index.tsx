import { useState, useContext, useEffect } from 'react';
import AppContext from '../app/AppContext';
import { Essentials } from '@/common/domain/essential/Essentials';
import { Essential } from '@/common/domain/essential/Essential';
import { Button, Input } from '@nextui-org/react';

const EssentialsView = () => {
  const { essentials } = useContext(AppContext);
  const [essentialsList, setEssentialsList] = useState<Essential[]>([]);
  const [addEssential, setAddEssential] = useState<Essential>({ code: '', type: '' });

  const fetchData = async () => {
    setEssentialsList(await (essentials as () => Essentials)().list());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickedAddEssentialButton = async () => {
    if (addEssential.code && !essentialsList.find(e => e.code === addEssential.code)) {
      try {
        await (essentials as () => Essentials)().add(addEssential);
        setEssentialsList([...essentialsList, addEssential]);
        setAddEssential({ code: '', type: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!essentialsList?.length) {
    return <div data-testid="loading">Loading...</div>;
  }
  return (
    <div data-testid="essentials-list">
      {essentialsList.map(essential => (
        <div key={essential.code}>
          <b>Essential:</b> <span data-testid={'essential-' + essential.code}>{essential.type}</span>
        </div>
      ))}
      <label htmlFor="essential-add">Add a New Essential:</label>
      <Input
        isClearable
        fullWidth
        aria-label="essential-add"
        color="primary"
        size="sm"
        placeholder="Paper Towels"
        id="essential-add"
        type="text"
        onChange={(e: { target: { value: string } }) =>
          setAddEssential({ type: e.target.value, code: e.target.value.replace(/\s+/g, '-').toLowerCase() })
        }
        value={addEssential.type}
        data-testid="add-essential"
      ></Input>
      <Button onClick={clickedAddEssentialButton} data-testid="add-essential-button" variant="shadow">
        Add
      </Button>
    </div>
  );
};
export default EssentialsView;
