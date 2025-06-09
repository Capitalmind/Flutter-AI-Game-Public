# Flutter Stock Exchange Game - AI/ML Simulation Platform

<div align="center">

![Flutter Game](https://img.shields.io/badge/Game-Flutter%20Stock%20Exchange-blue?style=for-the-badge)
![Year](https://img.shields.io/badge/Original-1966-green?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Machine%20Learning-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active%20Development-red?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Modular-purple?style=for-the-badge)

**An authentic digital recreation of the 1966 J.W. Spear & Sons "Flutter" board game, designed as a comprehensive AI/ML training platform for financial decision-making algorithms.**

</div>

---

## 🎯 **Project Overview**

This project is a faithful digital recreation of the classic 1966 "Flutter - Stock Exchange Game" by J.W. Spear & Sons, transformed into a sophisticated **machine learning simulation platform**. The game serves as a controlled environment for training and testing AI agents in financial decision-making, risk assessment, and strategic trading scenarios.

## 🏗️ **Modern Modular Architecture**

**✨ Recently Restructured (June 2025)**: The Flutter simulation has been completely restructured from a monolithic HTML file into a **professional, modular web application architecture**:

### **📁 Organized Structure**
```
flutter-game-restructured/
├── config/personalities/     # 11 AI personality configurations (JSON)
├── css/style.css            # Complete extracted styling (9.7KB)
├── js/game.js              # Main game logic (110KB, 2,224 lines)
├── js/game_recorder.js     # ML recording system (17KB)
└── index.html              # Clean HTML structure (5.3KB)
```

### **🔧 Technical Improvements**
- **Separation of Concerns**: HTML, CSS, and JavaScript properly separated
- **Modular Configuration**: AI personalities easily customizable via JSON files
- **Enhanced Maintainability**: Clean codebase structure for easy modifications
- **Professional Development Standards**: Ready for production deployment
- **Preserved Functionality**: All ML recording and game features maintained

### **🎯 Benefits of Restructuring**
- **Easy Customization**: Modify AI personalities without touching core code
- **Scalable Development**: Add new features with clean separation
- **Better Debugging**: Isolated components for easier troubleshooting
- **Team Collaboration**: Clear structure for multiple developers
- **Performance Optimization**: Optimized loading and execution

## 🏛️ **Historical Context**

**Flutter** was originally designed in 1966 as an educational board game to teach stock market mechanics, investment strategies, and financial risk management. The game features:

- **Authentic 1966 Rules**: Faithfully implemented dividend systems, market fluctuations, and bankruptcy mechanics
- **Strategic Depth**: Balance between skill and chance that mirrors real financial markets
- **Educational Value**: Teaches concepts of volatility, diversification, and market timing

## 🤖 **Why Flutter for Machine Learning?**

### **1. Perfect Training Environment**
- **Deterministic Rules**: Clear, well-defined game mechanics eliminate ambiguity
- **Bounded Complexity**: Manageable state space while maintaining strategic depth
- **Multi-Agent Dynamics**: 6 AI personalities compete simultaneously, creating realistic market conditions

### **2. Financial Decision-Making Parallels**
- **Risk Assessment**: Players must evaluate when to buy, sell, or hold positions
- **Market Timing**: Random events (Market News cards) simulate real market volatility
- **Portfolio Management**: Limited capital forces strategic resource allocation
- **Loss Tolerance**: Bankruptcy mechanics teach risk management

### **3. Measurable Outcomes**
- **Clear Success Metrics**: Win conditions based on total wealth accumulation
- **Quantifiable Performance**: Every decision has immediate financial consequences
- **Reproducible Results**: Deterministic rules allow for consistent training scenarios

## 🧠 **AI Personality System**

The simulation features **10 distinct AI personalities**, each modeling different investment strategies:

| Personality | Strategy | Risk Level | Trading Frequency |
|-------------|----------|------------|-------------------|
| 🛡️ **Conservative Investor** | Long-term stability | Very Low (30%) | Low (40%) |
| ⚡ **Day Trader** | Frequent small profits | High (80%) | Very High (95%) |
| 🚀 **Aggressive Speculator** | High-risk momentum | Very High (90%) | High (90%) |
| 🔄 **Contrarian Investor** | Counter-trend trading | Medium (70%) | Medium (50%) |
| 💎 **Value Hunter** | Deep value investing | Low (40%) | Low (35%) |
| 📈 **Growth Chaser** | Momentum following | High (85%) | High (80%) |
| ⚖️ **Balanced Trader** | Diversified approach | Medium (60%) | Medium (60%) |
| 🎯 **Dividend Focuser** | Income generation | Low (45%) | Low (30%) |
| 🌊 **Trend Follower** | Market momentum | Medium (65%) | Medium (55%) |
| 🎲 **Random Trader** | Chaos theory | Variable | Variable |

### **🎛️ Easy AI Customization**
With the new modular architecture, AI personalities are now **fully configurable** via JSON files:
- **Risk Parameters**: Customize risk tolerance, aggressiveness, trading frequency
- **Price Thresholds**: Set buy/sell trigger points for each personality
- **Strategy Focus**: Adjust dividend focus, momentum trading, contrarian behavior
- **Portfolio Management**: Configure cash reserves, position sizing, diversification preferences

## 📊 **Machine Learning Applications**

### **Current Implementation**
- **Rule-Based AI**: 10 personality-driven trading algorithms
- **Decision Trees**: Complex conditional logic for buy/sell decisions
- **Risk Management**: Dynamic cash reserve and position sizing
- **🎯 Comprehensive ML Recording System**: Complete data capture for training datasets

### **🎬 ML Data Recording Capabilities**
- **Complete Game Observability**: Every action, event, and decision captured
- **Real-Time Data Export**: JSON datasets with full game state snapshots
- **Comprehensive Event Logging**: Dice rolls, trades, market events, dividends, bankruptcies
- **AI Decision Tracking**: Personality-based reasoning for every trade decision
- **Performance Metrics**: Round counting, timing, success rates, risk events
- **Research-Ready Datasets**: Standardized notation perfect for ML training

### **Future ML Extensions**
- **Reinforcement Learning**: Train agents using Q-learning or policy gradients
- **Neural Networks**: Deep learning for pattern recognition in market states
- **Genetic Algorithms**: Evolve optimal trading strategies through tournament selection
- **Multi-Agent Learning**: Study emergent behaviors in competitive environments

## 🎮 **Game Features**

### **Core Mechanics**
- ✅ **Authentic 1966 Rules**: Complete implementation of original game logic
- ✅ **32-Row Board Layout**: Exact replica of original board with special cells
- ✅ **Rule 11 Compliance**: Proper dividend processing and round management
- ✅ **Market News System**: 24-card deck with realistic market events
- ✅ **Bankruptcy Mechanics**: Company elimination and share value destruction

### **Technical Features**
- ✅ **Real-Time Visualization**: Live board updates with peg positioning
- ✅ **Comprehensive Logging**: Detailed action history for analysis
- ✅ **Configurable Speed**: From 0.125s to 5s per turn for different testing needs
- ✅ **Multi-Company Support**: 3-6 players with dynamic personality assignment
- ✅ **🎯 ML Recording System**: Complete data capture with export capabilities
- ✅ **Research Analytics**: Live statistics, comprehensive reports, performance tracking

## 📈 **Research Applications**

### **Behavioral Finance**
- Study how different risk profiles perform under identical market conditions
- Analyze the impact of market volatility on decision-making quality
- Compare short-term vs. long-term investment strategies

### **Algorithm Development**
- Benchmark new trading algorithms against established strategies
- Test robustness under varying market conditions
- Evaluate performance across different game configurations

### **Educational Simulation**
- Demonstrate financial concepts in a controlled environment
- Visualize the impact of different investment approaches
- Provide safe environment for experimenting with risk management

## 🔧 **Technical Architecture**

### **Frontend (Restructured)**
- **Modular HTML5/CSS3/JavaScript**: Clean separation of concerns for maintainability
- **External Stylesheets**: Organized CSS for easy customization and optimization
- **Modular JavaScript**: Separated game logic and ML recording systems
- **Grid-Based Layout**: Authentic board representation with responsive design
- **Real-Time Updates**: Dynamic peg positioning and status displays

### **AI Engine**
- **JSON-Configurable Personalities**: Easy modification without code changes
- **Modular Decision Framework**: Extensible logic for complex trading decisions
- **Performance Tracking**: Built-in metrics for strategy evaluation
- **Config-Driven Behavior**: AI personalities stored in separate configuration files

### **Data Management & ML Recording**
- **Game State Persistence**: Complete game state tracking
- **Action Logging**: Detailed history for post-game analysis
- **Export Capabilities**: Data extraction for external analysis tools
- **🎯 ML Dataset Generation**: Automatic capture of all game events and decisions
- **Real-Time Analytics**: Live statistics and comprehensive reporting
- **Research-Ready Output**: JSON datasets with standardized notation for ML training

## 🎯 **Getting Started**

### **Quick Start (Restructured Version)**
1. **Download/Clone**: Get the restructured project with modular architecture
2. **Open the Game**: Load `index.html` in any modern browser
3. **Customize AI**: Modify personalities in `config/personalities/` folder
4. **Start New Game**: Click "New Game" and select number of companies (3-6)
5. **Set Win Target**: Choose from £600 (quick) to £5000+ (marathon)
6. **Watch AI Trade**: Enable auto-play to observe AI personalities in action
7. **Analyze Results**: Study the console logs for detailed decision tracking
8. **Export ML Data**: Use built-in tools to download training datasets

### **Development Setup**
- **No Build Process**: Pure HTML/CSS/JS for immediate development
- **Configuration**: Modify AI personalities via JSON files in `config/personalities/`
- **Styling**: Update `css/style.css` for visual customizations
- **Game Logic**: Extend functionality in `js/game.js`
- **ML Recording**: Enhance data capture in `js/game_recorder.js`

## 📚 **Documentation**

- **`GameRules.md`**: Complete 1966 game rules and mechanics
- **`flutter_game_logic.md`**: Technical implementation specifications
- **`PlayerStrategy.md`**: AI personality descriptions and strategies
- **`GameCards.md`**: Market News and Insurance card effects
- **`BoardLayout.md`**: Authentic board structure and positioning
- **`ML_RECORDING_GUIDE.md`**: Complete guide to ML data capture system

## 🔬 **Research Potential**

This simulation platform enables research in:

- **Algorithmic Trading**: Test and benchmark trading strategies
- **Risk Management**: Study portfolio optimization under uncertainty
- **Behavioral Modeling**: Analyze decision-making patterns across personalities
- **Market Dynamics**: Investigate multi-agent interactions in competitive environments
- **Educational Technology**: Develop interactive financial literacy tools

## 🎓 **Academic Value**

The Flutter simulation bridges the gap between theoretical finance and practical algorithm development, providing:

- **Reproducible Experiments**: Controlled environment for consistent testing
- **Measurable Outcomes**: Clear success metrics for strategy evaluation
- **Historical Context**: Grounding in established game theory and financial principles
- **Scalable Complexity**: From simple rule-based agents to sophisticated ML models

---

<div align="center">

**"Flutter" - Where 1966 meets 2025, and traditional game theory meets modern machine learning.**

*This project demonstrates how classic board games can serve as sophisticated platforms for AI research and financial algorithm development.*

</div>

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Historical Note**: Based on the 1966 "Flutter - Stock Exchange Game" by J.W. Spear & Sons. This digital implementation is created for educational and research purposes.

## 🤝 **Contributing**

This is a research project focused on AI/ML applications in financial simulation. Contributions welcome for:
- New AI personality implementations
- Machine learning algorithm integrations
- Performance optimization
- Educational enhancements

---

**Built with ❤️ for the intersection of classic game design and modern artificial intelligence.** 