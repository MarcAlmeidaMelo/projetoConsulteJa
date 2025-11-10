import bone from "../assets/bone.webp"
import calca from "../assets/calca.webp"
import camisa from "../assets/camiseta.webp"
import carteira from "../assets/carteira.jpg"
import fone from "../assets/fone.jpg"
import jaqueta from "../assets/jaqueta.webp"
import mochila from "../assets/mochila.webp"
import oculos from "../assets/oculos.jpeg"
import tenis from "../assets/tenis.jpg"
import relogio from "../assets/relogio.jpeg"



// data.js
// Este arquivo simula a resposta de uma API, exportando o array de produtos.
// Em um ambiente de produção, este dado viria de um endpoint real.

export const productsData = [
  {
    "foto": camisa,
    "codigo": "P001",
    "nome": "Camiseta Básica",
    "descricao": "Camiseta 100% algodão, disponível em várias cores.",
    "preco": 49.90
  },
  {
    "foto": calca,
    "codigo": "P002",
    "nome": "Calça Jeans Slim",
    "descricao": "Calça jeans modelo slim com elastano, confortável e moderna.",
    "preco": 129.90
  },
  {
    "foto": tenis,
    "codigo": "P003",
    "nome": "Tênis Esportivo",
    "descricao": "Tênis leve e respirável, ideal para caminhadas e corridas.",
    "preco": 199.00
  },
  {
    "foto": mochila,
    "codigo": "P004",
    "nome": "Mochila Casual",
    "descricao": "Mochila com compartimento para notebook e bolsos laterais.",
    "preco": 159.90
  },
  {
    "foto": relogio,
    "codigo": "P005",
    "nome": "Relógio Digital",
    "descricao": "Relógio resistente à água, com cronômetro e alarme.",
    "preco": 249.99
  },
  {
    "foto": bone,
    "codigo": "P006",
    "nome": "Boné Trucker",
    "descricao": "Boné com tela traseira e ajuste por snapback.",
    "preco": 69.90
  },
  {
    "foto": jaqueta,
    "codigo": "P007",
    "nome": "Jaqueta Corta Vento",
    "descricao": "Jaqueta leve e resistente à água, ideal para dias frios e chuvosos.",
    "preco": 229.90
  },
  {
    "foto": oculos,
    "codigo": "P008",
    "nome": "Óculos de Sol Clássico",
    "descricao": "Óculos com lentes polarizadas e proteção UV400.",
    "preco": 179.90
  },
  {
    "foto": carteira,
    "codigo": "P009",
    "nome": "Carteira de Couro",
    "descricao": "Carteira masculina em couro legítimo com compartimentos para cartões.",
    "preco": 119.00
  },
  {
    "foto": fone,
    "codigo": "P010",
    "nome": "Fone Bluetooth",
    "descricao": "Fone de ouvido sem fio com microfone e estojo de carregamento.",
    "preco": 299.90
  }
];

// Função que simula a chamada de API para buscar todos os produtos
export const fetchAllProducts = () => {
  // Simula um atraso de rede
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(productsData);
    }, 500);
  });
};
