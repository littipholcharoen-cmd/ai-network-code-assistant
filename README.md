# AI Network Code Assistant

An intelligent AI-powered code assistant designed to help with network infrastructure configuration and management. This agent can assist with router, switch, VLAN, and firewall configuration using open-source LLMs.

## Features

- 🤖 **AI Code Assistant** - Powered by open-source LLMs (Hugging Face)
- 🌐 **Network Configuration Support** - Router, Switch, VLAN, and Firewall setup
- 🔧 **Multi-Language Support** - Python and JavaScript/TypeScript
- 💾 **Local & API Modes** - Run locally with Ollama or via Hugging Face API
- 📚 **Architecture-Driven Design** - Modular, scalable agent structure
- 🆓 **100% Free** - Uses open-source models and free tier APIs

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/littipholcharoen-cmd/ai-network-code-assistant.git
cd ai-network-code-assistant
```

### 2. Choose Your Setup

#### Option A: Python Setup
```bash
pip install -r requirements.txt
python src/agent/main.py
```

#### Option B: JavaScript/TypeScript Setup
```bash
npm install
npm start
```

#### Option C: Local Ollama (No API Key Needed)
```bash
# Download Ollama: https://ollama.ai
ollama serve
# In another terminal:
ollama pull mistral
python src/agent/main.py  # or npm start
```

### 3. Configure Environment (Optional)
```bash
cp .env.example .env
# Edit .env and add your API keys (or leave empty for Ollama)
```

## Free API Options

| Option | Setup Time | Cost | Best For |
|--------|-----------|------|----------|
| **Ollama** | 5 min | 🆓 Free | Local dev, no internet needed |
| **Hugging Face** | 2 min | 🆓 Free tier | Cloud API, 30k req/month |
| **Mistral** | 2 min | 🆓 Free credits | Fast inference |
| **Together.ai** | 2 min | 🆓 Free tier | Multiple models |

## Architecture

```
┌─────────────────────────────────────────┐
│    AI Network Code Assistant            │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   Agent Core                     │  │
│  │  - Query Processing              │  │
│  │  - Tool Orchestration            │  │
│  │  - Context Memory                │  │
│  └──────────────────────────────────┘  │
│                  ↓                      │
│  ┌──────────────────────────────────┐  │
│  │   Network Config Modules         │  │
│  │  ├─ Router Configuration         │  │
│  │  ├─ Switch Configuration         │  │
│  │  ├─ VLAN Management              │  │
│  │  └─ Firewall Rules               │  │
│  └──────────────────────────────────┘  │
│                  ↓                      │
│  ┌──────────────────────────────────┐  │
│  │   LLM Layer                      │  │
│  │  ├─ Hugging Face API             │  │
│  │  ├─ Ollama (Local)               │  │
│  │  └─ Model Abstraction            │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## Directory Structure

```
ai-network-code-assistant/
├── README.md
├── requirements.txt          # Python dependencies
├── package.json             # JavaScript dependencies
├── .env.example             # Environment config template
├── src/
│   ├── agent/
│   │   ├── main.py / main.ts           # Entry point
│   │   ├── core.py / core.ts           # Agent logic
│   │   ├── tools.py / tools.ts         # Tool definitions
│   │   └── config.py / config.ts       # Configuration
│   ├── network/
│   │   ├── router.py / router.ts       # Router config
│   │   ├── switch.py / switch.ts       # Switch config
│   │   ├── vlan.py / vlan.ts           # VLAN management
│   │   └── firewall.py / firewall.ts   # Firewall rules
│   ├── llm/
│   │   ├── huggingface.py / huggingface.ts
│   │   ├── ollama.py / ollama.ts
│   │   └── models.py / models.ts
│   └── utils/
│       ├── logger.py / logger.ts
│       └── helpers.py / helpers.ts
├── examples/
│   ├── basic_usage.py / basic_usage.ts
│   ├── network_scenarios.py / network_scenarios.ts
│   └── api_configuration.py / api_configuration.ts
├── tests/
│   └── test_agent.py / test_agent.ts
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_SETUP.md
│   ├── NETWORK_GUIDE.md
│   ├── EXAMPLES.md
│   └── TROUBLESHOOTING.md
└── .gitignore

```

## Getting Started with APIs

### 🚀 Quickest Start: Ollama (Local, No API Key)

1. **Download Ollama**: https://ollama.ai
2. **Start the server**:
   ```bash
   ollama serve
   ```
3. **Pull a model**:
   ```bash
   ollama pull mistral
   ```
4. **Run the assistant**:
   ```bash
   python src/agent/main.py
   ```

### ☁️ Cloud Option: Hugging Face API

1. **Sign up**: https://huggingface.co/join
2. **Create token**: https://huggingface.co/settings/tokens
3. **Add to `.env`**:
   ```
   LLM_PROVIDER=huggingface
   HUGGINGFACE_API_KEY=your_token_here
   HF_MODEL=mistralai/Mistral-7B-Instruct-v0.1
   ```
4. **Run**:
   ```bash
   python src/agent/main.py
   ```

## Usage Examples

### Ask for Router Configuration
```python
from src.agent.core import NetworkAssistant

assistant = NetworkAssistant()
response = assistant.ask("Configure a Cisco router with IP 192.168.1.1/24")
print(response)
```

### Setup VLAN
```python
response = assistant.ask("Create VLAN 10 for management with IP 10.0.10.1/24")
print(response)
```

### Firewall Rules
```python
response = assistant.ask("Block all traffic on port 23 (telnet) with ACL rule")
print(response)
```

## Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design & components
- **[API_SETUP.md](docs/API_SETUP.md)** - Detailed API configuration
- **[NETWORK_GUIDE.md](docs/NETWORK_GUIDE.md)** - Network config reference
- **[EXAMPLES.md](docs/EXAMPLES.md)** - Real-world scenarios
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Common issues

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support & Resources

- 📖 **Documentation**: See `docs/` folder
- 🐛 **Issues**: Report on GitHub Issues
- 💡 **Discussions**: Share ideas in Discussions
- 🔗 **API Docs**:
  - [Hugging Face Docs](https://huggingface.co/docs)
  - [Ollama Docs](https://github.com/ollama/ollama)

---

**Built with ❤️ by littipholcharoen-cmd**  
*Empowering network engineers with AI-assisted configuration*
