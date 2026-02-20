import React, { useState } from 'react';
import '../css/InserirQuestionario.css';

export default function InserirQuestionario() {
  const [formData, setFormData] = useState({
    unidade: '',
    data: '',
    sugestoes: '',
    respostas: {}
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (idIndicador, valor) => {
    setFormData(prev => ({
      ...prev,
      respostas: { ...prev.respostas, [idIndicador]: valor }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'A gravar dados...' });

    const dadosParaEnviar = {
      unidade: formData.unidade,
      data: formData.data,
      conteudo: formData.sugestoes,
      utilizador: "Admin_HVR",
      respostas: formData.respostas
    };

    try {
      const response = await fetch("http://localhost/API/salvar_questionario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar)
      });

      const resultado = await response.json();

      if (resultado.status === "sucesso") {
        setStatus({ type: 'success', message: '✅ Questionário gravado com sucesso!' });
        setFormData({ unidade: '', data: '', sugestoes: '', respostas: {} });
      } else {
        setStatus({ type: 'error', message: '❌ Erro: ' + resultado.mensagem });
      }
    } catch (error) {
      setStatus({ type: 'error', message: '❌ Erro de ligação ao servidor.' });
    }
  };

  // Função para gerar as linhas da tabela de indicadores
  const renderFilaRadios = (id, texto) => (
    <tr key={id}>
      <td>{texto}</td>
      {['muito bom', 'bom', 'aceitavel', 'mau'].map(op => (
        <td key={op}>
          <input 
            type="radio" 
            name={`indicador_${id}`} 
            required
            checked={formData.respostas[id] === op}
            onChange={() => handleRadioChange(id, op)} 
          />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="page-wrapper">
      <header className="main-header">
        <div className="logo-section">Logo</div>
        <div className="title-section">SANTA CASA DA MISERICÓRDIA DE ESPOSENDE</div>
        <div className="user-section">
          <span>*Utilizador*</span><br/>
          <button className="logout-btn">Terminar Sessão</button>
        </div>
      </header>

      <nav className="nav-links">
        <a href="#" className="nav-link">← Pagina Principal</a>
        <a href="#" className="nav-link">Listar Questionários →</a>
      </nav>

      <hr className="divider" />

      <main className="main-content">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <form onSubmit={handleSubmit}>
            
            {/* Secção de Identificação */}
            <div className="section-box no-padding">
              <div className="section-title gray-bg">Identificação</div>
              <div className="row">
                <div className="input-group grow">
                  <label>Unidade:</label>
                  <select name="unidade" value={formData.unidade} onChange={handleChange} required>
                    <option value="">-</option>
                    <option value="1">Convalescença</option>
                    <option value="2">Média Duração e Reabilitação</option>
                    <option value="3">Cirurgia</option>
                  </select>
                </div>
                <div className="input-group grow">
                  <label>Data:</label>
                  <input type="date" name="data" value={formData.data} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Secção de Avaliação */}
            <div className="section-box no-padding">
              <div className="section-title gray-bg">1. Grau de Satisfação</div>
              <div className="question-content">
                <table className="rating-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Muito Bom</th>
                      <th>Bom</th>
                      <th>Aceitável</th>
                      <th>Mau</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderFilaRadios(1, "1.1. Médicos")}
                    {renderFilaRadios(2, "1.2. Enfermeiros")}
                    {renderFilaRadios(3, "1.3. Assistentes Operacionais")}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Secção de Sugestões */}
            <div className="section-box no-padding">
              <div className="section-title gray-bg">10. Sugestões e outros comentários</div>
              <div className="textarea-container">
                <textarea 
                  name="sugestoes" 
                  value={formData.sugestoes} 
                  onChange={handleChange} 
                  placeholder="Escreva aqui..."
                />
              </div>
            </div>

            {/* Mensagens de Feedback */}
            {status.message && (
              <div className={status.type === 'error' ? 'error-message' : 'status-msg'} 
                   style={{ textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
                {status.message}
              </div>
            )}

            {/* Botões */}
            <div className="button-group">
              <button type="button" className="btn-cancel" onClick={() => window.history.back()}>Cancelar</button>
              <button type="submit" className="btn-submit">Submeter</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}