import React, { useState, useEffect } from 'react';
import '../css/ListarQuestionario.css'; 

export default function ListarQuestionarios() {
  const [questionarios, setQuestionarios] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [detalhes, setDetalhes] = useState({}); // Armazena as respostas de cada Q

  useEffect(() => {
    fetch("http://localhost/API/listarQuestionario.php")
      .then(res => res.json())
      .then(data => setQuestionarios(data))
      .catch(err => console.error("Erro:", err));
  }, []);

  const toggleExpand = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    // Se ainda não carregamos os detalhes deste questionário, buscamos agora
    if (!detalhes[id]) {
      try {
        const res = await fetch(`http://localhost/API/obterDetalhe.php?id=${id}`);
        const data = await res.json();
        setDetalhes(prev => ({ ...prev, [id]: data }));
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
      }
    }
    setExpandedId(id);
  };

  return (
    <div className="page-wrapper">
      {/* Este contentor controla a largura máxima de TODO o ecrã */}
      <div className="container-align">
        
        {/* Cabeçalho */}
        <header className="main-header">
          <div className="logo-section">Logo</div>
          <div className="title-section">SANTA CASA DA MISERICÓRDIA DE ESPOSENDE</div>
          <div className="user-section">
            <span>*Utilizador*</span><br/>
            <button className="logout-btn">Terminar Sessão</button>
          </div>
        </header>

        {/* Navegação */}
        <nav className="nav-links">
          <a href="#" className="nav-link">← Pagina Principal</a>
          <a href="#" className="nav-link">Listar Questionários →</a>
        </nav>

        <hr className="divider" />

        <main className="main-content list-page">
          <div className="container-1200">
            <h2 className="results-text">Questionários Guardados:</h2>
            <div className="results-container">
              {questionarios.map((q) => (
                <div key={q.id_questionario}>
                  {/* Cabeçalho da Linha */}
                  <div className="section-box list-row" onClick={() => toggleExpand(q.id_questionario)}>
                    <div className="row-content">
                      <div className="row-text">
                        <strong>ID: {q.id_questionario}</strong> | {q.nome_unidade} | {new Date(q.data).toLocaleDateString()}
                      </div>
                      <div className="row-icon">{expandedId === q.id_questionario ? '▲' : '▼'}</div>
                    </div>
                  </div>

                  {/* Conteúdo Expandido (Detalhes) */}
                  {expandedId === q.id_questionario && detalhes[q.id_questionario] && (
                    <div className="expanded-details">
                      <div className="scale-header">
                        <div className="scale-label">Indicador</div>
                        <div>MB</div><div>B</div><div>A</div><div>M</div>
                      </div>
                      
                      {detalhes[q.id_questionario].respostas.map((resp, idx) => (
                        <div className="scale-row" key={idx}>
                          <div className="scale-label">{resp.descricao}</div>
                          <div className="scale-cell"><span className={`radio-circle ${resp.muito_bom ? 'active' : ''}`}></span></div>
                          <div className="scale-cell"><span className={`radio-circle ${resp.bom ? 'active' : ''}`}></span></div>
                          <div className="scale-cell"><span className={`radio-circle ${resp.aceitavel ? 'active' : ''}`}></span></div>
                          <div className="scale-cell"><span className={`radio-circle ${resp.mau ? 'active' : ''}`}></span></div>
                        </div>
                      ))}

                      <div className="questionario-title">Comentários:</div>
                      <div className="comment-box">
                        {detalhes[q.id_questionario].sugestoes || "Sem comentários."}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}