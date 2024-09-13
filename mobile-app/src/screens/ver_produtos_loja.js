import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProdutosLoja({ route }) {
  const { lojaId } = route.params;
  const navigation = useNavigation();

  const [carrinho, setCarrinho] = useState([]);
  const [exibirPromocoes, setExibirPromocoes] = useState(true); // Estado para controlar qual aba está ativa

  const loja = {
    id: '1',
    nome: 'Loja A',
    distancia: '3 Km',
    horario_abertura: '08:00 - 22:00',
    numero_avaliacoes: 250,
    agendamento: 'Grátis',
    tempo_espera: '30-40 min',
    preco_entrega: 'R$ 5,00',
    entrega_gratis: 'Entrega grátis a partir de R$ 50,00',
    imagem: 'https://via.placeholder.com/100',
    categorias: {
      Elétricos: [
        { id: '1', nome: 'Furadeira', preco: 'R$ 150,00', promocao: 'R$ 120,00', imagem: 'https://via.placeholder.com/80', descricao: 'Furadeira de alta potência para uso profissional.', emPromocao: true },
        { id: '2', nome: 'Parafusadeira', preco: 'R$ 200,00', imagem: 'https://via.placeholder.com/80', descricao: 'Parafusadeira compacta com bateria de longa duração.', emPromocao: false },
      ],
      Hidráulicos: [
        { id: '3', nome: 'Torneira', preco: 'R$ 50,00', imagem: 'https://via.placeholder.com/80', descricao: 'Torneira de alta qualidade, ideal para cozinhas e banheiros.', emPromocao: false },
        { id: '4', nome: 'Mangueira', preco: 'R$ 30,00', promocao: 'R$ 25,00', imagem: 'https://via.placeholder.com/80', descricao: 'Mangueira resistente para jardinagem e outras utilidades.', emPromocao: true },
      ],
      Alimentos: [
        { id: '5', nome: 'Arroz', preco: 'R$ 20,00', imagem: 'https://via.placeholder.com/80', descricao: 'Arroz de alta qualidade, ideal para refeições em família.', emPromocao: false },
        { id: '6', nome: 'Feijão', preco: 'R$ 10,00', imagem: 'https://via.placeholder.com/80', descricao: 'Feijão selecionado, pronto para o preparo.', emPromocao: false },
      ],
    },
  };

  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);
    alert(`${item.nome} adicionado ao carrinho`);
  };

  const renderizarCategorias = () => {
    return (
      <FlatList
        data={Object.keys(loja.categorias).map((categoria) => ({ nome: categoria, imagem: loja.categorias[categoria][0].imagem }))}
        renderItem={({ item }) => (
          <View style={styles.item_categoria}>
            <Image source={{ uri: item.imagem }} style={styles.imagem_categoria} />
            <Text style={styles.nome_categoria}>{item.nome}</Text>
          </View>
        )}
        keyExtractor={(item) => item.nome}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categorias_container}
      />
    );
  };

  const renderizarProdutosPorCategoria = (categoria) => {
    const produtos = loja.categorias[categoria].filter((produto) => (exibirPromocoes ? produto.emPromocao : true));

    if (produtos.length === 0) return null;

    return (
      <View key={categoria} style={styles.categoria_section}>
        <Text style={styles.categoria_titulo}>{categoria}</Text>
        <FlatList
          data={produtos}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item_produto}
              onPress={() => navigation.navigate('DetalhesProduto', { produto: item })}
            >
              <Image source={{ uri: item.imagem }} style={styles.imagem_produto} />
              <Text style={styles.nome_produto}>{item.nome}</Text>
              {item.emPromocao ? (
                <View>
                  <Text style={styles.preco_promocao}>{item.promocao} </Text>
                  <Text style={styles.preco_original}>{item.preco}</Text>
                </View>
              ) : (
                <Text style={styles.preco_produto}>{item.preco}</Text>
              )}
              <TouchableOpacity style={styles.botao_adicionar} onPress={() => adicionarAoCarrinho(item)}>
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info_loja}>
          <Text style={styles.nome_loja}>{loja.nome}</Text>
          <Text style={styles.horario_loja}>Aberto até: {loja.horario_abertura}</Text>
          <Text style={styles.horario_loja}>Distancia: {loja.distancia} </Text>
        </View>
        <Image source={{ uri: loja.imagem }} style={styles.imagem_loja} />
      </View>

      <View style={styles.avaliacoes}>
        <Ionicons name="star" size={20} color="#ffd700" />
        <Text style={styles.numero_avaliacoes}>{loja.numero_avaliacoes} avaliações</Text>
      </View>

      <View style={styles.info_adicional}>
        <Text style={styles.texto_info}>Tempo: {loja.tempo_espera} | Preço: {loja.preco_entrega}</Text>
      </View>

      <View style={styles.campo_busca}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput placeholder="Buscar item ou produto" style={styles.input_busca} />
      </View>

      {/* Botões para alternar entre promoção e todos os produtos */}
      <View style={styles.botoesFiltro}>
        <TouchableOpacity
          style={[styles.botaoFiltro, exibirPromocoes && styles.botaoAtivo]}
          onPress={() => setExibirPromocoes(true)}
        >
          <Text style={[styles.textoBotao, exibirPromocoes && styles.textoBotaoAtivo]}>Promoção</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoFiltro, !exibirPromocoes && styles.botaoAtivo]}
          onPress={() => setExibirPromocoes(false)}
        >
          <Text style={[styles.textoBotao, !exibirPromocoes && styles.textoBotaoAtivo]}>Padrão</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.categoria_titulo}>Categorias</Text>
      {renderizarCategorias()}

      {Object.keys(loja.categorias).map(renderizarProdutosPorCategoria)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  info_loja: {
    flex: 1,
  },
  nome_loja: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  horario_loja: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  imagem_loja: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avaliacoes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  numero_avaliacoes: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  info_adicional: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  texto_info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  campo_busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  input_busca: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  botoesFiltro: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  botaoFiltro: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 5,
  },
  botaoAtivo: {
    backgroundColor: '#3ad3f3',
  },
  textoBotao: {
    fontSize: 16,
    color: '#3ad3f3',
  },
  textoBotaoAtivo: {
    color: '#fff',
  },
  categorias_container: {
    marginBottom: 20,
  },
  item_categoria: {
    alignItems: 'center',
    marginRight: 15,
  },
  imagem_categoria: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  nome_categoria: {
    fontSize: 14,
    color: '#333',
  },
  categoria_section: {
    marginBottom: 20,
  },
  categoria_titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  item_produto: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    position: 'relative',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
    width: 130,
    height: 160,
  },
  imagem_produto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  nome_produto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  preco_produto: {
    fontSize: 14,
    color: '#777',
  },
  preco_promocao: {
    fontSize: 14,
    color: '#d9534f',
    fontWeight: 'bold',
  },
  preco_original: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  botao_adicionar: {
    position: 'absolute',
    bottom: 65,
    right: 10,
    backgroundColor: '#3ad3f3',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});