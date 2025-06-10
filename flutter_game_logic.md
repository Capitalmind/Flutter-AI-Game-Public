# Flutter Stock Exchange Game - Logical Flow & Rules Engine

## 1. GAME INITIALIZATION

### 1.1 Setup Parameters
```
CONSTANTS:
- STARTING_MONEY = 300
- DEFAULT_WIN_TARGET = 600
- BROKERAGE_FEE = 5
- PAR_VALUE = 100
- BONUS_THRESHOLD = 200
- BANKRUPTCY_THRESHOLD = 10
- SLUMP_FALLBACK = 60 (6 spaces × 10)
- MARKET_NEWS_POSITION = 130
- SLUMP_POSITION = 190

COMPANIES = [
  {id: "yellow", name: "Fairfit Furniture Company", column: 2},
  {id: "red", name: "Atomic Airways Company", column: 3},
  {id: "blue", name: "Easygoing Engineering Co.", column: 4},
  {id: "green", name: "Diggers Diamond Mines", column: 6},
  {id: "black", name: "Bluebottle Brewery Company", column: 7},
  {id: "white", name: "Captivating Cosmetic Company", column: 8}
]

BOARD_POSITIONS = [200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
SPECIAL_POSITIONS = {
  200+: "20% dividend + 2 parent spaces up",
  190: "SLUMP - fall back 6 spaces",
  180: "15% dividend + 1 parent space up", 
  170: "10% dividend + 1 parent space up",
  160: "5% dividend + 1 parent space up",
  130: "MARKET_NEWS",
  0: "BANKRUPTCY"
}
```

### 1.2 Game State Initialization
```
FOR each_company IN COMPANIES:
  parent_position[company.id] = PAR_VALUE
  traveler_position[company.id] = PAR_VALUE
  
FOR each_active_player IN active_players:
  player_cash[player] = STARTING_MONEY
  player_shares[player] = {} // empty share portfolio
  anti_slump_cards[player] = 0

game_state = {
  current_player_index: 0,
  active_companies: selected_companies,
  round_in_progress: false,
  market_cards: shuffle(MARKET_NEWS_CARDS),
  insurance_cards: INSURANCE_CARDS
}
```

## 2. TURN EXECUTION FLOW

### 2.1 Turn Start Conditions
```
PRECONDITIONS:
- round_in_progress == false
- active_companies.length > 0
- current_player exists in active_companies

PROCESS:
1. Set current_company = active_companies[current_player_index]
2. Log turn start for current_company
3. Proceed to TRADING_PHASE
```

### 2.2 Trading Phase (Rule 8a)
```
RULE_8A_TRADING:
  CONSTRAINT: "Player may only buy or sell shares immediately before throwing dice"
  
  WHILE (player_wants_to_trade AND round_in_progress == false):
    DISPLAY available_actions = ["buy", "sell", "hold"]
    
    IF action == "buy":
      EXECUTE buy_shares_process()
    ELIF action == "sell":
      EXECUTE sell_shares_process()
    ELIF action == "hold":
      BREAK trading_loop
      
  PROCEED_TO dice_rolling_phase
```

### 2.3 Buy Shares Process (Rule 8b-8e)
```
BUY_SHARES_PROCESS:
  INPUT: target_company_id
  
  VALIDATIONS:
    - target_company_id IN active_companies
    - broker_has_certificates[target_company_id] > 0
    - share_price = parent_position[target_company_id]
    - total_cost = share_price + BROKERAGE_FEE
    - player_cash[current_player] >= total_cost
    
  IF all_validations_pass:
    player_cash[current_player] -= total_cost
    player_shares[current_player][target_company_id] += 1
    broker_certificates[target_company_id] -= 1
    LOG transaction
    RETURN success
  ELSE:
    RETURN failure_reason
```

### 2.4 Sell Shares Process (Rule 8d)
```
SELL_SHARES_PROCESS:
  INPUT: target_company_id
  
  VALIDATIONS:
    - target_company_id IN active_companies
    - player_shares[current_player][target_company_id] > 0
    - share_price = parent_position[target_company_id]
    
  IF all_validations_pass:
    player_cash[current_player] += share_price
    player_shares[current_player][target_company_id] -= 1
    broker_certificates[target_company_id] += 1
    LOG transaction
    RETURN success
  ELSE:
    RETURN failure_reason
```

### 2.5 Dice Rolling Phase (Rule 7)
```
DICE_ROLLING_PHASE:
  PRECONDITION: round_in_progress == false
  
  number_dice = random(1, 6)
  color_dice = random_choice(active_companies)
  
  LOG dice_result(number_dice, color_dice)
  PROCEED_TO peg_movement_phase(color_dice, number_dice)
```

