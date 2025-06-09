/**
 * Flutter Stock Exchange Game - ML Training Data Recorder (JavaScript)
 * Browser-side recorder that creates standardized notation for ML analysis
 */

class FlutterGameRecorder {
    constructor() {
        this.currentGameId = null;
        this.turnCounter = 0;
        this.moves = [];
        this.gameStates = [];
        this.recordingEnabled = true;
    }

    // Standardized notation creation
    createNotation(action, player, target = "", value = 0, extra = "") {
        const parts = [action, player];
        if (target) parts.push(target);
        if (value) parts.push(value.toString());
        if (extra) parts.push(extra);
        return parts.join(":");
    }

    // Start recording a new game
    startGame(winTarget, playerCount, personalities) {
        this.currentGameId = `game_${Date.now()}`;
        this.turnCounter = 0;
        this.moves = [];
        this.gameStates = [];
        
        const gameStart = {
            gameId: this.currentGameId,
            timestamp: new Date().toISOString(),
            winTarget: winTarget,
            playerCount: playerCount,
            personalities: personalities
        };
        
        console.log(`🎮 ML Recording started: ${this.currentGameId}`);
        console.log(`📊 Players: ${playerCount}, Target: £${winTarget}`);
        
        // Store game start in localStorage for now
        localStorage.setItem(`game_${this.currentGameId}`, JSON.stringify(gameStart));
        
        return this.currentGameId;
    }

