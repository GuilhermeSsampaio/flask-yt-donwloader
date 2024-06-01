
// Definição da função addVideo no escopo global
function addVideo(videoId, title) {
    // Verifica se o vídeo já está na lista
    if (!videos.includes(`https://www.youtube.com/watch?v=${videoId}`)) {
        videos.push(`https://www.youtube.com/watch?v=${videoId}`);
        msg.innerHTML = 'Vídeo adicionado com sucesso!';
        const li = document.createElement('li');
        const br = document.createElement('br');
        li.setAttribute('data-video-id', videoId); // Adicione um atributo para identificar o vídeo
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-danger');
        button.textContent = 'Remover';
        button.onclick = function() {
            removeVideo(videoId);
        };
        li.textContent = title;
        li.appendChild(br);
        li.appendChild(button);
        videoList.appendChild(li);

        // Armazenar a referência ao elemento de lista associado ao vídeo
        videoElements[videoId] = li;

        // Atualizar a exibição do botão "Download All"
        updateDownloadButton();
    } else {
        alert("Este vídeo já está na lista.");
    }
}


// Função para remover um vídeo da lista
function removeVideo(videoId) {
    const index = videos.findIndex(video => video === `https://www.youtube.com/watch?v=${videoId}`);
    if (index !== -1) {
        videos.splice(index, 1);

        // Remova o elemento da lista visualmente
        const liToRemove = videoElements[videoId];
        if (liToRemove) {
            liToRemove.remove();
            delete videoElements[videoId]; // Remova a referência ao elemento removido
        }
        updateDownloadButton();
        msg.innerHTML = 'Vídeo removido com sucesso!';

    }
}

// Função para atualizar a exibição do botão "Download All"
function updateDownloadButton() {
    const downloadAllButton = document.getElementById('downloadAll');
    if (videos.length > 0) {
        downloadAllButton.style.display = 'block';
    } else {
        downloadAllButton.style.display = 'none';
    }
}

// Definição da variável videos no escopo global
let videos = [];
// Armazena referências aos elementos de lista associados aos vídeos
let videoElements = {};


// Bloco de código executado após o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const videoList = document.getElementById('videoList');
    const downloadAllButton = document.getElementById('downloadAll');
    const loadingElement = document.getElementById('loading');
    const msg = document.getElementById('msg');

    const YOUTUBE_API_KEY = ''; // Substitua pela sua chave de API do YouTube obtida no google dev console

    // Função para realizar a pesquisa no YouTube
    searchButton.addEventListener('click', function() {
        const query = document.getElementById('search_query').value;
        if (query) {
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    searchResults.innerHTML = '';
                    data.items.forEach(item => {
                        const videoId = item.id.videoId;
                        const title = item.snippet.title;

                        // Escapando as aspas simples no título
                        const escapedTitle = title.replace(/'/g, "\\'");

                        const thumbnail = item.snippet.thumbnails.default.url;

                        const resultItem = document.createElement('div');
                        resultItem.innerHTML = `
                            <div class='card-body bg-light p-1'>
                            <img src="${thumbnail}" alt="${title} class='card-img-top'">
                            <p class='card-title'>${title}</p>
                            <button class='btn btn-primary' onclick='addVideo("${videoId}", "${escapedTitle}")'>Adicionar</button>
                            </div>
                        `;
                        searchResults.appendChild(resultItem);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Erro ao realizar a pesquisa. Verifique a conexão.");
                });
                setTimeout(() => {
                    // Code to be executed after a 2-second delay
                    document.getElementById('search_query').value = '';

                }, 500);
        }
    });

    // do{
    //     downloadAllButton.style.display = 'none';
    // }while(videos.length == 0);

    // Função para baixar todos os vídeos
    downloadAllButton.addEventListener('click', function() {
        loadingElement.style.display = 'block';
        fetch('/downloads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ links: videos })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message);
            if (data.zip_path) {
                const downloadLink = document.createElement('a');
                downloadLink.href = `/download_zip?zip_path=${encodeURIComponent(data.zip_path)}`;
                downloadLink.innerHTML = '<button class="btn btn-success rounded-pill px-3" type="button">Clique aqui para baixar o arquivo ZIP</button>';
                downloadLink.target = '_blank';
                const container = document.getElementById('downloadLinkContainer');
                container.innerHTML = '';  // Limpa links antigos
                container.appendChild(downloadLink);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ocorreu um erro ao enviar a solicitação.");
        })
        .finally(() => {
            // Ocultar o elemento de carregamento
            loadingElement.style.display = 'none';
        });
    });
});
