import { useToyStore } from '../../data/toyStore.js';

const EditToy = () => {
  const { editToy, handleInputChange, handleSaveClick } = useToyStore();

  if (!editToy) {
    return <p>Ingen leksak vald för redigering.</p>;
  }

  return (
    <div className="edit-toy-container">
    
    </div>
  );
};

export default EditToy;