// Função para exibir os livros na lista
function exibirLivros(livros) {
    const listaLivros = document.getElementById('livrosLista');
    listaLivros.innerHTML = '';
  
    livros.forEach((livro) => {
      const li = document.createElement('li');
      li.textContent = `${livro.titulo} - ${livro.autor}`;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.addEventListener('click', () => excluirLivro(livro.id));
  
      li.appendChild(deleteBtn);
      listaLivros.appendChild(li);
    });
  }
  
  // Função para obter os livros da API
  async function getLivros() {
    try {
      const response = await fetch('http://localhost:3000/api/livros');
      const livros = await response.json();
      exibirLivros(livros);
    } catch (error) {
      console.log('Erro ao obter os livros:', error);
    }
  }
  
  // Função para adicionar um livro
  async function adicionarLivro(event) {
    event.preventDefault();
  
    const titulo = document.getElementById('inputTitulo').value;
    const autor = document.getElementById('inputAutor').value;
  
    if (!titulo || !autor) {
      return;
    }
  
    const livro = {
      titulo,
      autor,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
      });
  
      if (response.ok) {
        document.getElementById('inputTitulo').value = '';
        document.getElementById('inputAutor').value = '';
        getLivros();
      }
    } catch (error) {
      console.log('Erro ao adicionar o livro:', error);
    }
  }
  
  // Função para excluir um livro
  async function excluirLivro(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/livros/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        getLivros();
      }
    } catch (error) {
      console.log('Erro ao excluir o livro:', error);
    }
  }
  
  // Função para inicializar o aplicativo
  function init() {
    const formLivro = document.getElementById('formLivro');
    formLivro.addEventListener('submit', adicionarLivro);
  
    getLivros();
  }
  
  init();