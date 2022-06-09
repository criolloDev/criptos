import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import ImagenCripto from './img/CryptoImagen.png';

const Contenedor = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Nunito', sans-serif;
  color: white;
  text-align: center;
  font-weight: 900;
  margin-top: 80px;
  margin-bottom: 35px;
  font-size: 35px;
`;

const Precio = styled.p`
  font-family: 'Nunito', sans-serif;
  color: white;
  text-align: center;
  font-weight: 900;
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 30px;
  span {
    font-weight: 700;
  }
`

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
      if (Object.keys(monedas).length > 0) {
          setCargando(true)
          setResultado({})
        const cotizarCripto = async () => {
          const {moneda, criptoMoneda} = monedas;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`

          const respuesta = await fetch(url);
          const resultado = await respuesta.json()

          setResultado(resultado.DISPLAY[criptoMoneda][moneda]);
          setCargando(false);
        }

        cotizarCripto();
      }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt= 'imagen cripto'
      />
      <div>
        <Heading>COTIZA CRIPTOMONEDAS AL INSTANTE</Heading>
        <Formulario
          setMonedas = {setMonedas}
        />
        { cargando && <Spinner/> }
        {
          resultado.PRICE && 
          <>
          <Precio>El precio es de: <span>{resultado.PRICE}</span></Precio>
          <Resultado resultado = {resultado}
          />
          </>
        }
      </div>
    </Contenedor>
  )
}

export default App
