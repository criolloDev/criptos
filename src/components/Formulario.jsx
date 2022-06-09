import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { monedas } from "../data/monedas";
import useSelectMonedas from '../hooks/useSelectMonedas';
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #494ff5;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    margin-top: 30px;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #5f61fd;
        cursor: pointer;
    }

`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Moneda:', monedas);
    const [ criptoMoneda, SelectCripto ] = useSelectMonedas('Criptomoneda:', criptos);

    useEffect(() => {
         const consultarAPI = async () => {
             const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
             const respuesta = await fetch(url)
             const resultado = await respuesta.json()
             
             const arrayCriptos = resultado.Data.map( cripto => {
                 const objeto = {
                     id: cripto.CoinInfo.Name,
                     nombre: cripto.CoinInfo.FullName
                 }
                 return objeto
             })

             setCriptos(arrayCriptos);
         }
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptoMoneda].includes('')) {
            setError(true);

            return
        }
        setError(false);
        setMonedas({moneda, criptoMoneda});
    }
    

    return (
        <>
            { error && <Error mensaje = "Todos los campos son obligatorios"/>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCripto />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario