# Pokemon_typing (ポケモンタイピング)

従来のタイピングサイトでは、語源が日常で使用する言葉遊びだと感じたのでポケモンの名前でタイピングできるサイトを作りました。<br>
Pokemon APIを使用して英語ではありますが、ゲームタイトルを入力するとそのタイトルに出現するポケモンネームがランダムで生成します。<br>
※API使用を復習するProjectなので、サイトUI, タイム設定 , ランキング設定は無し。<br>

## 使用するPokemon API

- エンドポイント: `https://pokeapi.co/api/v2/version-group/{version}/`
- クエリパラメータ:
  - `version` (必須): ポケモンバージョンの名前（例: `red`, `blue`, `gold`）
  - `name`: ランダムに選ばれたポケモンの名前

## タイトル入力 (全てのタイトル[英語])
![/play_typing](https://github.com/user-attachments/assets/047c4beb-bcb0-4bae-bca6-0f1083ee7ea2)

## 生成完了画面
![/play_typing](https://github.com/user-attachments/assets/32f8d5cf-c120-48c1-a184-01f1fb560be6)

## 入力したタイトル, ランダム生成されたポケモン (typingすると色変更)
![/play_typing](https://github.com/user-attachments/assets/196b56b5-e91b-4df3-8e4a-bbdfbc4cf2c3)
