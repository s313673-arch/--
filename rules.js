// ======================================
// 台灣16張麻將
// 規則引擎
// rules.js
// ======================================

const MahjongRules = {

    // ------------------
    // 胡牌判定
    // ------------------

    isWinningHand(hand) {

        if (!hand || hand.length % 3 !== 2) {
            return false;
        }

        const counts = {};

        hand.forEach(tile => {
            counts[tile] = (counts[tile] || 0) + 1;
        });

        const uniqueTiles = Object.keys(counts);

        // 嘗試每個可能的將牌

        for (const pairTile of uniqueTiles) {

            if (counts[pairTile] < 2)
                continue;

            const tempCounts =
                JSON.parse(JSON.stringify(counts));

            tempCounts[pairTile] -= 2;

            if (this.canFormMelds(tempCounts)) {
                return true;
            }
        }

        return false;
    },

    // ------------------
    // 是否能拆成面子
    // ------------------

    canFormMelds(counts) {

        const tiles =
            Object.keys(counts)
            .filter(t => counts[t] > 0);

        if (tiles.length === 0)
            return true;

        const tile = tiles[0];

        // 刻子

        if (counts[tile] >= 3) {

            counts[tile] -= 3;

            if (this.canFormMelds(counts))
                return true;

            counts[tile] += 3;
        }

        // 順子

        if (!TileManager.isHonor(tile) &&
            !TileManager.isFlower(tile)) {

            const suit =
                TileManager.getTileSuit(tile);

            const num =
                TileManager.getTileNumber(tile);

            const t2 = suit + (num + 1);
            const t3 = suit + (num + 2);

            if (
                counts[t2] > 0 &&
                counts[t3] > 0
            ) {

                counts[tile]--;
                counts[t2]--;
                counts[t3]--;

                if (
                    this.canFormMelds(counts)
                ) {
                    return true;
                }

                counts[tile]++;
                counts[t2]++;
                counts[t3]++;
            }
        }

        return false;
    },

    // ------------------
    // 是否可碰
    // ------------------

    canPon(hand, tile) {

        let count = 0;

        hand.forEach(t => {

            if (t === tile)
                count++;
        });

        return count >= 2;
    },

    // ------------------
    // 是否可槓
    // ------------------

    canKan(hand, tile) {

        let count = 0;

        hand.forEach(t => {

            if (t === tile)
                count++;
        });

        return count >= 3;
    },

    // ------------------
    // 是否可吃
    // ------------------

    canChi(hand, tile) {

        if (
            TileManager.isHonor(tile) ||
            TileManager.isFlower(tile)
        ) {
            return false;
        }

        const suit =
            TileManager.getTileSuit(tile);

        const num =
            TileManager.getTileNumber(tile);

        const left2 =
            suit + (num - 2);

        const left1 =
            suit + (num - 1);

        const right1 =
            suit + (num + 1);

        const right2 =
            suit + (num + 2);

        // x-2 x-1 tile

        if (
            hand.includes(left2) &&
            hand.includes(left1)
        ) {
            return true;
        }

        // x-1 tile x+1

        if (
            hand.includes(left1) &&
            hand.includes(right1)
        ) {
            return true;
        }

        // tile x+1 x+2

        if (
            hand.includes(right1) &&
            hand.includes(right2)
        ) {
            return true;
        }

        return false;
    },

    // ------------------
    // 是否聽牌
    // ------------------

    isTenpai(hand) {

        const allTiles =
            TileManager.getAllTileTypes();

        for (const tile of allTiles) {

            const testHand = [...hand];

            testHand.push(tile);

            if (
                this.isWinningHand(testHand)
            ) {
                return true;
            }
        }

        return false;
    },

    // ------------------
    // 聽哪些牌
    // ------------------

    getWaitingTiles(hand) {

        const result = [];

        const allTiles =
            TileManager.getAllTileTypes();

        for (const tile of allTiles) {

            const testHand = [...hand];

            testHand.push(tile);

            if (
                this.isWinningHand(testHand)
            ) {

                result.push(tile);
            }
        }

        return result;
    },

    // ------------------
    // 自摸判定
    // ------------------

    canTsumo(hand) {

        return this.isWinningHand(hand);
    },

    // ------------------
    // 榮和判定
    // ------------------

    canRon(hand, tile) {

        const temp = [...hand];

        temp.push(tile);

        return this.isWinningHand(temp);
    }

};
