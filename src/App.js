import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './styles.css';
import axios from 'axios';
import Male_MS from './assets/images/male_mage.gif'
import Male_ED from './assets/images/male_druid.gif'
import Male_RP from './assets/images/male_pally.gif'
import Male_EK from './assets/images/male_knight.gif'
import Female_MS from './assets/images/female_mage.gif'
import Female_ED from './assets/images/female_druid.gif'
import Female_RP from './assets/images/female_pally.gif'
import Female_EK from './assets/images/female_knight.gif'
import Default_Char from './assets/images/default_char.gif'
import { withStyles, Card, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Formik, Form } from 'formik';

function App() {
  const [char, setChar] = useState(null);
  const [sex, setSex] = useState(null);
  const [vocation, setVocation] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleCharSearch = value => {
    setLoading(true);
    axios.get(`https://api.tibiadata.com/v2/characters/${value}.json`)
      .then(response => {
        if (response.status === 200) {
          const { sex, vocation } = response?.data?.characters?.data;
          setChar(response);
          console.log(response);
          setSex(sex)
          setVocation(vocation)
          setLoading(false);
        }
      }
      )
      .catch(error => {
        console.log(error)
        setLoading(false);
      }
      )
  }

  const ColorButton = withStyles((theme) => ({
    root: {
      color: "#fff",
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  const handleCharImage = (charSex, charVocation) => {
    if (charSex === 'male' && (charVocation === 'Master Sorcerer' || charVocation === 'Sorcerer')) return <img src={Male_MS} />
    if (charSex === 'male' && (charVocation === 'Elder Druid' || charVocation === 'Druid')) return <img src={Male_ED} />
    if (charSex === 'male' && (charVocation === 'Royal Paladin' || charVocation === 'Paladin')) return <img src={Male_RP} />
    if (charSex === 'male' && (charVocation === 'Elite Knight' || charVocation === 'Knight')) return <img src={Male_EK} />
    // ---
    if (charSex === 'female' && (charVocation === 'Master Sorcerer' || charVocation === 'Sorcerer')) return <img src={Female_MS} />
    if (charSex === 'female' && (charVocation === 'Elder Druid' || charVocation === 'Druid')) return <img src={Female_ED} />
    if (charSex === 'female' && (charVocation === 'Royal Paladin' || charVocation === 'Paladin')) return <img src={Female_RP} />
    if (charSex === 'female' && (charVocation === 'Elite Knight' || charVocation === 'Knight')) return <img src={Female_EK} />
  }
  return (
    <div className="App">
      <div className="topContainer">

        <Formik onSubmit={values => handleCharSearch(values.charName)} initialValues={{ charName: '' }} render={({ values, error, setFieldValue }) => (
          <Form>
            <Card className="cardSearchContainer">
              <div className="inputAndButton">
                <div className="searchContainer">
                  <TextField
                    id="outlined-uncontrolled"
                    name="charName"
                    label="Character Name"
                    placeholder="Name"
                    onChange={e => { setFieldValue("charName", e.target.value); handleCharSearch(e.target.value) }}
                    onBlur={e => handleCharSearch(e.target.value)}
                    value={values.charName}
                    // onChange={e => handleChange(e.target.value)}
                    variant="outlined"
                  />
                </div>
                <Button variant="contained" color="primary" className="buttonSearch" type="submit" onPress={() => onsubmit}>
                  Search
                </Button>
              </div>
              <div>
                <p className="warning">Nosso serviço tem um atraso de 2 minutos em relação ao jogo.</p>
              </div>
            </Card>
          </Form>
        )
        }>
        </Formik>
      </div>

      <Card className="cardContainer">
        {loading ? (<CircularProgress />) : (
          <>
            {handleCharImage(sex, vocation) || <img src={Default_Char} />}
            <div className="statusContainer">
              {char?.data?.characters?.data?.status === "online" ? (
                <ColorButton
                  variant="contained"
                >Online</ColorButton>
              ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                  >Offline</Button>
                )}
            </div>
            <div className="infoContainer">
              <div className="minorInfoContainer">
                <TextField
                  id="outlined-uncontrolled"
                  label="Name"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={char?.data?.characters?.data?.name}
                  variant="outlined"
                />
                <TextField
                  id="outlined-uncontrolled"
                  label="Sex"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={char?.data?.characters?.data?.sex}
                  variant="outlined"
                />
              </div>
              <hr className="separatorLine" />
              <div className="minorInfoContainer">
                <TextField
                  id="outlined-uncontrolled"
                  label="Vocation"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={char?.data?.characters?.data?.vocation}
                  variant="outlined"
                />
                <TextField
                  id="outlined-uncontrolled"
                  label="Level"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={char?.data?.characters?.data?.level}
                  variant="outlined"
                />
              </div>
              <hr className="separatorLine" />
              <div className="minorInfoContainer">
                <TextField
                  id="outlined-uncontrolled"
                  label="World"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={char?.data?.characters?.data?.world}
                  variant="outlined"
                />
                <TextField
                  id="outlined-uncontrolled"
                  label="Residence"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  value={char?.data?.characters?.data?.residence}
                  variant="outlined"
                />
              </div>
            </div>
          </>

        )}


      </Card>

    </div>
  );
}

export default App;
