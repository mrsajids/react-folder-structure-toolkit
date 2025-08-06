import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import { InputText } from "primereact/inputtext";

const PrimeReact = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(null);

  const search = (event) => {
    setItems([...Array(10).keys()].map((item) => event.query + "-" + item));
  };

  return (
    <>
      <h1>Prime controls</h1>
      <h5>AutoComplete</h5>
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
      />
      <br /> <br />
      <Calendar value={date} onChange={(e) => setDate(e.value)} />
      <br /> <br />
      <InputText value={value} onChange={(e) => setValue(e.target.value)} />
      <br /> <br />
      <InputText keyfilter="num" placeholder="Integers" />
    </>
  );
};
export default PrimeReact;
