@echo off
title ARCEUS - Site local
rem Lance le petit serveur local puis ouvre le site dans le navigateur.
start "" /min powershell -ExecutionPolicy Bypass -WindowStyle Minimized -File "%~dp0serveur.ps1"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8765/index.html"
