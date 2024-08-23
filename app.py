from flask import Flask, render_template, jsonify, request
import requests
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play_typing')
def play_typing():
    return render_template('play_typing.html')

@app.route('/pokemon_by_version', methods=['GET'])
def get_pokemon_by_version():
    version_name = request.args.get('version')
    if not version_name:
        return jsonify({"error": "Version not specified"}), 400

    # ポケモンバージョンの情報を取得
    version_response = requests.get(f"https://pokeapi.co/api/v2/version-group/{version_name}/")
    if version_response.status_code != 200:
        return jsonify({"error": "Version not found"}), 404

    version_data = version_response.json()

    # デバッグ用
    #print(version_data)
    
    # ポケモン図鑑のURLを取得
    pokedex_url = version_data['pokedexes'][0]['url'] #最初のポケモン図鑑のURLを使用
    
    # ポケモン図鑑からポケモンリストを取得
    pokedex_response = requests.get(pokedex_url)
    if pokedex_response.status_code != 200:
        return jsonify({"error": "Error fetching Pokemon list"}), 500
    
    pokedex_data = pokedex_response.json()
    pokemon_species = pokedex_data['pokemon_entries']

    if not pokemon_species:
        return jsonify({"error": "No Pokémon found for the specified version"}), 404

    # ランダムにポケモンを選択
    selected_pokemon = random.choice(pokemon_species)
    pokemon_name = selected_pokemon['pokemon_species']['name']
    
    return jsonify({"name": pokemon_name})

if __name__ == "__main__":
    app.run(debug=True)

