import styled from "@emotion/styled";

const Contenedor = styled.div`
  margin-top: 25px;
  background-color: #FFF;
  padding: 2px;
  font-family: 'Lato', sans-serif;
  border-radius: 5px;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 2rem;
`

const Imagen = styled.img`
  display: block;
  width: 120px;
  margin-left: 1.5rem;
`
const Texto = styled.p`
  font-size: 16px;
  span {
    font-weight: 700;
  }
`

const Resultado = ({resultado}) => {
    
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado;

  return (
    <Contenedor>
        <Imagen
          src={`https://cryptocompare.com/${IMAGEURL}`}
          alt= "imagen cripto"
        />
        
        <div>
          
          <Texto>El precio mas alto del dia: <span>{HIGHDAY}</span></Texto>
          <Texto>El precio mas bajo del dia: <span>{LOWDAY}</span></Texto>
          <Texto>Variaciòn ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
          <Texto>Ultima actualizaciòn: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Contenedor>
  )
}

export default Resultado