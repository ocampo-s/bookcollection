import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Redirectbutton = () => {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation('/addbook');
  };

  return <Button variant="outline-info" size='sm' onClick={handleClick}>ADD TITLE</Button>;
};

export default Redirectbutton;
