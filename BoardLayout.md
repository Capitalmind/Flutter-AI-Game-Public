# 🎲 **Complete Flutter Game Board Layout Table**

Here's the accurate board structure from top to bottom:

| Row | Col 1 | Col 2 (FAIRFIT) | Col 3 (ATOMIC) | Col 4 (EASYGOING) | Col 5 (PRICE) | Col 6 (DIGGERS) | Col 7 (BLUEBOTTLE) | Col 8 (CAPTIVATING) | Col 9 |
|-----|-------|-----------------|----------------|-------------------|---------------|-----------------|-------------------|---------------------|-------|
| **1** | *empty* | **FAIRFIT** | **ATOMIC** | **EASYGOING** | **PRICE** | **DIGGERS** | **BLUEBOTTLE** | **CAPTIVATING** | *empty* |
| **2** | *empty* | dot (payout) | dot (payout) | dot (payout) | **20%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **3** | *empty* | dot (slump) | dot (slump) | dot (slump) | **SLUMP** | dot (slump) | dot (slump) | dot (slump) | *empty* |
| **4** | *empty* | dot (payout) | dot (payout) | dot (payout) | **10%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **5** | *empty* | dot (payout) | dot (payout) | dot (payout) | **10%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **6** | *empty* | dot (slump) | dot (slump) | dot (slump) | **SLUMP** | dot (slump) | dot (slump) | dot (slump) | *empty* |
| **7** | *empty* | dot (payout) | dot (payout) | dot (payout) | **10%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **8** | *empty* | dot (payout) | dot (payout) | dot (payout) | **5%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **9** | *empty* | dot (payout) | dot (payout) | dot (payout) | **5%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **10** | *empty* | dot (payout) | dot (payout) | dot (payout) | **5%** | dot (payout) | dot (payout) | dot (payout) | *empty* |
| **11** | *empty* | dot (market) | dot (market) | dot (market) | **M** | dot (market) | dot (market) | dot (market) | *empty* |
| **12** | *empty* | dot | dot | dot | **200** | dot | dot | dot | *empty* |
| **13** | *empty* | dot | dot | dot | **190** | dot | dot | dot | *empty* |
| **14** | *empty* | dot | dot | dot | **180** | dot | dot | dot | *empty* |
| **15** | *empty* | dot | dot | dot | **170** | dot | dot | dot | *empty* |
| **16** | *empty* | dot | dot | dot | **160** | dot | dot | dot | *empty* |
| **17** | *empty* | dot | dot | dot | **150** | dot | dot | dot | *empty* |
| **18** | *empty* | dot | dot | dot | **140** | dot | dot | dot | *empty* |
| **19** | *empty* | dot | dot | dot | **130** | dot | dot | dot | *empty* |
| **20** | *empty* | dot | dot | dot | **120** | dot | dot | dot | *empty* |
| **21** | *empty* | dot | dot | dot | **110** | dot | dot | dot | *empty* |
| **22** | *empty* | dot | dot | dot | **100 PAR** | dot | dot | dot | *empty* |
| **23** | *empty* | dot | dot | dot | **90** | dot | dot | dot | *empty* |
| **24** | *empty* | dot | dot | dot | **80** | dot | dot | dot | *empty* |
| **25** | *empty* | dot | dot | dot | **70** | dot | dot | dot | *empty* |
| **26** | *empty* | dot | dot | dot | **60** | dot | dot | dot | *empty* |
| **27** | *empty* | dot | dot | dot | **50** | dot | dot | dot | *empty* |
| **28** | *empty* | dot | dot | dot | **40** | dot | dot | dot | *empty* |
| **29** | *empty* | dot | dot | dot | **30** | dot | dot | dot | *empty* |
| **30** | *empty* | dot | dot | dot | **20** | dot | dot | dot | *empty* |
| **31** | *empty* | dot | dot | dot | **10** | dot | dot | dot | *empty* |
| **32** | *empty* | BANK | BANK | BANK | **BANKRUPT** | BANK | BANK | BANK | *empty* |

## 🎯 **Corrected Special Action Sequence (Rows 2-11):**

| Row | Action | Description |
|-----|--------|-------------|
| 2 | **20%** | Highest dividend payout |
| 3 | **SLUMP** | Fall back 6 spaces |
| 4 | **10%** | First 10% dividend row |
| 5 | **10%** | Second 10% dividend row |
| 6 | **SLUMP** | Second slump position |
| 7 | **10%** | Third 10% dividend row |
| 8 | **5%** | First 5% dividend row |
| 9 | **5%** | Second 5% dividend row |
| 10 | **5%** | Third 5% dividend row |
| 11 | **M** | Market News trigger |

## 📊 **Price Levels (Rows 12-31):**

- **Row 12:** £200 (Top of board - triggers round end)
- **Rows 13-31:** £190 down to £10 (decrements of £10)
- **Row 22:** £100 PAR (starting position)
- **Row 32:** £0 BANKRUPT (company elimination)

## 🔧 **Code Implications:**

The current code needs updating to handle:
1. **More special action rows** (2-11 instead of 2-7)
2. **Multiple identical payouts** (three 10% rows, three 5% rows)
3. **Two SLUMP positions** (rows 3 and 6)
4. **Extended board** (32 rows total instead of 28)

This explains why the board behavior might seem inconsistent - the code is currently implementing a simplified 6-row special section instead of the full 10-row authentic layout! 🎲✨
