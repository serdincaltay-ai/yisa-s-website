@echo off
chcp 65001 >nul
echo YISA-S — Git ilk kayit (tum yapilan islemler tek commit)
echo.
cd /d "%~dp0"

REM Kilidi kaldir — Git abi sifresi / tam yetki ile devam
if exist .git\index.lock del /f /q .git\index.lock 2>nul
if exist .git\config.lock del /f /q .git\config.lock 2>nul

REM Repo yoksa baslat
if not exist .git (
  echo Git baslatiliyor...
  git init
  if errorlevel 1 (
    echo git init hata verdi.
    pause
    exit /b 1
  )
)

echo Dosyalar ekleniyor...
git add .
if errorlevel 1 (
  echo git add hata verdi. index.lock tekrar silindi mi? Cursor/VS Code kapali calistirin.
  pause
  exit /b 1
)

git status
echo.
echo Commit atiliyor...
git commit -m "YISA-S: Panel, PWA, aku kontrolu, middleware, API, sema uyumu, dokumanlar — kitap sifresi .env.local"
if errorlevel 1 (
  echo Commit atilamadi. .git\index.lock veya .git\objects izin hatasi olabilir — Cursor kapali, bu klasorde GIT_ILK_KAYIT.bat'a cift tiklayin veya CMD acip calistirin.
  pause
  exit /b 1
)
echo.
echo Bitti. "git log" ile bu islemi gorebilirsiniz.
pause
