@echo off
chcp 65001 >nul
echo ACIL — Tum dosyalari Git'e kaydet, kaybolmasin
echo.
cd /d "%~dp0"

if exist .git\index.lock del /f /q .git\index.lock 2>nul
git add .
git commit -m "ACIL: tam kurulum, SPA, GitHub Vercel Railway baglanti hazir"
if errorlevel 1 (
  echo Commit atilamadi. Cursor/VS Code KAPATIP bu dosyaya tekrar cift tiklayin.
  echo Sonra ACIL_GITHUB_VERCEL_RAILWAY_BAGLANTI.md dosyasini acin — Adim 2 ile GitHub'a push edin.
) else (
  echo.
  echo [OK] Kod Git'e kaydedildi. Simdi ACIL_GITHUB_VERCEL_RAILWAY_BAGLANTI.md dosyasini ac — Adim 2: GitHub repo + push.
)
pause
