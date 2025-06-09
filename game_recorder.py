#!/usr/bin/env python3
"""
Flutter Stock Exchange Game - ML Training Data Recorder
Creates standardized notation system for machine learning analysis
"""

import sqlite3
import json
import datetime
from pathlib import Path
from typing import Dict, List, Optional

class FlutterGameRecorder:
    """Records Flutter game moves in standardized notation for ML training"""
    
    def __init__(self, db_path: str = "game.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database with game recording schema"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Games table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS games (
                game_id INTEGER PRIMARY KEY AUTOINCREMENT,
                start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                end_time TIMESTAMP,
                win_target INTEGER,
                player_count INTEGER,
                winner TEXT,
                total_turns INTEGER,
                game_duration_minutes REAL,
                personalities TEXT  -- JSON of player:personality mapping
            )
        """)
        
        # Moves table - standardized notation
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS moves (
                move_id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                turn_number INTEGER,
                move_notation TEXT,  -- Standardized notation like "R:4:yellow:130"
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                player_color TEXT,
                action_type TEXT,    -- R, B, S, D, M, E, W
                target TEXT,         -- Company or position
                value INTEGER,       -- Price, amount, dice roll
                context TEXT,        -- Additional data as JSON
                FOREIGN KEY (game_id) REFERENCES games (game_id)
            )
        """)
        
        # Game states table - for ML feature engineering
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS game_states (
                state_id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                turn_number INTEGER,
                player_color TEXT,
                cash INTEGER,
                share_values TEXT,     -- JSON of company:shares owned
                company_positions TEXT, -- JSON of company:price positions
                traveler_positions TEXT, -- JSON of company:traveler positions
                personality TEXT,
                decision_reasoning TEXT,
                FOREIGN KEY (game_id) REFERENCES games (game_id)
            )
        """)
        
        # ML Features table - derived features for training
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ml_features (
                feature_id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                player_color TEXT,
                turn_number INTEGER,
                -- Financial features
                net_worth INTEGER,
                cash_ratio REAL,
                portfolio_diversity REAL,
                -- Market features
                market_volatility REAL,
                position_momentum REAL,
                -- Personality features
                risk_tolerance REAL,
                aggressiveness REAL,
                trading_frequency REAL,
                -- Decision features
                action_taken TEXT,
                action_value INTEGER,
                success_metric REAL,  -- Calculated post-action
                FOREIGN KEY (game_id) REFERENCES games (game_id)
            )
        """)
        
        conn.commit()
        conn.close()
        print(f"✅ Database initialized: {self.db_path}")
    
    def start_game(self, win_target: int, player_count: int, personalities: Dict[str, str]) -> int:
        """Start recording a new game"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO games (win_target, player_count, personalities)
            VALUES (?, ?, ?)
        """, (win_target, player_count, json.dumps(personalities)))
        
        game_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        print(f"🎮 Started recording game {game_id}")
        return game_id
    
    def record_move(self, game_id: int, turn: int, notation: str, player: str, 
                   action_type: str, target: str = "", value: int = 0, context: Dict = None):
        """Record a single move in standardized notation"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO moves (game_id, turn_number, move_notation, player_color, 
                             action_type, target, value, context)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (game_id, turn, notation, player, action_type, target, value, 
              json.dumps(context) if context else None))
        
        conn.commit()
        conn.close()
    
    def record_game_state(self, game_id: int, turn: int, player: str, 
                         cash: int, shares: Dict, positions: Dict, travelers: Dict,
                         personality: str, reasoning: str = ""):
        """Record complete game state for ML feature engineering"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO game_states (game_id, turn_number, player_color, cash,
                                   share_values, company_positions, traveler_positions,
                                   personality, decision_reasoning)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (game_id, turn, player, cash, json.dumps(shares), 
              json.dumps(positions), json.dumps(travelers), personality, reasoning))
        
        conn.commit()
        conn.close()
    
    def end_game(self, game_id: int, winner: str, total_turns: int):
        """Complete game recording"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Calculate game duration
        cursor.execute("SELECT start_time FROM games WHERE game_id = ?", (game_id,))
        start_time = cursor.fetchone()[0]
        duration = (datetime.datetime.now() - datetime.datetime.fromisoformat(start_time)).total_seconds() / 60
        
        cursor.execute("""
            UPDATE games 
            SET end_time = CURRENT_TIMESTAMP, winner = ?, total_turns = ?, game_duration_minutes = ?
            WHERE game_id = ?
        """, (winner, total_turns, duration, game_id))
        
        conn.commit()
        conn.close()
        
        print(f"🏆 Game {game_id} completed - Winner: {winner} in {total_turns} turns")

# Notation helper functions
def create_notation(action: str, player: str, target: str = "", value: int = 0, extra: str = "") -> str:
    """Create standardized notation string"""
    parts = [action, player]
    if target: parts.append(target)
    if value: parts.append(str(value))
    if extra: parts.append(extra)
    return ":".join(parts)

def parse_notation(notation: str) -> Dict:
    """Parse notation string back into components"""
    parts = notation.split(":")
    return {
        "action": parts[0] if len(parts) > 0 else "",
        "player": parts[1] if len(parts) > 1 else "",
        "target": parts[2] if len(parts) > 2 else "",
        "value": int(parts[3]) if len(parts) > 3 and parts[3].isdigit() else 0,
        "extra": parts[4] if len(parts) > 4 else ""
    }

# Example notation patterns:
"""
DICE ROLLS:
R:4:yellow:130        # Roll 4, yellow player, move to position 130

TRADING:
B:red:yellow:120      # Buy red shares, by yellow, at price 120
S:blue:green:150      # Sell blue shares, by green, at price 150

DIVIDENDS:
D:20%:yellow:40       # 20% dividend, yellow receives £40
D:10%:red:25          # 10% dividend, red receives £25

MARKET EVENTS:
M:news:yellow:advance:6    # Market news, yellow advances 6 spaces
M:slump:red:fall:60        # Slump event, red falls 60 points

ROUND EVENTS:
E:yellow:220:win      # Round end, yellow reached £220, won round
W:green:850           # Win condition, green has £850 total wealth

GAME STATES (for ML):
GS:yellow:300:red:2,blue:1:pos:red:120,blue:110  # Game state snapshot
"""

if __name__ == "__main__":
    # Test the recorder
    recorder = FlutterGameRecorder()
    
    # Example usage
    game_id = recorder.start_game(600, 4, {
        "yellow": "conservativeInvestor", 
        "red": "aggressiveSpeculator",
        "blue": "balancedTrader",
        "green": "dividendHunter"
    })
    
    # Example moves
    recorder.record_move(game_id, 1, "R:4:yellow:130", "yellow", "R", "move", 4)
    recorder.record_move(game_id, 1, "B:red:yellow:120", "yellow", "B", "red", 120)
    
    print("✅ Test recording completed") 