const startButton = document.getElementById('startButton');
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const resultSection_2 = document.getElementById('resultSection_2');
const versionInput = document.getElementById('versionInput');
const displayTitle = document.getElementById('displayTitle');
const pokemonNameSection = document.getElementById('pokemonNameSection');

let pokemonName = '';
let currentIndex = 0;
let isCompleted = false; // 完了フラグ

startButton.addEventListener('click', async function() {
    inputSection.style.display = 'none';
    resultSection.style.display = 'block';

    const version = versionInput.value;
    try {
        const response = await fetch(`/pokemon_by_version?version=${encodeURIComponent(version)}`);
        const data = await response.json();
        pokemonName = data.name;

        // ポケモン名を表示する
        pokemonNameSection.innerHTML = pokemonName.split('').map((char, index) => {
            return `<span class="char">${char}</span>`;
        }).join('');
        currentIndex = 0; // インデックスを初期化
        isCompleted = false; // 完了フラグをリセット
    } catch (error) {
        console.error('Error fetching Pokemon name', error);
    }
});

// EnterキーまたはSpaceキーが押されたときの表示切替処理
function handleDisplayToggle(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        if (resultSection.style.display === 'block') {
            resultSection.style.display = 'none';
            resultSection_2.style.display = 'block';

            const titleText = versionInput.value ? versionInput.value : "タイトル未設定";
            displayTitle.textContent = titleText;
        }
    }
}

// タイピングの入力を処理する関数
function handleTyping(event) {
    if (isCompleted) return; // ゲームが完了したら入力を無視

    // ポケモン名の各文字を取得
    const charElements = document.querySelectorAll('#pokemonNameSection .char');

    if (pokemonName && currentIndex < pokemonName.length) {
        // 入力されたキーがポケモン名の現在の文字と一致するか確認
        const currentChar = pokemonName[currentIndex];

        if (event.key.toLowerCase() === currentChar.toLowerCase()) {
            // 正しい文字が入力された場合、色を赤に変更
            charElements[currentIndex].style.color = 'red';
            currentIndex++;

            // すべての文字が正しく入力された場合の処理
            if (currentIndex === pokemonName.length) {
                isCompleted = true;
                alert('タイピング完了！');
            }
        }
    }
}

// キー入力全般を処理するリスナー
document.addEventListener('keydown', function(event) {
    handleDisplayToggle(event); // 表示切替の処理
    handleTyping(event); // タイピングの処理
});





