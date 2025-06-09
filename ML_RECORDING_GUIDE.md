# Flutter Game ML Recording System

## 🎯 Overview

This system creates standardized notation for Flutter Stock Exchange game moves, similar to chess notation, for machine learning analysis.

## 📁 Files

- `game_recorder.py` - Python SQLite recorder (server-side)
- `game_recorder.js` - JavaScript recorder (browser-side)  
- `game.db` - SQLite database with recorded games

## 🎮 Notation System

### Standard Format: `[Action]:[Player]:[Target]:[Value]:[Extra]`

### Action Codes:
- **R** = Roll dice
- **B** = Buy shares
- **S** = Sell shares
- **D** = Dividend received
- **M** = Market event
- **E** = Round end
- **W** = Game win
- **AI** = AI decision
- **GS** = Game state snapshot

## 📝 Example Notations

```
R:4:yellow:130        # Roll 4, yellow player, move to position 130
B:red:yellow:120      # Buy red shares, by yellow, at price 120
S:blue:green:150      # Sell blue shares, by green, at price 150
D:20%:yellow:40       # 20% dividend, yellow receives £40
M:news:yellow:6       # Market news, yellow advances 6 spaces
E:yellow:220          # Round end, yellow reached £220
W:green:850           # Win condition, green has £850 total
AI:yellow:buy:red     # AI decision: yellow buys red shares
GS:yellow:1200:45     # Game state: yellow's turn, £1200 total cash, turn 45
```

## 🗄️ Database Schema

### Tables:
1. **games** - Game metadata and results
2. **moves** - Individual moves in standardized notation
3. **game_states** - Complete game states for feature engineering
4. **ml_features** - Derived features for ML training

## 🔧 JavaScript Integration

Add to your HTML:
```html
<script src="game_recorder.js"></script>
```

Record moves:
```javascript
// Start game
mlRecorder.startGame(600, 4, personalities);

// Record dice roll
mlRecorder.recordDiceRoll(4, "yellow", 130);

// Record trading
mlRecorder.recordBuy("yellow", "red", 120);
mlRecorder.recordSell("green", "blue", 150);

// Export data
mlRecorder.downloadData("json");  // Download as JSON
mlRecorder.downloadData("csv");   // Download as CSV
mlRecorder.downloadData("chess"); // Download as notation string
```

## 🐍 Python Usage

```python
from game_recorder import FlutterGameRecorder

recorder = FlutterGameRecorder()

# Start recording
game_id = recorder.start_game(600, 4, {
    "yellow": "conservativeInvestor",
    "red": "aggressiveSpeculator"
})

# Record moves
recorder.record_move(game_id, 1, "R:4:yellow:130", "yellow", "R", "move", 4)
recorder.record_move(game_id, 1, "B:red:yellow:120", "yellow", "B", "red", 120)

# End game
recorder.end_game(game_id, "yellow", 45)
```

## 📊 ML Analysis

### Data Export Formats:
- **JSON** - Complete structured data
- **CSV** - Tabular format for pandas/R
- **Chess-style** - Compact notation string

### Use Cases:
1. **Pattern Recognition** - Identify winning strategies
2. **Personality Analysis** - Compare AI behavior patterns
3. **Decision Trees** - Build rule-based models
4. **Neural Networks** - Train on game sequences
5. **Reinforcement Learning** - Reward/penalty analysis

## 🎮 Browser Console Commands

```javascript
// Toggle recording
mlRecorder.recordingEnabled = false;  // Disable
mlRecorder.recordingEnabled = true;   // Enable

// View statistics
mlRecorder.printStats();

// Export current game
mlRecorder.exportGameData();

// Download data
mlRecorder.downloadData("json");
```

## 🔍 Example Chess-Style Game String

```
R:6:yellow:130 B:red:yellow:120 R:3:red:110 S:yellow:red:125 R:4:blue:140 
D:20%:blue:50 R:2:green:90 B:blue:green:140 R:5:yellow:150 M:news:yellow:6 
E:yellow:200 W:yellow:725
```

This compact format allows for easy pattern matching and sequence analysis!

## 📈 ML Features Available

- Financial metrics (cash ratio, net worth, portfolio diversity)
- Market conditions (volatility, momentum) 
- Personality traits (risk tolerance, aggressiveness)
- Decision patterns (buy/sell timing, position sizing)
- Success metrics (win rate, wealth accumulation)

Perfect for training models to predict optimal trading strategies! 🤖✨ 