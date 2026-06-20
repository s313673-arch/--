// ======================================
// 台灣16張麻將 - 牌庫系統
// tiles.js
// ======================================

const TileManager = {

    wall: [],

    // 建立牌牆
    createWall() {

        this.wall = [];

        // 萬子
        for (let n = 1; n <= 9; n++) {
            for (let i = 0; i < 4; i++) {
                this.wall.push(`萬${n}`);
            }
        }

        // 筒子
        for (let n = 
