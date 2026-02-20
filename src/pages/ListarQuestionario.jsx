import React, { useState, useEffect } from 'react';
import '../css/ListarQuestionario.css';

export default function ListarQuestionario() {
  const [formData, setFormData] = useState({
    unidade: '',
    data: ''
  });

  // Estado para armazenar os dados vindos da BD
  const [todosOsResultados, setTodosOsResultados] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [expandedPerguntas, setExpandedPerguntas] = useState({});
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS DA API AO INICIAR
  useEffect(() => {
    fetch("http://localhost/API/listarQuestionario.php")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTodosOsResultados(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

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

  // 2. FILTRAGEM DOS DADOS REAIS
  const resultadosFiltrados = todosOsResultados.filter(item => {
    // Ajustado para os nomes de colunas da sua tbl_questionarios (image027.png)
    const correspondeUnidade = formData.unidade === '' || String(item.cod_unidade) === formData.unidade;
    const correspondeData = formData.data === '' || item.data.includes(formData.data);
    return correspondeUnidade && correspondeData;
  });

  const opcoes = ["muito bom", "bom", "aceitavel", "mau"];

  // Renderiza a linha com o círculo preenchido se o valor coincidir
  const renderLinha = (valorReal, label) => (
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
            backgroundColor: valorReal === op ? "black" : "transparent"
          }} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="page-wrapper">
      {/* HEADER MANTIDO */}
      <header className="main-header">
        <div className="logo-section">Logo</div>
        <div className="title-section">SANTA CASA DA MISERICÓRDIA DE ESPOSENDE</div>
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

          {/* FILTROS MANTIDOS */}
          <div className="filter-header">
            <span className="filter-title">Filtros:</span>
            <button onClick={limparFiltros} className="clean-filters">Limpar Filtros</button>
          </div>

          <div className="section-box filter-box">
            <div className="row">
              <div className="input-group">
                <label>Unidade :</label>
                <select name="unidade" value={formData.unidade} onChange={handleChange}>
                  <option value="">-</option>
                  {/* Values ajustados para os IDs da tbl_unidades (image033.png) */}
                  <option value="1">Convalescença</option>
                  <option value="2">Média Duração e Reabilitação</option>
                  <option value="3">Cirurgia</option>
                </select>
              </div>

              <div className="input-group">
                <label>Data :</label>
                <input type="date" name="data" value={formData.data} onChange={handleChange}/>
              </div>
            </div>
          </div>

          <h2 className="results-text">
            {loading ? "A carregar dados..." : `Total de Resultados: ${resultadosFiltrados.length}`}
          </h2>

          {/* LISTA DINÂMICA */}
          <div className="results-container">
            {resultadosFiltrados.map((item) => (
              <div key={item.id_questionario}>
                
                <div
                  className="section-box list-row"
                  onClick={() => toggleExpand(item.id_questionario)}
                >
                  <div className="row-content">
                    <span className="row-text">
                      {item.id_questionario}. Unidade: {item.cod_unidade} | Data: {new Date(item.data).toLocaleDateString()}
                    </span>
                    <span className="row-icon">
                      {expandedId === item.id_questionario ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* DETALHE EXPANSÍVEL */}
                {expandedId === item.id_questionario && (
                  <div className="expanded-details">
                    <p><strong>Registado por:</strong> {item.utilizador_registo}</p>
                    <p><strong>Data de Registo:</strong> {item.data_registo}</p>

                    <h3 style={{ marginTop: "20px" }}>Questionário</h3>

                    {/* Exemplo de Pergunta (Neste ponto, precisarias de carregar os registos da tbl_questionarios_registos se quiseres os círculos preenchidos para cada indicador) */}
                    <div className="section-box" style={{ marginTop: "15px" }}>
                      <div
                        className="row-content"
                        onClick={() => togglePergunta(item.id_questionario + "_p1")}
                        style={{ cursor: "pointer" }}
                      >
                        <span>1. Avaliação de Indicadores</span>
                        <span>{expandedPerguntas[item.id_questionario + "_p1"] ? "▲" : "▼"}</span>
                      </div>

                      {expandedPerguntas[item.id_questionario + "_p1"] && (
                        <div style={{ padding: "15px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", fontWeight: "bold", marginBottom: "10px" }}>
                            <span>Indicador</span>
                            <span>Muito Bom</span><span>Bom</span><span>Aceitável</span><span>Mau</span>
                          </div>
                          {/* Exemplo estático - para ser real, requer uma segunda query para tbl_questionarios_registos */}
                          {renderLinha("muito bom", "1.1. Médicos")}
                          {renderLinha("bom", "1.2. Enfermeiros")}
                        </div>
                      )}
                    </div>

                    {/* SUGESTÕES REAIS */}
                    <div className="section-box" style={{ marginTop: "15px" }}>
                      <div
                        className="row-content"
                        onClick={() => togglePergunta(item.id_questionario + "_p10")}
                        style={{ cursor: "pointer" }}
                      >
                        <span>10. Sugestões e outros comentários</span>
                        <span>{expandedPerguntas[item.id_questionario + "_p10"] ? "▲" : "▼"}</span>
                      </div>

                      {expandedPerguntas[item.id_questionario + "_p10"] && (
                        <div style={{ padding: "15px" }}>
                          <div style={{ border: "1px solid #000", padding: "10px", minHeight: "80px" }}>
                            {item.sugestoes_comentarios || "Sem comentários registados."}
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