    // Record dice roll
    recordDiceRoll(diceValue, playerColor, newPosition) {
        if (!this.recordingEnabled) return;
        
        this.turnCounter++;
        const notation = this.createNotation("R", playerColor, "move", diceValue, newPosition);
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "R",
            player: playerColor,
            target: "move",
            value: diceValue,
            context: { newPosition: newPosition }
        });
        
        console.log(`🎲 ML: ${notation}`);
    }

    // Record buy transaction
    recordBuy(buyerColor, targetCompany, price, sharesCount = 1) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("B", buyerColor, targetCompany, price, sharesCount);
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "B",
            player: buyerColor,
            target: targetCompany,
            value: price,
            context: { shares: sharesCount, totalCost: price + 5 }
        });
        
        console.log(`💰 ML: ${notation}`);
    }

    // Record sell transaction
    recordSell(sellerColor, targetCompany, price, sharesCount = 1) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("S", sellerColor, targetCompany, price, sharesCount);
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "S",
            player: sellerColor,
            target: targetCompany,
            value: price,
            context: { shares: sharesCount }
        });
        
        console.log(`💸 ML: ${notation}`);
    }

    // Record dividend
    recordDividend(playerColor, dividendType, amount) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("D", playerColor, dividendType, amount);
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "D",
            player: playerColor,
            target: dividendType,
            value: amount,
            context: { dividendType: dividendType }
        });
        
        console.log(`💵 ML: ${notation}`);
    }

    // Record market event
    recordMarketEvent(playerColor, eventType, effect, value = 0) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("M", playerColor, eventType, value, effect);
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "M",
            player: playerColor,
            target: eventType,
            value: value,
            context: { effect: effect }
        });
        
        console.log(`📰 ML: ${notation}`);
    }

    // Record round end
    recordRoundEnd(winnerColor, winningPosition) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("E", winnerColor, "round", winningPosition, "win");
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "E",
            player: winnerColor,
            target: "round",
            value: winningPosition,
            context: { roundWin: true }
        });
        
        console.log(`🏁 ML: ${notation}`);
    }

    // Record game win
    recordGameWin(winnerColor, finalWealth) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("W", winnerColor, "game", finalWealth);
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "W",
            player: winnerColor,
            target: "game",
            value: finalWealth,
            context: { gameWin: true }
        });
        
        console.log(`🏆 ML: ${notation}`);
    }

    // Record complete game state for ML feature engineering
    recordGameState(gameState, currentPlayer) {
        if (!this.recordingEnabled) return;
        
        const state = {
            turn: this.turnCounter,
            timestamp: new Date().toISOString(),
            currentPlayer: currentPlayer,
            playerCash: gameState.playerCash,
            playerShares: gameState.playerShares,
            playerPositions: gameState.playerPositions,
            travelerPositions: gameState.travelerPositions,
            personalities: gameState.playerPersonalities
        };
        
        this.gameStates.push(state);
        
        // Compact notation for game state
        const cashTotal = Object.values(gameState.playerCash).reduce((a, b) => a + b, 0);
        const notation = this.createNotation("GS", currentPlayer, "state", cashTotal, this.turnCounter);
        
        console.log(`📊 ML State: ${notation}`);
    }

    // Record AI decision reasoning
    recordAIDecision(playerColor, decision, reasoning, personality = null) {
        if (!this.recordingEnabled) return;
        
        const notation = this.createNotation("AI", playerColor, decision.action, 
                                           decision.company || 0, reasoning.substring(0, 20));
        
        this.recordMove({
            turn: this.turnCounter,
            notation: notation,
            action: "AI",
            player: playerColor,
            target: decision.action,
            value: 0,
            context: { 
                decision: decision,
                reasoning: reasoning,
                personality: personality
            }
        });
        
        console.log(`🤖 ML: ${notation}`);
    }

    // Internal method to record moves
    recordMove(moveData) {
        try {
            // Safely clone gameState if present
            if (moveData.gameState) {
                moveData.gameState = this.safeCloneGameState(moveData.gameState);
            }
            
            moveData.gameId = this.currentGameId;
            moveData.timestamp = new Date().toISOString();
            this.moves.push(moveData);
        } catch (error) {
            console.warn('ML Recording error:', error.message);
        }
    }

    // Safely clone game state to avoid circular reference errors
    safeCloneGameState(gameState) {
        try {
            return JSON.parse(JSON.stringify(gameState));
        } catch (error) {
            // If JSON fails, create a safe subset
            return {
                playerPositions: gameState.playerPositions || {},
                travelerPositions: gameState.travelerPositions || {},
                playerCash: gameState.playerCash || {},
                playerShares: gameState.playerShares || {},
                playerPersonalities: gameState.playerPersonalities || {},
                activeColors: gameState.activeColors || [],
                currentPlayer: gameState.currentPlayer || 0,
                roundInProgress: gameState.roundInProgress || false
            };
        }
    }

    // Export data for ML analysis
    exportGameData() {
        const data = {
            gameId: this.currentGameId,
            moves: this.moves,
            gameStates: this.gameStates,
            moveCount: this.moves.length,
            totalTurns: this.turnCounter
        };
        
        // Save to localStorage
        localStorage.setItem(`moves_${this.currentGameId}`, JSON.stringify(data));
        
        console.log(`📤 ML Data exported: ${this.moves.length} moves, ${this.gameStates.length} states`);
        return data;
    }

    // Convert to standardized formats
    exportAsChessStyle() {
        // Create chess-like notation string
        return this.moves.map(move => move.notation).join(" ");
    }

    exportAsJSON() {
        return JSON.stringify(this.exportGameData(), null, 2);
    }

    exportAsCSV() {
        const headers = "turn,notation,action,player,target,value,timestamp";
        const rows = this.moves.map(m => 
            `${m.turn},${m.notation},${m.action},${m.player},${m.target},${m.value},${m.timestamp}`
        );
        return [headers, ...rows].join("\n");
    }

    // Download exported data
    downloadData(format = "json") {
        let data, filename, mimeType;
        
        switch(format) {
            case "json":
                data = this.exportAsJSON();
                filename = `flutter_game_${this.currentGameId}.json`;
                mimeType = "application/json";
                break;
            case "csv":
                data = this.exportAsCSV();
                filename = `flutter_game_${this.currentGameId}.csv`;
                mimeType = "text/csv";
                break;
            case "chess":
                data = this.exportAsChessStyle();
                filename = `flutter_game_${this.currentGameId}.txt`;
                mimeType = "text/plain";
                break;
        }
        
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log(`💾 Downloaded: ${filename}`);
    }

    // Print comprehensive statistics
    printStats() {
        const actions = this.moves.reduce((acc, move) => {
            acc[move.action] = (acc[move.action] || 0) + 1;
            return acc;
        }, {});
        
        console.log("=== COMPREHENSIVE GAME STATISTICS ===");
        console.log(`🎮 Game ID: ${this.currentGameId}`);
        console.log(`⏰ Turns: ${this.turnCounter}`);
        console.log(`📊 Total Moves: ${this.moves.length}`);
        console.log(`🎯 Recording Status: ${this.recordingEnabled ? 'ACTIVE' : 'PAUSED'}`);
        
        console.log("\n📈 Action Breakdown:");
        Object.entries(actions).forEach(([action, count]) => {
            console.log(`  ${action}: ${count}`);
        });
        
        // Detailed analysis
        this.printDetailedAnalysis();
        
        console.log("===============================");
        return actions;
    }

    // Detailed analysis for ML insights
    printDetailedAnalysis() {
        const moves = this.moves;
        if (moves.length === 0) return;
        
        console.log("\n🔍 DETAILED ANALYSIS:");
        
        // Dice roll analysis
        const diceRolls = moves.filter(m => m.action === 'dice_roll');
        if (diceRolls.length > 0) {
            const avgRoll = diceRolls.reduce((sum, m) => sum + m.numberResult, 0) / diceRolls.length;
            console.log(`🎲 Dice Rolls: ${diceRolls.length} (avg: ${avgRoll.toFixed(2)})`);
        }
        
        // Trading analysis
        const trades = moves.filter(m => m.action.includes('shares'));
        const buys = moves.filter(m => m.action.includes('buy'));
        const sells = moves.filter(m => m.action.includes('sell'));
        console.log(`💰 Trading: ${trades.length} total (${buys.length} buys, ${sells.length} sells)`);
        
        // Special events
        const slumps = moves.filter(m => m.action === 'slump_effect');
        const marketNews = moves.filter(m => m.action === 'market_news_triggered');
        const dividends = moves.filter(m => m.action === 'dividend_paid');
        const bankruptcies = moves.filter(m => m.action === 'bankruptcy');
        
        console.log(`📰 Market Events: ${marketNews.length} market news, ${slumps.length} slumps`);
        console.log(`💵 Dividends: ${dividends.length} payments`);
        if (bankruptcies.length > 0) {
            console.log(`💀 Bankruptcies: ${bankruptcies.length}`);
        }
        
        // Insurance usage
        const antiSlump = moves.filter(m => m.action === 'anti_slump_used');
        if (antiSlump.length > 0) {
            console.log(`🛡️ Anti-Slump Cards Used: ${antiSlump.length}`);
        }
        
        // Round analysis
        const rounds = moves.filter(m => m.action === 'round_end');
        if (rounds.length > 0) {
            console.log(`🏁 Rounds Completed: ${rounds.length}`);
        }
    }

    // Generate comprehensive report
    generateReport() {
        const report = {
            gameId: this.currentGameId,
            totalMoves: this.moves.length,
            totalStates: this.gameStates.length,
            recordingDuration: this.moves.length > 0 ? 
                new Date(this.moves[this.moves.length - 1].timestamp) - new Date(this.moves[0].timestamp) : 0,
            
            // Action counts
            actionCounts: this.moves.reduce((acc, move) => {
                acc[move.action] = (acc[move.action] || 0) + 1;
                return acc;
            }, {}),
            
            // Game flow metrics
            diceRolls: this.moves.filter(m => m.action === 'dice_roll').length,
            tradesExecuted: this.moves.filter(m => m.action.includes('shares')).length,
            specialEvents: this.moves.filter(m => 
                ['slump_effect', 'market_news_triggered', 'dividend_paid'].includes(m.action)
            ).length,
            
            // Financial metrics
            totalDividendsPaid: this.moves
                .filter(m => m.action === 'dividend_paid')
                .reduce((sum, m) => sum + (m.totalDividendsPaid || 0), 0),
            
            // Risk events
            slumpEvents: this.moves.filter(m => m.action === 'slump_effect').length,
            antiSlumpUsage: this.moves.filter(m => m.action === 'anti_slump_used').length,
            bankruptcies: this.moves.filter(m => m.action === 'bankruptcy').length,
            
            // Game completion
            roundsCompleted: this.moves.filter(m => m.action === 'round_end').length,
            gameEnded: this.moves.some(m => m.action === 'game_end'),
            
            // Timestamps
            startTime: this.moves.length > 0 ? this.moves[0].timestamp : null,
            endTime: this.moves.length > 0 ? this.moves[this.moves.length - 1].timestamp : null
        };
        
        return report;
    }
}

// Add missing methods needed by the HTML interface
FlutterGameRecorder.prototype.startNewGame = function() {
    this.currentGameId = `game_${Date.now()}`;
    this.turnCounter = 0;
    this.moves = [];
    this.gameStates = [];
    console.log(`🎮 ML Recording started: ${this.currentGameId}`);
    return this.currentGameId;
};

FlutterGameRecorder.prototype.endGame = function(winnerId, finalScore) {
    this.recordGameWin(winnerId, finalScore);
    console.log(`🏆 Game ended: ${winnerId} wins with £${finalScore}`);
};

FlutterGameRecorder.prototype.exportData = function() {
    return this.exportAsJSON();
};

FlutterGameRecorder.prototype.toggleRecording = function() {
    this.recordingEnabled = !this.recordingEnabled;
    console.log(`🎬 Recording ${this.recordingEnabled ? 'enabled' : 'disabled'}`);
    return this.recordingEnabled;
};

// Global recorder instance
window.mlRecorder = new FlutterGameRecorder(); 