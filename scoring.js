// ======================================
// 台灣16張麻將
// scoring.js
// ======================================

const MahjongScoring = {

    // -------------------
    // 計算台數
    // -------------------

    calculateScore(player, options = {}) {

        const result = {

            tai: 0,
            details: [],
            points: 0
        };

       
