# 📸 Portfólio Geovana Fotografias

Site/portfólio completo com painel administrativo para gerenciar conteúdo.

## 🚀 Como Usar (Para o Desenvolvedor)

### 1. **Upload para o GitHub**
```bash
git init
git add .
git commit -m "Primeiro commit - Site da Geovana"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/geovana-portfolio
git push -u origin main
```

### 2. **Deploy no Netlify**
1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em "New site from Git"
3. Escolha GitHub e selecione o repositório
4. Deploy automático será feito

### 3. **Configurar Cloudinary (Grátis)**
1. Crie conta em [cloudinary.com](https://cloudinary.com)
2. No dashboard, copie o **Cloud Name**
3. No arquivo `admin/config.yml`, substitua `your-cloud-name`
4. Faça commit das mudanças

### 4. **Ativar o CMS**
1. No Netlify, vá em **Site settings > Identity**
2. Clique em "Enable Identity"
3. Em **Registration preferences**, escolha "Invite only"
4. Em **External providers**, ative Google ou GitHub
5. Vá em **Services > Git Gateway** e clique "Enable Git Gateway"

### 5. **Criar usuário para a Geovana**
1. No Netlify, vá em **Identity > Invite users**
2. Digite o email da Geovana
3. Ela receberá um convite por email
4. Após aceitar, ela pode acessar: **seusite.netlify.app/admin**

## 👩‍💼 Como Usar (Para a Geovana)

### **Acessando o Painel**
1. Vá para: `seusite.netlify.app/admin`
2. Faça login com o email cadastrado
3. Pronto! Interface super simples

### **Adicionando Novas Galerias**
1. Clique em "Portfólio"
2. Clique em "New Portfolio"
3. Preencha:
   - **Título**: Ex: "Casamento João e Maria"
   - **Categoria**: Escolha na lista
   - **Descrição**: Texto curto sobre o ensaio
   - **Imagem Destaque**: Foto principal
   - **Galeria**: Arraste várias fotos
4. Clique "Publish" ou "Save"

### **Editando Informações Pessoais**
1. Clique em "Páginas"
2. Escolha "Página Sobre" para mudar texto e foto
3. Ou "Informações de Contato" para WhatsApp/Instagram

### **Mudando Foto da Página Inicial**
1. Vá em "Páginas > Configurações Gerais"
2. Troque "Foto Hero" pela imagem que quer na home

## 📁 Estrutura dos Arquivos

```
projeto/
├── index.html          # Site principal
├── admin/
│   ├── config.yml      # Configuração do CMS
│   └── index.html      # Painel administrativo
├── netlify.toml        # Configurações do Netlify
├── _portfolio/         # Galerias (gerado automaticamente)
├── _data/             # Dados do site (gerado automaticamente)
└── images/uploads/    # Fotos enviadas
```

## 🔧 Personalizações Fáceis

### **Trocar Cores**
No `index.html`, procure por `:root` e mude:
```css
:root {
    --gold: #c9a961;        /* Cor dourada principal */
    --light-gold: #d4b776;  /* Dourado claro */
    --text-dark: #2c2c2c;   /* Texto escuro */
}
```

### **Adicionar Nova Categoria**
No `admin/config.yml`, linha da categoria, adicione:
```yaml
options: ["Casamento", "Ensaio", "Família", "Gestante", "Newborn", "Formatura", "NOVA_CATEGORIA"]
```

## ⚡ Recursos Inclusos

- ✅ **Totalmente responsivo** (mobile, tablet, desktop)
- ✅ **Carregamento rápido** com Cloudinary
- ✅ **SEO otimizado**
- ✅ **Interface admin super simples**
- ✅ **Backup automático** (tudo no GitHub)
- ✅ **SSL grátis** (HTTPS)
- ✅ **Domínio personalizado** (pode adicionar depois)

## 🆘 Problemas Comuns

**"CMS não carrega"**
- Verifique se ativou Identity e Git Gateway no Netlify

**"Fotos não aparecem"**
- Confirme se configurou o Cloudinary corretamente

**"Não consigo fazer login"**
- Verifique se o email foi convidado no painel Identity

**"Site não atualiza"**
- As mudanças levam 1-2 minutos para aparecer

## 💝 Pronto!

Site 100% funcional e independente. A Geovana só precisa:
1. Acessar `/admin`
2. Adicionar fotos
3. Publicar

**Zero manutenção** para você! 🎉