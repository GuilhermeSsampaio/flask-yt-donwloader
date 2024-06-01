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


## Instalar nova lib:
    ```bash
    pip install nova_biblioteca
    pip freeze > requirements.txt
    ```

## Rodar projeto
      ```bash
    python run.py
    ```