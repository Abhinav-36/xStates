import { useEffect ,useState} from 'react';
import styles from './CountryStates.module.css';

export default function Forms() {
  const [data, setData] = useState({
    countries: [],
    states: [],
    cities: []
  });
  const [selectCountry,setCountry] = useState("");
  const [selectState,setState] = useState("");
  const [selectCity,setCity] = useState("");


  useEffect(  () =>  {
    let url = 'https://crio-location-selector.onrender.com/countries';
    fetch(url).then(jsondata => jsondata.json()).then((resdata) => {setData({...data,countries: resdata});}).catch(error => console.error("Error fetching countries:",error))
  }, []);

  useEffect(  () =>  {
    let url = `https://crio-location-selector.onrender.com/country=${selectCountry}/states`
    if(selectCountry){
    fetch(url).then(jsondata => jsondata.json()).then(
      (resdata) => {
        setData({...data,states: resdata});
        selectState("");
        setData({...data,cities: []});
        selectCity("")
      }).catch(
        error => 
          console.error("Error fetching states:",error))
    }
  }, [selectCountry]);

  useEffect(  () =>  {
    let url = `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`;
    if(selectState){
    fetch(url).then(jsondata => jsondata.json()).then(
      (resdata) => {
        setData({...data,cities: resdata});
        selectCountry("");
      })
        .catch(
          error => console.error("Error fetching cities:",error))
    }
  }, [selectState]);


 

  return (
    <form className={styles['forms']}>
      <h1>Select Location</h1>
      <div className={styles['forms-container']}>
      <select className={styles['select']} value={selectCountry} onChange={e => setCountry(e.target.value)}>
        <option value=""  disabled>Select Country</option>
        {
          data.countries.map((country) => (
            <option key={country} value={country} >{country}</option>
          ))
        }
      </select>
      <select className={styles['select']} disabled={!selectCountry} value={selectState} onChange={e => setState(e.target.value)}>
        <option value=""  disabled>Select State</option>
        {
          data.states.map((state) => (
            <option key={state} value={state} >{state}</option>
          ))
        }
      </select>
      <select className={styles['select']} disabled={!selectState} value={selectCity} onChange={e => setCity(e.target.value)}>
        <option value=""  disabled>Select City</option>
        {
          data.cities.map((city) => (
            <option key={city} value={city} >{city}</option>
          ))
        }
      </select>
      </div>
      {selectCity && (
        <h2 className={styles.text}>
          You selected <span className={styles.highlight}>{selectCity}</span>,
          <span className={styles.light}>
            {" "}
            {selectState}, {selectCountry}
          </span>
        </h2>
      )}
    </form>
  );
}
