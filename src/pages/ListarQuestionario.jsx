import React, { useState } from 'react';
import '../css/ListarImpresso.css';

export default function ListarQuestionario() {

  const [formData, setFormData] = useState({
    unidade: '',
    data: ''
  });

  const [expandedId, setExpandedId] = useState(null);
  const [expandedPerguntas, setExpandedPerguntas] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFormData({ unidade: '', data: '' });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const togglePergunta = (key) => {
    setExpandedPerguntas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 🔹 DADOS EXEMPLO
  const todosOsResultados = [
    {
      id: 1,
      unidade: 'convalescenca',
      data: '2000-01-01',
      registadoPor: 'X',
      dataHora: '01/01/2000 10:30',
      respostas: {
        medicos: 'bom',
        enfermeiros: 'muito bom',
        silencio: 'bom',
        privacidade: 'aceitavel'
      },
      sugestoes: 'Muito satisfeita com o atendimento.'
    },
    {
      id: 2,
      unidade: 'media',
      data: '2000-01-01',
      registadoPor: 'Y',
      dataHora: '01/01/2000 12:00',
      respostas: {
        medicos: 'bom',
        enfermeiros: 'bom',
        silencio: 'bom',
        privacidade: 'bom'
      },
      sugestoes: 'Nada a apontar.'
    },
    {
      id: 3,
      unidade: 'cirurgia',
      data: '2000-02-01',
      registadoPor: 'Z',
      dataHora: '01/02/2000 12:30',
      respostas: {
        medicos: 'bom',
        enfermeiros: 'bom',
        silencio: 'bom',
        privacidade: 'bom'
      },
      sugestoes: 'Tudo correu muito bem.'
    }
  ];

  const resultadosFiltrados = todosOsResultados.filter(item => {
    const correspondeUnidade = formData.unidade === '' || item.unidade === formData.unidade;
    const correspondeData = formData.data === '' || item.data === formData.data;
    return correspondeUnidade && correspondeData;
  });

  const opcoes = ["muito bom", "bom", "aceitavel", "mau"];

  const renderLinha = (respostas, label, key) => (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", marginBottom: "8px" }}>
      <span>{label}</span>
      {opcoes.map(op => (
        <span key={op} style={{ textAlign: "center" }}>
          <span style={{
            width: "16px",
            height: "16px",
            border: "1px solid black",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: respostas[key] === op ? "black" : "transparent"
          }} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="page-wrapper">

      {/* HEADER */}
      <header className="main-header">
        <div className="logo-section">Logo</div>
        <div className="title-section">
          SANTA CASA DA MISERICÓRDIA DE ESPOSENDE
        </div>
        <div className="user-section">
          <span>*Utilizador*</span>
          <button className="logout-btn">Terminar Sessão</button>
        </div>
      </header>

      <nav className="nav-links">
        <a href="#" className="nav-link">← Pagina Principal</a>
        <a href="#" className="nav-link">Registar Questionário →</a>
      </nav>

      <hr className="divider" />

      <div className="main-content list-page">
        <div className="container-1200">

          {/* FILTROS */}
          <div className="filter-header">
            <span className="filter-title">Filtros:</span>
            <button onClick={limparFiltros} className="clean-filters">
              Limpar Filtros
            </button>
          </div>

          <div className="section-box filter-box">
            <div className="row">
              <div className="input-group">
                <label>Unidade :</label>
                <select name="unidade" value={formData.unidade} onChange={handleChange}>
                  <option value="">-</option>
                  <option value="convalescenca">Convalescença</option>
                  <option value="media">Média Duração e Reabilitação</option>
                  <option value="cirurgia">Cirurgia</option>
                </select>
              </div>

              <div className="input-group">
                <label>Data :</label>
                <input type="date" name="data" value={formData.data} onChange={handleChange}/>
              </div>
            </div>
          </div>

          <h2 className="results-text">
            Total de Resultados: {resultadosFiltrados.length}
          </h2>

          {/* LISTA */}
          <div className="results-container">
            {resultadosFiltrados.map((item) => (
              <div key={item.id}>

                {/* HEADER LISTA */}
                <div
                  className="section-box list-row"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="row-content">
                    <span className="row-text">
                      {item.id}. Unidade: {item.unidade} Data:{item.data}
                    </span>
                    <span className="row-icon">
                      {expandedId === item.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* DETALHE */}
                {expandedId === item.id && (
                  <div className="expanded-details">

                    <p><strong>Registado por:</strong> {item.registadoPor}</p>
                    <p><strong>Data/Hora:</strong> {item.dataHora}</p>

                    <h3 style={{ marginTop: "20px" }}>Questionário</h3>

                    {/* PERGUNTA 1 */}
                    <div className="section-box" style={{ marginTop: "15px" }}>
                      <div
                        className="row-content"
                        onClick={() => togglePergunta(item.id + "_p1")}
                        style={{ cursor: "pointer" }}
                      >
                        <span>1. Qual o grau de satisfação...</span>
                        <span>{expandedPerguntas[item.id + "_p1"] ? "▲" : "▼"}</span>
                      </div>

                      {expandedPerguntas[item.id + "_p1"] && (
                        <div style={{ padding: "15px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", fontWeight: "bold", marginBottom: "10px" }}>
                            <span></span>
                            <span>Muito Bom</span>
                            <span>Bom</span>
                            <span>Aceitável</span>
                            <span>Mau</span>
                          </div>

                          {renderLinha(item.respostas, "1.1. Médicos", "medicos")}
                          {renderLinha(item.respostas, "1.2. Enfermeiros", "enfermeiros")}
                        </div>
                      )}
                    </div>

                    {/* SUGESTÕES */}
                    <div className="section-box" style={{ marginTop: "15px" }}>
                      <div
                        className="row-content"
                        onClick={() => togglePergunta(item.id + "_p10")}
                        style={{ cursor: "pointer" }}
                      >
                        <span>10. Sugestões e outros comentários</span>
                        <span>{expandedPerguntas[item.id + "_p10"] ? "▲" : "▼"}</span>
                      </div>

                      {expandedPerguntas[item.id + "_p10"] && (
                        <div style={{ padding: "15px" }}>
                          <div style={{
                            border: "1px solid #000",
                            padding: "10px",
                            minHeight: "80px"
                          }}>
                            {item.sugestoes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
