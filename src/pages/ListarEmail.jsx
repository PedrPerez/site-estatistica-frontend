import React, { useState } from 'react';
import '../css/ListarEmail.css';

export default function ListarEmail() {

  const [formData, setFormData] = useState({
    unidade: '',
    data: '',
    tipo: ''
  });

  const [expandedId, setExpandedId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFormData({ unidade: '', data: '', tipo: '' });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Lista completa de emails
  const todosOsResultados = [
    { 
      id: 1, 
      unidade: 'convalescenca', 
      data: '01/01/2000', 
      tipo: 'elogio',
      email: 'pp@gmail.com',
      conteudo: 'Ótimo serviço prestado. Equipa muito atenciosa.'
    },
    { 
      id: 2, 
      unidade: 'cuidados-paliativos', 
      data: '15/05/2022', 
      tipo: 'sugestao',
      email: 'sugestao@gmail.com',
      conteudo: 'Poderiam melhorar o tempo de resposta.'
    },
    { 
      id: 3, 
      unidade: 'convalescenca', 
      data: '20/10/2023', 
      tipo: 'reclamacao',
      email: 'aaa@gmail.com',
      conteudo: 'Demorou muito tempo a obter resposta.'
    }
  ];

  // Função para mostrar nomes bonitos
  const formatarUnidade = (unidade) => {
    switch(unidade) {
      case 'convalescenca': return 'Convalescença';
      case 'cuidados-paliativos': return 'Cuidados Paliativos';
      default: return unidade;
    }
  };

  const formatarTipo = (tipo) => {
    switch(tipo) {
      case 'elogio': return 'Agradecimento/Elogio';
      case 'sugestao': return 'Sugestão';
      case 'reclamacao': return 'Reclamação';
      default: return tipo;
    }
  };

  // Filtragem
  const resultadosFiltrados = todosOsResultados.filter(item => {
    const correspondeUnidade = formData.unidade === '' || item.unidade === formData.unidade;
    const correspondeTipo = formData.tipo === '' || item.tipo === formData.tipo;
    const correspondeData = formData.data === '' || item.data.includes(formData.data);
    const correspondeEmail = formData.email === '' || item.email.includes(formData.email);

    return correspondeUnidade && correspondeTipo && correspondeData && correspondeEmail;
  });

  return (
    <div className="page-wrapper">

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
        <a href="#" className="nav-link">Inserir Email →</a>
      </nav>

      <hr className="divider" />

      <div className="main-content" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '95%', maxWidth: '1200px' }}>

          {/* FILTROS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5px' }}>
            <span style={{ fontSize: '1.8rem' }}>Filtros:</span>
            <button onClick={limparFiltros} className="logout-btn" style={{ textDecoration: 'underline' }}>
              Limpar Filtros
            </button>
          </div>

          <section className="section-box" style={{ padding: '10px', marginBottom: '20px' }}>
            <div className="row">
              <div className="input-group">
                <label>Unidade :</label>
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

            <div className="row" style={{ paddingTop: 0 }}>
              <div className="input-group">
                <label>Tipo :</label>
                  <select name="tipo" value={formData.tipo} onChange={handleChange}>
                    <option value="">-</option>
                    <option value="elogio">Agradecimento/Elogio</option>
                    <option value="ajuda">Pedido de ajuda</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="sugestao">Sugestão</option>
                  </select>
              </div>
              <div className="input-group grow">
              <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* TOTAL */}
          <h2 style={{ fontSize: '1.6rem', fontWeight: 'normal', marginBottom: '20px' }}>
            Total de Resultados: {resultadosFiltrados.length}
          </h2>

          {/* LISTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((item) => (
                <div key={item.id} className="section-box">
                  {/* HEADER */}
                  <div 
                    onClick={() => toggleExpand(item.id)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '15px 20px', 
                      fontSize: '1.6rem',
                      cursor: 'pointer'
                    }}
                  >
                    <span>
                      {item.id}. Unidade: {formatarUnidade(item.unidade)} 
                      {" "}Data: {item.data}
                    </span>
                    <span style={{ fontWeight: 'bold' }}>
                      {expandedId === item.id ? '▲' : '▼'}
                    </span>
                  </div>

                  {/* CONTEÚDO EXPANDIDO */}
                  {expandedId === item.id && (
                    <div style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
                      <p><strong>Tipo:</strong> {formatarTipo(item.tipo)}</p>
                      <p><strong>Email:</strong> {item.email}</p>
                      <div style={{ marginTop: '15px' }}>
                        <p><strong>Conteúdo do email:</strong></p>
                        <div style={{
                          border: '1px solid #999',
                          padding: '15px',
                          minHeight: '100px',
                          marginTop: '5px'
                        }}>
                          {item.conteudo}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '20px' }}>
                Nenhum resultado encontrado para os filtros aplicados.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
