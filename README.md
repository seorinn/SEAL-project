# REAL Project
2024.07 - 2024.09 (사내 프로젝트)
![Image](https://github.com/user-attachments/assets/a70ed650-c42c-491e-ad72-dae8634fa13b)

![Image](https://github.com/user-attachments/assets/3cd6e63b-7af7-4d91-9bb6-efd195111147)

![Image](https://github.com/user-attachments/assets/c5fd85f9-2cab-4259-b563-8d6bf2e241f2)

![Image](https://github.com/user-attachments/assets/336c3455-6420-448a-873f-fde2c84fb51f)

![Image](https://github.com/user-attachments/assets/65b406c5-1402-4da7-b7a3-43929b58816c)

![Image](https://github.com/user-attachments/assets/be258ac8-3244-41e4-8970-885e8e7f970a)




### 🔗 URL
https://real-personality.web.app/




### 📌 Summary
고객사 교육에 사용된 업무 역량 진단 웹서비스




• 여름학기 인턴 근무를 하며 개발한 사내 프로젝트


• MBTI 검사와 같이 설문을 통해 진단 결과를 도출


• 진단 결과 도출 알고리즘 설계


• Excel, 관리자 페이지를 통한 운영 및 유지·보수가 가능하도록 개발


주요기능: 진단 테스트 수행 및 결과 도출, 결과지 PDF 저장, 관리자 페이지를 통한 고객사 로고/진단 데이터 등의 수정, 선택한 사용자들의 그룹 통계 조회



### 🤔 Background
고객사 리더십 교육 과정에서 사용될 업무 역량 진단 웹사이트 개발을 요청 받았습니다. 인턴 근무 기간이 종료되어도 코드 수정 없이 데이터를 수정하여 운영을 이어나갈 수 있도록 관리자 페이지를 함께 개발하였고, 외부 파일을 활용하여 진단 문항과 결과 값도 수정할 수 있도록 설계했습니다.




### 📚 Performed Tasks
• 진단 와이어프레임 제작 및 진단 문항 검토·수정, 문항별 응답에 따른 결과 알고리즘 설계


• 진단 페이지 및 관리자 페이지 전체 디자인


• Firebase Hosting, Storage 활용 및 본인인증 기능 구현


• 진단 응답에 따른 결과 도출 기능 구현


• 진단 결과에 따른 결과 페이지 내 그래프 제작


• 결과 페이지 pdf화 및 저장 기능 구현


• firebase 서버 연결 및 배포


• 진단 문항 외부 파일로부터 데이터 적용




### 🔍 Meaning
인턴 기간이 종료된 이후에도 비전공자인 사내 관리자들이 지속적으로 사용·수정·관리해야 하는 서비스였기 때문에, 엑셀 파일을 통해 문항 및 결과 데이터를 관리할 수 있도록 설계하여 사내 관리자들이 직접 진단 문항과 결과 데이터를 손쉽게 수정할 수 있도록 개선하였습니다.


또, 사용자 데이터를 Firebase Storage에 저장하여 관리할 수 있도록 구축하였습니다. 관리자 페이지에서 사용자 정보를 수정·삭제할 수 있도록 구현하고, 저장되지 못한 결과지가 있을 경우 PDF를 다시 저장·출력할 수 있도록 기능을 추가하였습니다. 아울러, 진단 응답 기록을 수집·통계화하고 시각화하여 관리자 페이지에서 한눈에 확인할 수 있도록 구현하였습니다.


이 과정에서, 코드를 직접 수정하지 않고 웹 인터페이스를 통해 데이터를 관리하는 방식을 경험할 수 있었고, PDF 변환 최적화 과정에서 다양한 기술적 문제를 해결하는 경험을 쌓을 수 있었습니다. 또한, 사용성을 고려한 개발 방식과 유지보수를 고려한 데이터 설계의 중요성을 체감했습니다.




### 🔨 Technology Stacks
React, JavaScript, CSS, Firebase Hosting, Firebase Storage
