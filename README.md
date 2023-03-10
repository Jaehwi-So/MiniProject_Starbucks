# MiniProject_Starbucks
인프런 스타벅스 미니 프로젝트 과제   
https://dingco.notion.site/Mini-Project-6d34c7b510134d8288ce676c7c91fd86

- 휴대폰 SMS 인증
- 가입 환영 이메일 템픞릿
- 스타벅스 크롤링 데이터 사용

## 1-1) BACKEND 완성하기

1. backend 폴더에 docker 기반의 express, mongodb 서버를 만들어 주세요.
2. 위 2개의 서버는 docker-compose로 묶어주세요.
3. 아래 API를 참고해 models 폴더에 3개의 파일을 만들어 mongodb 스키마를 만들어 주세요.
    1. starbucksSchema
    2. tokenSchema
    3. userSchema
4. express 서버에 총 5개의 API를 만들어 주세요 
    
    
    - **회원 가입 API: POST /user**
        - API 요청 시 입력받은 name, email, personal(주민번호), prefer(내가 좋아하는 사이트), pwd(비밀번호), phone(핸드폰 번호)를 서버에 함께 보내주어야 합니다.
            
            ```json
            {
                "name" : "아라111",
                "email" : "ala@gamil.com",
                "personal" : "220101-1111111",
                "prefer" : "https://naver.com",
                "pwd" : "1234",
                "phone" : "01012345678"
            }
            ```
            
        - 입력받은 핸드폰 번호로 `Tokens` 문서를 검색해 해당 번호의 isAuth가 true 인지 확인합니다.
            - 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 `422` 상태 코드와 함께 에러 문구를 반환합니다.          
            - true 라면 아래의 로직을 수행합니다.
                - **내가 좋아하는 사이트**로 입력받은 사이트를 cheerio를 활용하여 scraping 한 후, 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해 주세요.
                - 메타 태그 정보는 og 객체에 (title, description, image)가 들어있도록 만들어주세요.
                - personal(주민번호)는 뒷자리를 `*`로 바꾼 후 저장해 주세요. (220101-*******)
                - DB에 저장한 후, 회원 가입 환영 이메일을 실제로 전송해 주세요.
                - 생성된 user의 _id를 클라이언트에 반환합니다.
                
    - **회원 목록 조회 API: GET /users**
        - API 요청 시 DB에 저장된 User 데이터의 목록을 응답으로 보내주세요.
        - 보내주는 데이터에는  name, email, personal(주민번호), prefer(내가 좋아하는 사이트), phone(핸드폰 번호), og 객체(오픈그래프 정보 title, description, image)가 포함되어야 합니다.
            
    - **토큰 인증 요청 API: POST /tokens/phone**
        - API 요청 시 입력받은 핸드폰 번호를 서버로 보내주세요.
        - 토큰을 생성하고, 생성한 토큰을 문자로 전송해 주세요.
        - 이때, 입력받은 핸드폰 번호로 문자를 보냅니다.
        - 핸드폰 번호와 토큰, 그리고 **isAuth**는 **false** 값으로 DB에 저장합니다.            
        - 해당 핸드폰 번호가 이미 `Tokens` 문서에 저장되어 있다면 최신 토큰으로 덮어씁니다.
        - 클라이언트에 응답으로 “핸드폰으로 인증 문자가 전송되었습니다!”를 보내줍니다.
    - **인증 완료 API: PATCH /tokens/phone**
        - API 요청 시 입력받은 핸드폰 번호를 `Tokens` 문서에서 찾아봅니다.
            - 핸드폰 번호가 저장되어 있지 않다면 클라이언트에 false를 응답해 줍니다.
        - 해당 핸드폰 번호에 함께 저장된 토큰이, 입력받은 토큰과 일치하지 않는다면 클라이언트에 false를 응답해 줍니다.
        - 토큰이 일치하고, isAuth가 false라면 **true**로 변경하여 DB에 저장합니다.
            
            
            - 잘 저장되었다면 클라이언트에 true를 응답해 줍니다.
    - **스타벅스 커피 목록 조회API: GET /starbucks**
        - DB에 저장된 커피의 목록을 반환해 주세요.
        - 반환하는 커피 데이터에는 img, name, _id가 포함되어야 합니다.
            
            
