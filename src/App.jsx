import { useState, useEffect } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'


function App() {
  const [selicMensal, setSelicMensal] = useState(null)
  const [valorInvestido, setValorInvestido] = useState('')
  const [evolucao, setEvolucao] = useState(null)
  const [selicDiaria, setSelicDiaria] = useState(null)



  useEffect(() => {
    fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=13/07/2025&dataFinal=13/07/2026')
      .then(response => response.json())
      .then(data => {
        const mudancas = []
        let valorAnterior = null
        data.forEach((item) => {
          const valor = parseFloat(item.valor)
          if (valor !== valorAnterior) {
            mudancas.push({ data: item.data, valor })
            valorAnterior = valor
          }
        })
        setSelicMensal(mudancas)
      })
  }, [])
    useEffect(() => {
    fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=13/07/2025&dataFinal=13/07/2026')
      .then(response => response.json())
      .then(data => {
        setSelicDiaria(data.map((item) => ({ data: item.data, valor: parseFloat(item.valor) })))
      })
  }, [])


    function simular() {
    const valorInicial = parseFloat(valorInvestido.replace(',', '.'))
    let valorAtual = valorInicial

    const resultado = selicDiaria.map((item) => {
      const fatorDiario = item.valor / 100
      valorAtual = valorAtual * (1 + fatorDiario)
      return { data: item.data, valor: valorAtual }
    })


    const porMes = {}
    resultado.forEach((item) => {
      const [dia, mes, ano] = item.data.split('/')
      const chave = `${ano}-${mes}`
      porMes[chave] = item
    })


    console.log(Object.values(porMes))
    setEvolucao(Object.values(porMes))

  }


  return (
    <div>
      <h1>Variação da Selic nos ultimos 12 meses</h1>
      {selicMensal ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={selicMensal}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="data" />
            <YAxis width={40} />
            <Line type="monotone" dataKey="valor" stroke="#2a78d6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>

      ) : (
        <p>Carregando...</p>
      )}
        {evolucao ? (
        <>
        <h2>Evolução do montante</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={evolucao}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="data" />
            <YAxis width={60} />
            <Line type="monotone" dataKey="valor" stroke="#1baf7a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer></>
        ) : null}


      
      <div>
        <label htmlFor="valorInvestido">Total investido</label>
        <br />
        R$ <input
          id="valorInvestido"
          type="text"
          placeholder="0,00"
          value={valorInvestido}
          onChange={(e) => setValorInvestido(e.target.value)}
        />
        <button onClick={simular}>Simular</button>

      </div>

    </div>
  )
}

export default App