## 3. PEG MOVEMENT & SPECIAL POSITIONS

### 3.1 Traveler Peg Movement
```
MOVE_TRAVELER_PEG:
  INPUT: company_id, spaces
  
  current_position = traveler_position[company_id]
  new_position = current_position + (spaces * 10)
  
  // CRITICAL RULE 11 CHECK - Round End Override
  IF new_position >= 200:
    traveler_position[company_id] = new_position
    LOG "Round ends immediately - reached top of board"
    EXECUTE end_round_immediately(company_id, new_position)
    RETURN // Exit without further processing
    
  // Normal movement if not reaching top
  traveler_position[company_id] = max(10, new_position)
  
  // Check special positions after normal movement
  EXECUTE check_special_positions(company_id)
```

### 3.2 Special Position Handler
```
CHECK_SPECIAL_POSITIONS:
  INPUT: company_id
  
  current_pos = traveler_position[company_id]
  
  SWITCH current_pos:
    CASE 190: // SLUMP
      EXECUTE handle_slump(company_id)
      RETURN
      
    CASE 130: // MARKET NEWS
      EXECUTE handle_market_news(company_id)
      RETURN
      
    CASE IN [70, 110, 150]: // "M" markers (Rule 9b)
      traveler_position[company_id] = 130
      EXECUTE handle_market_news(company_id)
      RETURN
      
    DEFAULT:
      EXECUTE advance_to_next_player()
```

### 3.3 Slump Handler (Rule 10)
```
HANDLE_SLUMP:
  INPUT: company_id
  
  IF anti_slump_cards[company_id] > 0:
    anti_slump_cards[company_id] -= 1
    LOG "Anti-slump card used automatically"
    round_in_progress = false
    RETURN
    
  // Apply slump penalty
  current_pos = traveler_position[company_id]
  new_pos = max(10, current_pos - SLUMP_FALLBACK)
  traveler_position[company_id] = new_pos
  
  LOG "SLUMP: fell from " + current_pos + " to " + new_pos
  round_in_progress = false
```

### 3.4 Market News Handler (Rule 9)
```
HANDLE_MARKET_NEWS:
  INPUT: company_id
  
  drawn_card = draw_random_card()
  EXECUTE apply_card_effect(drawn_card, company_id)
  round_in_progress = false
```

## 4. ROUND END PROCESSING (Rule 11)

### 4.1 Round End Trigger
```
END_ROUND_IMMEDIATELY:
  INPUT: triggering_company_id, final_position
  
  round_in_progress = true // Prevent other actions
  
  LOG "=== ROUND END TRIGGERED ==="
  LOG "Company: " + triggering_company_id + " reached: " + final_position
  
  EXECUTE calculate_dividends_and_movement(triggering_company_id, final_position)
```

### 4.2 Dividend Calculation Matrix (Rule 11)
```
CALCULATE_DIVIDENDS_AND_MOVEMENT:
  INPUT: company_id, final_position
  
  // Dividend calculation based on final position
  IF final_position >= 200:
    dividend = 20
    parent_move_spaces = 2
    reason = "Top of board (20% dividend)"
    
  ELIF final_position >= 190:
    dividend = 15
    parent_move_spaces = 1  
    reason = "15% dividend position"
    
  ELIF final_position >= 170:
    dividend = 10
    parent_move_spaces = 1
    reason = "10% dividend position"
    
  ELIF final_position >= 160:
    dividend = 5
    parent_move_spaces = 1
    reason = "5% dividend position"
    
  ELIF final_position >= 125:
    dividend = 5
    parent_move_spaces = 1
    reason = "Standard 125+ position"
    
  ELIF final_position < parent_position[company_id]:
    dividend = 0
    parent_move_spaces = -1
    reason = "Fall from parent peg"
    
  ELSE:
    dividend = 0
    parent_move_spaces = 0
    reason = "No dividend zone"
    
  EXECUTE pay_dividends(company_id, dividend, reason)
  EXECUTE move_parent_peg(company_id, parent_move_spaces)
  EXECUTE reset_all_travelers_to_parents()
  EXECUTE check_bonus_shares(company_id)
  EXECUTE check_bankruptcy(company_id)
  EXECUTE check_win_conditions()
```

