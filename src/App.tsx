import React from 'react';
import './App.scss';
import RadioButton from './components/atoms/radioButton/RadioButton';
import Checkbox from './components/atoms/checkbox/Checkbox';
import ProductCard from './components/organisms/productCard/ProductCard';
import ContainedButton from './components/atoms/containedButton/ContainedButton';
import OutlinedButton from './components/atoms/outlinedButton/OutlinedButton';
import Search from './components/atoms/search/Search';
import Button from './components/molecules/button/Button';
import TextInput from './components/atoms/textInput/TextInput';
import DropDown, { DropDownOption } from './components/molecules/dropdown/DropDown';
import Filters, { FilterOption } from './components/organisms/filters/Filters';
import { SyntheticEvent } from 'react';


const DROPDOWN_OPTIONS: DropDownOption[] = [{label: 'english', value: 'English'} , {label: 'spanish',
value: 'Spanish'}, {label: 'russian', value: 'Russian'}];

const FILTER_OPTIONS: FilterOption[] = [{label: 'TShirt', value: false, number: 245}, 
{label: 'Trouser', value: false, number: 105},
{label: 'Jacker', value: false, number: 65},
{label: 'Kurtas', value: false, number: 188}, ]


function App (): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        TEAM N3-ETA
        <RadioButton id="male" name="gender" value="male" label="Male" />
        <RadioButton id="female" name="gender" value="female" label="Female" />

        <Checkbox id="car" name="mazda" value="mazda" label="Mazda" onChange={(value: boolean) => console.log('Checked: ', value)} />

        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPrice={20} /> 
        
        <ContainedButton primary label="Add To Cart" onClick={() => {console.log('clicked')}} />

        <OutlinedButton  secondary label="Buy Now" onClick={() => {console.log('clicked')}} />

        <Button type="contained" secondary label="PLACE ORDER" onClick={() => {console.log('clicked')}} />

        <Search placeholder="Search Here..." onEnterPress={(event: SyntheticEvent) => {console.log(event)}}/>
        <TextInput placeholder="Name" onChangeText={(value: string) => {console.log(value)}}/>


        <DropDown onSelect={(event: SyntheticEvent) => {console.log('Selected', (event.target as HTMLSelectElement).value)}} options={DROPDOWN_OPTIONS}/>
         <Filters  options={FILTER_OPTIONS} onSelect={(filterOptions: FilterOption[]) => console.log('Updated Filter Options: ', filterOptions)} label="Categories"/>
      </header>
   
    </div>
  );
}

export default App;
