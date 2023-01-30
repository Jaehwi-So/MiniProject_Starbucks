let isAuth = false;

const constructAndValidatePhoneStr = () => {
  let phone_f = document.getElementById('PhoneNumber01').value;
  let phone_mid = document.getElementById('PhoneNumber02').value;
  let phone_last = document.getElementById('PhoneNumber03').value;
  if(phone_f.length != 3 || phone_mid.length != 4 || phone_last.length != 4){
    alert("휴대폰 번호를 확인해주세요");
    return null;
  }
  let phone = `${phone_f}${phone_mid}${phone_last}`
  return phone;
}

const constructAndValidatePersonalStr = () => {
  let sign_f = document.getElementById('SignupPersonal1').value;
  let sign_last = document.getElementById('SignupPersonal2').value;
  if(sign_f.length != 6 || sign_last.length != 7){
    alert("주민등록번호를 확인해주세요");
    return null;
  }
  let signup = `${sign_f}-${sign_last}`
  return signup;
}

// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  let phone = constructAndValidatePhoneStr();
  if(!phone){
    return;
  }
  await axios.post("http://localhost:8000/tokens/phone", {
      phone: phone
  }).then((res) => {
      console.log(res);
      alert(res.data.message)
      if(res.data.success){
          document.querySelector('#ValidationInputWrapper').style.display = 'flex'
      }
  })
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  let phone = constructAndValidatePhoneStr();
  if(!phone){
    return;
  }
  let number = document.getElementById('TokenInput').value;
  await axios.put("http://localhost:8000/tokens/phone", {
      phone: phone,
      token: number
  }).then((res) => {
    alert(res.data.message)
    if(res.data.success){
      isAuth = true;
    }
  })
 
}

// 회원 가입 API 요청
const submitSignup = async () => {
  let phone = constructAndValidatePhoneStr();
  if(!phone){
    return;
  }
  let personal = constructAndValidatePersonalStr();
  if(!personal){
    return;
  }
  const user = {
    name: document.getElementById('SignupName').value,
    email: document.getElementById('SignupEmail').value,
    personal: personal,
    pwd: document.getElementById('SignupPwd').value,
    prefer: document.getElementById('SignupPrefer').value,
    phone: phone
  }
  if(!user.name || !user.email || !user.personal || !user.pwd || !user.prefer || !user.phone){
    alert("양식을 확인해주세요");
    return;
  }
  if(isAuth == false){
    alert("휴대폰 인증이 필요합니다.")
    return;
  }
  await axios.post("http://localhost:8000/user", user)
  .then((res) => {
      alert(res.data.message);
  })
  console.log('회원 가입 완료')
}