### 4.3 Dividend Payment Process
```
PAY_DIVIDENDS:
  INPUT: company_id, dividend_amount, reason
  
  IF dividend_amount > 0:
    LOG "Paying dividends: " + reason
    total_paid = 0
    
    FOR each_player IN active_companies:
      shares_owned = player_shares[player][company_id]
      IF shares_owned > 0:
        payment = shares_owned * dividend_amount
        player_cash[player] += payment
        total_paid += payment
        LOG player + " receives £" + payment + " (" + shares_owned + " shares)"
        
    LOG "Total dividends paid: £" + total_paid
  ELSE:
    LOG "No dividends: " + reason
```

### 4.4 Parent Peg Movement
```
MOVE_PARENT_PEG:
  INPUT: company_id, spaces
  
  IF spaces != 0:
    old_position = parent_position[company_id]
    new_position = clamp(old_position + (spaces * 10), 10, 200)
    parent_position[company_id] = new_position
    
    direction = spaces > 0 ? "up" : "down"
    LOG "Parent peg moves " + direction + ": £" + old_position + " → £" + new_position
```

### 4.5 Traveler Reset (Critical Rule 11)
```
RESET_ALL_TRAVELERS_TO_PARENTS:
  LOG "RULE 11: Resetting ALL traveler pegs to parent pegs"
  
  FOR each_company IN active_companies:
    old_traveler_pos = traveler_position[company]
    traveler_position[company] = parent_position[company]
    LOG company + " traveler: £" + old_traveler_pos + " → £" + parent_position[company]
```

## 5. SPECIAL EVENTS

### 5.1 Bonus Shares (Rule 12)
```
CHECK_BONUS_SHARES:
  INPUT: company_id
  
  IF parent_position[company_id] >= BONUS_THRESHOLD:
    LOG "BONUS SHARES TRIGGERED for " + company_id
    
    // Check win condition BEFORE bonus shares
    IF check_win_conditions():
      RETURN // Game ends, someone won
      
    // Calculate total existing shares
    total_current_shares = 0
    FOR each_player IN active_companies:
      total_current_shares += player_shares[player][company_id]
      
    total_after_bonus = total_current_shares * 2
    
    IF total_after_bonus <= MAX_CERTIFICATES:
      // Issue actual bonus shares
      FOR each_player IN active_companies:
        current_shares = player_shares[player][company_id]
        player_shares[player][company_id] = current_shares * 2
        LOG player + ": " + current_shares + " → " + (current_shares * 2) + " shares"
    ELSE:
      // Pay cash equivalent (Rule 12 note)
      FOR each_player IN active_companies:
        current_shares = player_shares[player][company_id]
        cash_payment = current_shares * 100
        player_cash[player] += cash_payment
        LOG player + ": " + current_shares + " shares → £" + cash_payment + " cash"
        
    // Reset to PAR
    parent_position[company_id] = PAR_VALUE
    traveler_position[company_id] = PAR_VALUE
    LOG company_id + " reset to £100 PAR"
```

### 5.2 Bankruptcy Handler (Rule 13)
```
CHECK_BANKRUPTCY:
  INPUT: company_id
  
  IF parent_position[company_id] <= BANKRUPTCY_THRESHOLD:
    LOG "BANKRUPTCY: " + company_id + " is eliminated"
    
    // Remove from active play
    active_companies.remove(company_id)
    
    // Nullify all shares of this company
    FOR each_player IN active_companies:
      lost_shares = player_shares[player][company_id]
      player_shares[player][company_id] = 0
      IF lost_shares > 0:
        LOG player + " loses " + lost_shares + " worthless shares"
        
    // Remove pegs
    parent_position[company_id] = 0
    traveler_position[company_id] = 0
    
    // Check game continuation
    IF active_companies.length <= 1:
      EXECUTE handle_survival_victory()
      RETURN true
      
  RETURN false
```

### 5.3 Market News Card Effects
```
APPLY_CARD_EFFECT:
  INPUT: card, target_company_id
  
  SWITCH card.effect:
    CASE "traveler_advance":
      current_pos = traveler_position[target_company_id]
      new_pos = min(300, current_pos + (card.value * 10))
      traveler_position[target_company_id] = new_pos
      
    CASE "traveler_retreat":
      current_pos = traveler_position[target_company_id]
      new_pos = max(10, current_pos - (card.value * 10))
      traveler_position[target_company_id] = new_pos
      
    CASE "traveler_to_parent":
      traveler_position[target_company_id] = parent_position[target_company_id]
      
    CASE "parent_up":
      current_pos = parent_position[target_company_id]
      new_pos = min(200, current_pos + (card.value * 10))
      parent_position[target_company_id] = new_pos
      
    CASE "parent_down":
      current_pos = parent_position[target_company_id]
      new_pos = max(10, current_pos - (card.value * 10))
      parent_position[target_company_id] = new_pos
      
    CASE "dividend_percentage":
      FOR each_player IN active_companies:
        shares = player_shares[player][target_company_id]
        IF shares > 0:
          payment = floor((parent_position[target_company_id] * card.value / 100) * shares)
          player_cash[player] += payment
          
    CASE "anti_slump_protection":
      anti_slump_cards[target_company_id] += card.value
```

