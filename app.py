from flask import Flask, render_template, request, jsonify, send_file
from download import download_music
import os
import zipfile
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/downloads', methods=['POST'])
def downloads():
    data = request.get_json()
    links = data.get('links')
    path = os.path.join(os.getcwd(), 'downloads')  # Diretório temporário no servidor
    if not os.path.exists(path):
        os.makedirs(path)

    mp3_files = []
    for link in links:
        mp3_path = download_music(link, path)
        if mp3_path:
            mp3_files.append(mp3_path)

    zip_filename = os.path.join(path, 'downloaded_music.zip')
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for file in mp3_files:
            zipf.write(file, os.path.basename(file))

    return jsonify({'message': 'Download e conversão concluídos com sucesso!', 'zip_path': zip_filename})

@app.route('/download_zip', methods=['GET'])
def download_zip():
    zip_path = request.args.get('zip_path')
    if zip_path and os.path.exists(zip_path):
        return send_file(zip_path, as_attachment=True)
    else:
        return "Arquivo não encontrado", 404

# if __name__ == '__main__':
#     app.run(debug=True)
