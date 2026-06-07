# Infra — SSH, Push e Deploy

Guia operacional para garantir `git push` e deploy automático funcionando de forma definitiva nesta máquina (Windows 11 + Git for Windows + Avast).

---

## 1. Visão geral do fluxo

```
máquina local  ──(git push via SSH)──►  GitHub (carloshps/studio-kit)
                                              │
                                              ▼
                                   GitHub Actions (.github/workflows/deploy.yml)
                                              │ (deploy key kit_deploy + SSH p/ VPS)
                                              ▼
                                          VPS 72.60.138.174 (Docker: kit-site)
                                              │
                                              ▼
                                     https://kit.carloshps.com.br
```

- **Push local → GitHub:** autenticado pela chave pessoal `~/.ssh/github_personal`.
- **GitHub → VPS:** feito pelo Actions, usando segredos no repositório (não depende da máquina local).

---

## 2. Chaves SSH desta máquina (`~/.ssh/`)

| Arquivo            | Para que serve                                              | Onde a pública é registrada |
|--------------------|------------------------------------------------------------|-----------------------------|
| `github_personal`  | **Push local** para o GitHub                               | GitHub → Settings → SSH keys |
| `claude_vps`       | Acesso SSH manual à VPS (`ssh studio-vps`)                 | `~/.ssh/authorized_keys` da VPS |
| `kit_deploy`       | **Deploy key** usada pelo GitHub Actions (NÃO usar p/ push local) | Secret no repo + VPS |

> A `kit_deploy` é da automação. Para push do seu terminal, sempre `github_personal`.

---

## 3. A correção definitiva (o que estava faltando)

O `git remote` usa `git@github.com:...` (SSH). O push falhava com
`Permission denied (publickey)` porque o `~/.ssh/config` **não tinha entrada
para github.com** — o SSH tentava chaves padrão inexistentes (`id_ed25519`).

A solução foi mapear github.com → `github_personal` no `~/.ssh/config`:

```sshconfig
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_personal
    IdentitiesOnly yes

Host studio-vps
    HostName 72.60.138.174
    User root
    IdentityFile ~/.ssh/claude_vps
    StrictHostKeyChecking no
    ServerAliveInterval 60
```

`IdentitiesOnly yes` força o SSH a usar **apenas** essa chave para o github.com,
evitando recusa por "tentar a chave errada primeiro".

### Validar
```bash
ssh -T git@github.com
# Esperado: "Hi carloshps! You've successfully authenticated..."
```
Se aparecer isso, `git push` funciona.

---

## 4. Se algum dia voltar a falhar — checklist

1. **Config existe?** `cat ~/.ssh/config` deve conter o bloco `Host github.com` acima.
2. **Teste de auth:** `ssh -T git@github.com` → deve dizer "Hi carloshps!".
3. **Remote correto:** `git remote -v` → `git@github.com:carloshps/studio-kit.git`.
4. **Chave registrada no GitHub:** Settings → SSH and GPG keys deve listar a
   pública de `github_personal` (`cat ~/.ssh/github_personal.pub`).
5. **Avast interferindo?** Ver seção 6.

### Alternativa de emergência: HTTPS
Se o SSH estiver indisponível, troca temporária para HTTPS + token:
```bash
git remote set-url origin https://github.com/carloshps/studio-kit.git
git push   # usa Git Credential Manager; cole um Personal Access Token como senha
# voltar depois:
git remote set-url origin git@github.com:carloshps/studio-kit.git
```

---

## 5. (Opcional) ssh-agent permanente

Só é necessário se a chave `github_personal` tiver **passphrase**. Hoje ela não
tem (o push funciona direto pelo `IdentityFile`). Para habilitar mesmo assim,
**PowerShell como Administrador**:

```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\github_personal
```

---

## 6. Avast — liberar GitHub, HTTPS e os projetos

O Avast tem dois pontos que atrapalham os fluxos de dev:

### 6.1 HTTPS Scanning (Web Shield) — faz MITM em conexões TLS
Quebra `git push` por HTTPS, `npm/pnpm install`, `curl` para registries.
**Push por SSH (porta 22) não passa por aqui** — por isso migrar para SSH já
contorna boa parte. Mas para `pnpm install` e afins, ajuste:

**Caminho:** Avast → **Menu ▸ Configurações ▸ Proteção ▸ Escudos Principais
(Core Shields) ▸ Web Shield (Proteção Web)**
- Desmarque **"Ativar verificação de HTTPS"** (Enable HTTPS scanning), **ou**
- Mantenha ligado e adicione exceções de URL (seção 6.3).

### 6.2 File Shield — varre I/O de arquivo (lentidão e travas no build/install)
Adicione as pastas dos projetos como **exclusões**:

**Caminho:** Avast → **Menu ▸ Configurações ▸ Geral ▸ Exceções (Exceptions) ▸
Adicionar exceção**, e inclua:
```
D:\carlo\OneDrive\projetos_ia\studio-os\studio-kit\
D:\carlo\OneDrive\projetos_ia\studio\
```
(adicione `node_modules` e `.git` junto — são os que mais geram I/O)

### 6.3 Exceções de URL (se mantiver o HTTPS scanning ligado)
Na mesma tela de Exceções, aba **URL**, adicione:
```
github.com
*.github.com
*.githubusercontent.com
registry.npmjs.org
*.npmjs.org
```

### 6.4 Processos confiáveis (opcional, reduz prompts)
Adicione como exceção os executáveis:
```
git.exe   ssh.exe   node.exe   pnpm   (em ...\Git\ e no caminho do Node)
```

> **Regra de bolso:** antes de smoke tests, `curl` HTTPS ou `pnpm install` de
> registry externo, se algo travar sem erro claro, **pause o Avast por 10 min**
> (ícone na bandeja ▸ Controle dos escudos ▸ Desativar por 10 minutos) e teste
> de novo para confirmar se é ele.

---

## 7. GitHub CLI (`gh`) — instalação e uso

Instalado em 2026-06-06 via `winget install --id GitHub.cli`.
Autenticado com `gh auth login` (conta `carloshps`, protocolo SSH, token no keyring).

### Validar autenticação
```powershell
gh auth status
# Esperado: "✓ Logged in to github.com account carloshps"
```

### Autenticar novamente (se necessário)
```powershell
gh auth login
# What account? → GitHub.com
# Preferred protocol? → SSH
# Use existing SSH key? → ~/.ssh/github_personal.pub
# How to authenticate? → Login with a web browser
```

### Acompanhamento do deploy
```powershell
gh run list --limit 5             # últimos 5 runs do Actions
gh run watch                      # acompanha o run em andamento ao vivo
gh run view --log-failed          # exibe só o log do step que falhou
gh run list --repo carloshps/studio-kit --limit 5   # explícito, de qualquer diretório
```

> **Nota sobre "cancelled":** o workflow tem `concurrency` configurado — se dois
> pushes chegam em sequência, o run do primeiro é cancelado e o segundo roda com
> o repo já atualizado. O run cancelado **não representa perda de deploy**: o
> run seguinte que conclui com `success` fez rsync do repo inteiro.

---

## 8. Comandos do dia a dia

```bash
# fluxo normal
git add -A
git commit -m "feat: ..."
git push                          # dispara o deploy automático

# acompanhar deploy
gh run watch                      # ao vivo
gh run list --limit 5             # histórico
gh run view --log-failed          # diagnóstico de falha

# acesso manual à VPS
ssh studio-vps
```