5. 위 API들이 작동 가능하도록 만들어 주세요.
6. 모든 API는 퍼사드 패턴을 최대한 활용해 주세요.
7. 🚨 `env 파일의 변수명은 꼭!! 아래와 동일하게 해주세요!!` 🚨
    
    ```
    - Nodemailer 변수 -
    appPass 변수명 : **EMAIL_PASS**
    sender 변수명 : **EMAIL_SENDER**
    user 변수명 : **EMAIL_USER**
    
    - Coolsms 변수 -
    apiKey 변수명 : **SMS_KEY**
    apiSecret 변수명 : **SMS_SECRET**
    sender 변수명 : **SMS_SENDER**
    ```
    

## 1-2) FRONTEND 완성하기

1. 제공된 프론트엔드 소스코드를 활용하여 **회원가입 페이지**에 존재하는 `인증 번호 전송`, `인증 완료`, `회원가입` 버튼이 작동할 수 있도록 API를 연동해 주세요. 인증이 완료된 경우에만 회원 가입이 되어야 합니다.
2. 제공된 프론트엔드 소스코드를 활용하여 `회원 목록` 페이지, `커피 목록` 페이지에서 데이터를 보여줄 수 있도록 API를 연동해 주세요.



## 1-3) WEB-CRAWLER 완성하기

1. webcrawler 폴더에 puppeteer로 크롤링 서버를 만들어 주세요.
2. 해당 서버는 docker를 사용하지 않습니다.
3. 크롤링 서버에서 스타벅스 홈페이지의 커피 목록을 크롤링 해주세요. (**최소 30개**)
    
    
4. 커피 데이터에는 img, name이 포함되어야 합니다.
    - 이미지 태그를 puppeteer로 크롤링 할 때는 텍스트를 가져올 때와 다릅니다! 구글링을 통해 찾아보세요!
5. 크롤링 완료된 데이터를 backend 서버의 database에 저장해 주세요.



> 아래 체크리스트를 통해 스스로 결과물을 점검해 보세요.
> 

- 스웨거
    - [O]  스웨거에서 API를 바로 테스트 할 수 있도록 example이 작성되어 있다.
    - [O]  스웨거에서 회원 가입 API를 테스트 했을 때 오류 없이 작동된다.
    - [O]  스웨거에서 회원 목록 조회 API를 테스트 했을 때 오류 없이 작동된다.
    - [O]  스웨거에서 토큰 인증 API를 테스트 했을 때 오류 없이 작동된다.
    - [O]  스웨거에서 인증 완료 API를 테스트 했을 때 오류 없이 작동된다.
    - [O]  스웨거에서 커피 목록 조회 API를 테스트 했을 때 오류 없이 작동된다.
- html 연동
    - [O]  회원 목록 페이지에는 DB에 저장된 회원이 보인다.
    - [O]  커피 목록 페이지에는 DB에 저장된 커피의 이름과 이미지(최소 30개)가 보인다.
    - [O]  핸드폰 인증 버튼을 누르면 토큰이 문자로 전송된다.
    - [O]  회원 가입 버튼을 누르면 DB에 회원 데이터가 추가된다.
- [O]  스타벅스를 크롤링 할 때, 커피 이미지는 하드코딩하지 않고 반복문으로 긁어왔다.
- [O]  env 파일 변수명이 1-1에 나와있는 예시와 같다.

----------------

# Result
<img src="/screenshot/1.png" width="760" height="600"></img>
<img src="/screenshot/2.png" width="760" height="600"></img>
<img src="/screenshot/3.png" width="760" height="600"></img>
<img src="/screenshot/4.png" width="320" height="200"></img>
<img src="/screenshot/5.png" width="760" height="400"></img>
<img src="/screenshot/6.png" width="760" height="400"></img>
<img src="/screenshot/7.png" width="760" height="600"></img>