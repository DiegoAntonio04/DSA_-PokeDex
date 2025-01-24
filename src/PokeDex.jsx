import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function Login() {
  const initialFormData = {
    name: '',
    age: '',
    email: '',
    favoritePokemon: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted] = useState(false);

  const pokemonList = [
    'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard',
    'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle',
    'Kakuna', 'Beedrill' , 'Pidgey','Pidgeotto','Pidgeot' ,'Rattata' ,'Raticate' ,'Spearow',
    'Fearow', 'Ekans' ,'Arbok','Pikachu', 'Raichu', 'Sandshrew','Sandslash','Nidorina',
    'Nidoqueen','Nidoran','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff',
    'Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth',
    'Diglett', 'Dugtrio','Meowth','Persian','Psyduck','Golduck', 'Mankey','Primeape','Growlithe','Arcanine',
    'Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout',
    'Weepinbell', 'Victreebel','Tentacool','Tentacruel', 'Geodude', 'Graveler','Golem','Ponyta','Rapidash',
    'Slowpoke','Slowbro','Magnemite','Magneton','Farfetch’d','Doduo','Dodrio','Seel','Dewgong','Grimer',
    'Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler',
    'Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung',
    'Koffing','Weezing', 'Rhyhorn','Rhydon','Chansey','Tangela', 'Kangaskhan','Horsea','Seadra' ,'Goldeen',
    'Seaking', 'Staryu', 'Starmie' , 'Mr. Mime', 'Scyther', 'Jynx','Electabuzz','Magmar', 'Pinsir', 'Tauros',
    'Magikarp', 'Gyarados','Lapras','Ditto','Eevee', 'Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar',
    'Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (d) => {
    e.preventDefault();
   
    // Validation
    if (!formData.name || !formData.age || !formData.email || !formData.favoritePokemon) {
      alert('Please fill out all fields.');
      return;
    }
    if (isNaN(formData.age) || formData.age <= 0) {
      alert('Please enter a valid age.');
      return;
    }

    try {
      const response = await fetch("https://antoniopokemon.azurewebsites.net/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Form submitted successfully");
        console.log("API Response:", result);
        console.log("Form submission was successfully saved");

        setFormData({
          name: "",
          age: "",
          email: "",
          favoritePokemon: "Select a Pokémon"
        });
      } else {
        alert("Form submission failed. Please try again.");
        console.log("API Response: Error!!", response.statusText);
      }
    } catch (error) {
      alert("Submission failed. Try again.");
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="header-container">
          <h1>First Generation PokeDex Login</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Trainer's Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="favoritePokemon">Choose Your Favorite Pokémon</label>
              <select
                id="favoritePokemon"
                name="favoritePokemon"
                value={formData.favoritePokemon}
                onChange={handleChange}
              >
   
             <option value="">-- Select a Pokémon --</option>
                {pokemonList.map((pokemon) => (
                  <option key={pokemon} value={pokemon}>
                    {pokemon}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
          {submitted && <p>Form submitted!.</p>}
        </div>
      </div>
    </div>
  );
}
export default Login;

