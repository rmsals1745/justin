@echo off
REM MBC+ KDT 랜딩페이지 실행 스크립트 (Windows용)

REM 이 파일의 경로를 가져옴
set SCRIPT_DIR=%~dp0

REM HTML 파일을 기본 브라우저로 열기
start "" "%SCRIPT_DIR%mbc-kdt-landing.html"