## 6. GAME END CONDITIONS

### 6.1 Win Condition Check (Rule 14)
```
CHECK_WIN_CONDITIONS:
  FOR each_player IN active_companies:
    cash = player_cash[player]
    share_value = calculate_total_share_value(player)
    net_worth = cash + share_value
    
    IF net_worth >= WIN_TARGET:
      LOG "WINNER: " + player + " with £" + net_worth
      LOG "Cash: £" + cash + " | Shares: £" + share_value
      EXECUTE declare_winner(player, net_worth)
      RETURN true
      
  RETURN false

CALCULATE_TOTAL_SHARE_VALUE:
  INPUT: player_id
  
  total_value = 0
  FOR each_company IN active_companies:
    shares = player_shares[player_id][company]
    current_price = parent_position[company]
    total_value += shares * current_price
    
  RETURN total_value
```

### 6.2 Survival Victory
```
HANDLE_SURVIVAL_VICTORY:
  IF active_companies.length == 1:
    survivor = active_companies[0]
    final_wealth = player_cash[survivor] + calculate_total_share_value(survivor)
    LOG "SURVIVAL VICTORY: " + survivor + " (£" + final_wealth + ")"
    EXECUTE declare_winner(survivor, final_wealth)
    
  ELIF active_companies.length == 0:
    LOG "TOTAL BANKRUPTCY: All companies eliminated"
    EXECUTE declare_draw()
```

## 7. TURN ADVANCEMENT

### 7.1 Next Player Logic
```
ADVANCE_TO_NEXT_PLAYER:
  IF round_in_progress == false:
    current_player_index = (current_player_index + 1) % active_companies.length
    LOG "Next turn: " + active_companies[current_player_index]
    EXECUTE start_turn()
```

## 8. VALIDATION RULES

### 8.1 Game State Integrity
```
VALIDATE_GAME_STATE:
  // Ensure all active companies have valid positions
  FOR each_company IN active_companies:
    ASSERT parent_position[company] >= 10 AND parent_position[company] <= 200
    ASSERT traveler_position[company] >= 10 AND traveler_position[company] <= 300
    
  // Ensure all players have non-negative cash
  FOR each_player IN active_companies:
    ASSERT player_cash[player] >= 0
    
  // Ensure share consistency
  FOR each_company IN active_companies:
    total_shares = 0
    FOR each_player IN active_companies:
      total_shares += player_shares[player][company]
    ASSERT total_shares <= MAX_CERTIFICATES_PER_COMPANY
```

### 8.2 Action Precedence Rules
```
ACTION_PRECEDENCE:
1. HIGHEST: Round end processing (Rule 11) - overrides all other actions
2. HIGH: Special position handling (SLUMP, Market News)
3. MEDIUM: Card effects from Market News
4. LOW: Normal turn advancement
5. LOWEST: UI updates and logging

RULE: Once round_in_progress = true, no other actions can interrupt until round processing completes
```

## 9. ERROR HANDLING

### 9.1 Critical Error Recovery
```
HANDLE_CRITICAL_ERROR:
  INPUT: error_type, context
  
  SWITCH error_type:
    CASE "invalid_game_state":
      LOG "CRITICAL: Invalid game state detected"
      EXECUTE reset_to_last_valid_state()
      
    CASE "infinite_loop_detected":
      LOG "CRITICAL: Infinite loop in game logic"
      round_in_progress = false
      EXECUTE force_turn_advancement()
      
    CASE "data_corruption":
      LOG "CRITICAL: Game data corruption"
      EXECUTE emergency_game_save()
      PROMPT user_for_reset_decision()
```

## 10. IMPLEMENTATION NOTES

### 10.1 State Management
- All game state must be serializable for save/load functionality
- Use atomic operations for critical state changes
- Implement rollback capability for error recovery

### 10.2 Performance Considerations  
- Cache calculated values (share values, net worth) when possible
- Batch UI updates to reduce rendering overhead
- Limit logging in production mode

### 10.3 Debugging Features
- Maintain detailed action history log
- Implement step-by-step game state validation
- Provide manual state inspection tools

---

This logical flow provides a complete, deterministic implementation framework for the Flutter Stock Exchange Game, with clear state transitions, validation rules, and error handling suitable for AI processing and computer implementation.