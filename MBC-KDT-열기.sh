#!/bin/bash
# MBC+ KDT 랜딩페이지 실행 스크립트

# HTML 파일 경로
HTML_FILE="/home/user/justin/mbc-kdt-landing.html"

# 브라우저로 열기
if command -v xdg-open > /dev/null; then
    # Linux
    xdg-open "$HTML_FILE"
elif command -v open > /dev/null; then
    # macOS
    open "$HTML_FILE"
elif command -v start > /dev/null; then
    # Windows (Git Bash)
    start "$HTML_FILE"
else
    echo "브라우저를 찾을 수 없습니다."
    echo "파일 위치: $HTML_FILE"
fi
