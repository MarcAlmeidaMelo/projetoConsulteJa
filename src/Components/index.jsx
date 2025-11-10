import "./style.css"
import { useState, useEffect } from 'react'; // COMENTÁRIO: Importação dos hooks useState e useEffect do React para gerenciar o estado do componente e o ciclo de vida.
import { fetchAllProducts } from './data.js'; // COMENTÁRIO: Importa a função que simula a chamada de API para obter os dados dos produtos.

// COMENTÁRIO: Importa o ícone de lixeira (trash) para o pop-up de erro.
const TrashIcon = ({ size = 25, fill = "currentColor", className = "bi bi-trash", viewBox = "0 0 16 16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={fill} className={className} viewBox={viewBox}>
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
);

// COMENTÁRIO: Importa o ícone de busca (search) para o botão.
const SearchIcon = ({ size = 16, fill = "currentColor", className = "bi bi-search", viewBox = "0 0 16 16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={fill} className={className} viewBox={viewBox}>
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.742 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
  </svg>
);

import Logo from "../assets/logo6.png"

function Index() {
  // COMENTÁRIO: Estado para armazenar todos os produtos do "banco de dados" (simulação de API).
  const [allProducts, setAllProducts] = useState([]);
  // COMENTÁRIO: Estado para armazenar o código digitado no campo de busca.
  const [searchCode, setSearchCode] = useState('');
  // COMENTÁRIO: Estado para armazenar o histórico de produtos pesquisados (os cards).
  const [historyCards, setHistoryCards] = useState([]);
  // COMENTÁRIO: Estado para controlar a exibição do pop-up de produto não encontrado.
  const [showNotFound, setShowNotFound] = useState(false);

  // COMENTÁRIO: useEffect para simular a chamada de API e carregar os dados dos produtos na montagem do componente.
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Erro ao carregar dados dos produtos:", error);
      }
    };
    loadProducts();
  }, []);

  // COMENTÁRIO: Função para lidar com a busca do produto.
  const handleSearch = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).

    // COMENTÁRIO: Normaliza o código de busca para garantir que a comparação seja case-insensitive e sem espaços extras.
    const codeToSearch = searchCode.trim().toUpperCase();

    // COMENTÁRIO: Busca o produto no array de todos os produtos pelo código.
    const foundProduct = allProducts.find(
      (product) => product.codigo.toUpperCase() === codeToSearch
    );

    if (foundProduct) {
      // COMENTÁRIO: Produto encontrado. Adiciona ao histórico de cards, garantindo que o mais recente apareça no topo.
      // Usa um ID único (timestamp) para a chave do React, pois o mesmo produto pode ser pesquisado várias vezes.
      const newCard = { ...foundProduct, id: Date.now() };
      setHistoryCards((prevCards) => [newCard, ...prevCards]);
      setSearchCode(''); // Limpa o campo de busca após o sucesso.
      setShowNotFound(false); // Garante que o pop-up de erro esteja fechado.
    } else {
      // COMENTÁRIO: Produto não encontrado. Exibe o pop-up de erro.
      setShowNotFound(true);
      // Opcional: Esconde o pop-up após alguns segundos.
      setTimeout(() => setShowNotFound(false), 3000);
    }
  };

  // COMENTÁRIO: Função para remover um card do histórico.
  const handleDeleteCard = (idToRemove) => {
    // COMENTÁRIO: Filtra o array de histórico, mantendo apenas os cards cujo ID é diferente do ID a ser removido.
    setHistoryCards((prevCards) => prevCards.filter((card) => card.id !== idToRemove));
  };

  return (

    <div className="container">

      <form className="consulta" onSubmit={handleSearch}>



        <header className="flex items-center p-4 bg-white shadow-md">

          <img src={Logo} alt="Logo ConsulteJá" className="logo" />

        </header>

        <input
          name="codigo"
          type='text'
          placeholder="Insira o código do produto..."
          value={searchCode} // COMENTÁRIO: Conecta o valor do input ao estado searchCode.
          onChange={(e) => setSearchCode(e.target.value)} // COMENTÁRIO: Atualiza o estado searchCode a cada mudança no input.
        />

        <button type="submit" className="buscar">Buscar
          <SearchIcon />
        </button>

      </form>

      {/* COMENTÁRIO: Mapeia o array historyCards para exibir o histórico de pesquisas. */}
      {historyCards.map(produto => {

        return (

          <div key={produto.id} className="cards"> {/* COMENTÁRIO: Usa o ID único (timestamp) do card para a chave, garantindo que cards de produtos repetidos sejam tratados corretamente. */}



            <img src={produto.foto} className="imagemProduto" alt={`Foto de ${produto.nome}`}></img> {/* COMENTÁRIO: Usa a URL da foto do produto do JSON e adiciona um alt text. */}



            <div className="dataProduto">

              <p>Código do produto: <span>{produto.codigo}</span></p>
              <p>Nome: <span>{produto.nome}</span></p>
              <p>Descrição:<span>{produto.descricao}</span></p>
              <p>Preço: <span> R$ {produto.preco.toFixed(2).replace('.', ',')}</span></p> {/* COMENTÁRIO: Formata o preço para duas casas decimais e usa vírgula como separador decimal. */}

            </div>

            <button onClick={() => handleDeleteCard(produto.id)}> {/* COMENTÁRIO: Adiciona o manipulador de clique para excluir o card, chamando handleDeleteCard com o ID do produto. */}
              <TrashIcon /> {/* COMENTÁRIO: Substitui o SVG inline pelo componente TrashIcon. */}
            </button>



          </div>
        )

      })}

      {/* COMENTÁRIO: Pop-up de Produto Não Encontrado. Renderizado condicionalmente. */}
      {showNotFound && (
        <div className="not-found-popup">
          <p>Produto com código "{searchCode.trim()}" não encontrado.</p>
          <button onClick={() => setShowNotFound(false)}>Fechar</button>
        </div>
      )}

    </div>
  )
}

export default Index
