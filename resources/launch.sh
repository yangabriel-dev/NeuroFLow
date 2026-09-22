#!/bin/bash
cd "$(dirname "$0")/.." || exit 1
echo "Iniciando NeuroFlow..."
npm run dev
echo ""
echo "Pressione Enter para fechar esta janela."
read -r
