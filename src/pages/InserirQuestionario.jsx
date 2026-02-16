import React, { useState } from 'react';
import '../css/InserirQuestionario.css';

export default function InserirQuestionario() {

  const [formData, setFormData] = useState({
    unidade: '',
    data: '',
    conteudo: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { unidade, data, conteudo } = formData;

    if (!unidade || !data || !conteudo) {
      setError('Campos por preencher.');
      return;
    }

    setError('');
    console.log('Dados submetidos:', formData);
  };

  return (
    <div className="page-wrapper">
      {/* Cabeçalho */}
      <header className="main-header">
        <div className="logo-section">Logo</div>
        <div className="title-section">SANTA CASA DA MISERICÓRDIA DE ESPOSENDE</div>
        <div className="user-section">
          <span>*Utilizador*</span>
          <button className="logout-btn">Terminar Sessão</button>
        </div>
      </header>

      {/* Navegação */}
      <nav className="nav-links">
        <a href="#" className="nav-link">← Pagina Principal</a>
        <a href="#" className="nav-link">Listar Questionario →</a>
      </nav>

      <hr className="divider" />

      {/* Conteúdo */}
      <div className="main-content">
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            {/* Identificação */}
            <section className="section-box">
              <h2 className="section-title">Identificação</h2>
            </section>

            <div className="row">
                <div className="input-group">
                  <label>Unidade:</label>
                  <select name="unidade" value={formData.unidade} onChange={handleChange}>
                    <option value="">-</option>
                    <option value="convalescenca">Convalescença</option>
                    <option value="media">Média Duração e Reabilitação</option>
                    <option value="cirurgia">Cirurgia</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Data:</label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                  />
                </div>
            </div>

            <section className="questionario-container">
                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Questionário</h2>

                {/* Pergunta 1 */}
                <div className="section-box no-padding">
                    <header className="section-title gray-bg flex-between">
                    <span>1. Qual o grau de satisfação...</span>
                    <span>^</span>
                    </header>
                    
                    <div className="question-content">
                    <table className="rating-table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Muito Bom</th>
                            <th>Bom</th>
                            <th>Aceitavel</th>
                            <th>Mau</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1.1. Médicos</td>
                            <td><input type="radio" name="medicos" value="muito-bom" /></td>
                            <td><input type="radio" name="medicos" value="bom" /></td>
                            <td><input type="radio" name="medicos" value="aceitavel" /></td>
                            <td><input type="radio" name="medicos" value="mau" /></td>
                        </tr>
                        <tr>
                            <td>1.2. Enfermeiros</td>
                            <td><input type="radio" name="enfermeiros" value="muito-bom" /></td>
                            <td><input type="radio" name="enfermeiros" value="bom" /></td>
                            <td><input type="radio" name="enfermeiros" value="aceitavel" /></td>
                            <td><input type="radio" name="enfermeiros" value="mau" /></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>

                {/* Pergunta 2 (Repete a estrutura) */}
            </section>

            {/* Conteúdo */}
            <section className="section-box no-padding">
              <h2 className="section-title gray-bg">Sugestões:</h2>
              <div className="textarea-container">
                <textarea
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Mensagem de erro */}
            {error && <div className="error-message">{error}</div>}

            {/* Botões */}
            <div className="button-group">
              <button type="submit" className="btn-submit">Submeter</button>
              <button type="button" className="btn-cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}