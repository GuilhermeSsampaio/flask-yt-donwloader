# Passos para usar o app
## 1 - Crie um ambiente virtual para seu projeto:

    ```bash
    python -m venv venv
    ```
## 2 - Ative o ambiente virtual:

Windows: 

    ```bash
    venv\Scripts\activate
    ```


Linux/MacOs

    ```bash
    source venv/bin/activate
    ```


## Instalar as dependências:
    ```bash
    pip install -r requirements.txt
    ```
## Setar a sua api key obtida no [google cloud console](https://console.cloud.google.com/)
 - 1 - Vá ao seu console
 - 2 - Crie um projeto
 - 3 - Ative uma chave de api YouTube Data API v3
 - 4 - Vá no arquivo main.js e adicione sua key em const YOUTUBE_API_KEY = ''

## Instalar nova lib:
    ```bash
    pip install nova_biblioteca
    pip freeze > requirements.txt
    ```

## Rodar projeto
      ```bash
    python run.py
    ```