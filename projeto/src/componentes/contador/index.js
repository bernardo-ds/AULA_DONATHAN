import { useState } from 'react'
import './style.css';

export default function Calculadora() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [resultado, setResultado] = useState(0);

    function somar() {
        setResultado(Number(num1) + Number(num2));
    }

    function subtrair() {
        setResultado(Number(num1) - Number(num2));
    }

    function multiplicar() {
        setResultado(Number(num1) * Number(num2));
    }

    function dividir() {
        setResultado(Number(num1) / Number(num2));
    }

    return (
        <div className='pagina'>
            <h1>Calculadora</h1>

            <input type="number" placeholder="Número 1" onChange={(e) => setNum1(e.target.value)} />

            <input type="number" placeholder="Número 2" onChange={(e) => setNum2(e.target.value)} />

            <div>
                <button onClick={somar}>SOMAR</button>
                <br></br><br></br>
                <button onClick={subtrair}>SUBTRAIR</button>
                <br></br><br></br>
                <button onClick={multiplicar}>MULTIPLICAR</button>
                <br></br><br></br>
                <button onClick={dividir}>DIVIDIR</button>
            </div>

            <h2>Resultado: {resultado}</h2>
        </div>
    )
}