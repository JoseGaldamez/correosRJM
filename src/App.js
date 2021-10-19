
import { useEffect } from 'react';
import './App.css';

import Contacto from './components/Contacto';



function App() {

  useEffect(() => {
    
    //setEmail(db);
    
  }, []);
/*   
  async function getCities(db) {

    const citiesCol = collection(db, 'emails');


    
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
    return cityList;

  } */

/*   async function setEmail(db) {

    const emailCol = collection(db, 'emails');

    await addDoc(emailCol, {"name":"Que tal"}).then(r => {
      console.log(r);
    });

  } */

  

  return (
    <div>
      <Contacto />
    </div>
  );
}

export default App;
